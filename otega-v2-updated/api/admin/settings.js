import { supabaseAdmin } from '../_lib/supabaseAdmin.js';
import { requireAdmin } from '../_lib/auth.js';

// GET   /api/admin/settings -> full settings row (admin view)
// PATCH /api/admin/settings -> update the singleton settings row
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const session = await requireAdmin(req, res);
    if (!session) return;

    const { data, error } = await supabaseAdmin
      .from('site_settings')
      .select('*')
      .eq('id', 'global')
      .maybeSingle();

    if (error) return res.status(500).json({ error: error.message });
    return res.json({ data });
  }

  if (req.method === 'PATCH') {
    const session = await requireAdmin(req, res, 'edit');
    if (!session) return;

    const payload = req.body || {};
    delete payload.id;
    payload.updated_at = new Date().toISOString();

    const { data, error } = await supabaseAdmin
      .from('site_settings')
      .update(payload)
      .eq('id', 'global')
      .select()
      .single();

    if (error) return res.status(400).json({ error: error.message });
    return res.json({ data });
  }

  res.setHeader('Allow', 'GET, PATCH');
  return res.status(405).json({ error: 'Method not allowed' });
}
