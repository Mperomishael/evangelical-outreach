import { supabaseAdmin } from '../../_lib/supabaseAdmin.js';
import { requireAdmin } from '../../_lib/auth.js';
import { resolveResource } from '../../_lib/resources.js';

// PATCH  /api/admin/:resource/:id  -> update a row
// DELETE /api/admin/:resource/:id  -> delete a row
export default async function handler(req, res) {
  const { resource, id } = req.query;
  const config = resolveResource(resource);
  if (!config) return res.status(404).json({ error: `Unknown resource "${resource}"` });

  if (req.method === 'PATCH') {
    const permission = resource === 'notifications' ? undefined : 'edit';
    const session = await requireAdmin(req, res, permission);
    if (!session) return;

    const payload = req.body || {};
    delete payload.id;
    delete payload.created_at;
    if ('updated_at' in getColumns(config.table)) payload.updated_at = new Date().toISOString();

    const { data, error } = await supabaseAdmin
      .from(config.table)
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) return res.status(400).json({ error: error.message });
    return res.json({ data });
  }

  if (req.method === 'DELETE') {
    const session = await requireAdmin(req, res, 'edit');
    if (!session) return;

    const { error } = await supabaseAdmin.from(config.table).delete().eq('id', id);
    if (error) return res.status(400).json({ error: error.message });
    return res.json({ ok: true });
  }

  res.setHeader('Allow', 'PATCH, DELETE');
  return res.status(405).json({ error: 'Method not allowed' });
}

// Tables that don't have an updated_at column — avoids a wasted write error.
const NO_UPDATED_AT = new Set(['donations', 'notifications', 'messages', 'photos', 'videos']);
function getColumns(table) {
  return NO_UPDATED_AT.has(table) ? {} : { updated_at: true };
}
