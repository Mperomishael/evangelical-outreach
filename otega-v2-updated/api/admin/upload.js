import { supabaseAdmin, MEDIA_BUCKET } from '../_lib/supabaseAdmin.js';
import { requireAdmin } from '../_lib/auth.js';

// POST /api/admin/upload
// Body: { filename: string, contentType: string, dataBase64: string, folder?: string }
// Returns: { url, path }
//
// NOTE: Vercel serverless functions cap request bodies around 4.5MB, so this
// suits typical compressed photos/avatars. For large video files, upload
// directly to the `media` bucket from the client using a signed upload URL
// instead (see src/lib/adminApi.ts -> createSignedUploadUrl).
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await requireAdmin(req, res, 'upload');
  if (!session) return;

  const { filename, contentType, dataBase64, folder = 'uploads' } = req.body || {};
  if (!filename || !dataBase64) {
    return res.status(400).json({ error: 'filename and dataBase64 are required' });
  }

  try {
    const buffer = Buffer.from(dataBase64.replace(/^data:.*;base64,/, ''), 'base64');
    const safeName = filename.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const path = `${folder}/${Date.now()}_${safeName}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from(MEDIA_BUCKET)
      .upload(path, buffer, { contentType: contentType || 'application/octet-stream', upsert: false });

    if (uploadError) return res.status(400).json({ error: uploadError.message });

    const { data: publicUrlData } = supabaseAdmin.storage.from(MEDIA_BUCKET).getPublicUrl(path);

    return res.status(201).json({ url: publicUrlData.publicUrl, path });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// Signed-upload-url endpoint for large files (videos) — client PUTs directly
// to Supabase Storage, bypassing the serverless body-size limit.
export async function createSignedUploadUrlHandler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const session = await requireAdmin(req, res, 'upload');
  if (!session) return;

  const { filename, folder = 'uploads' } = req.body || {};
  if (!filename) return res.status(400).json({ error: 'filename is required' });

  const safeName = filename.replace(/[^a-zA-Z0-9.\-_]/g, '_');
  const path = `${folder}/${Date.now()}_${safeName}`;

  const { data, error } = await supabaseAdmin.storage.from(MEDIA_BUCKET).createSignedUploadUrl(path);
  if (error) return res.status(400).json({ error: error.message });

  const { data: publicUrlData } = supabaseAdmin.storage.from(MEDIA_BUCKET).getPublicUrl(path);
  return res.json({ signedUrl: data.signedUrl, token: data.token, path, publicUrl: publicUrlData.publicUrl });
}
