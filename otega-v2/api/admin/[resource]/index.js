import { supabaseAdmin } from '../../_lib/supabaseAdmin.js';
import { requireAdmin } from '../../_lib/auth.js';
import { resolveResource } from '../../_lib/resources.js';

// GET  /api/admin/:resource        -> list everything (any status), admin view
// POST /api/admin/:resource        -> create a row
export default async function handler(req, res) {
  const { resource } = req.query;
  const config = resolveResource(resource);
  if (!config) return res.status(404).json({ error: `Unknown resource "${resource}"` });

  if (req.method === 'GET') {
    const session = await requireAdmin(req, res);
    if (!session) return;

    const { data, error } = await supabaseAdmin
      .from(config.table)
      .select('*')
      .order(config.orderBy, { ascending: config.ascending });

    if (error) return res.status(500).json({ error: error.message });
    return res.json({ data });
  }

  if (req.method === 'POST') {
    const permission = resource === 'notifications' ? undefined : 'edit';
    const session = await requireAdmin(req, res, permission);
    if (!session) return;

    const payload = req.body || {};
    delete payload.id;
    delete payload.created_at;

    const { data, error } = await supabaseAdmin
      .from(config.table)
      .insert(payload)
      .select()
      .single();

    if (error) return res.status(400).json({ error: error.message });
    return res.status(201).json({ data });
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ error: 'Method not allowed' });
}
