import { supabaseAdmin } from '../_lib/supabaseAdmin.js';
import { requireAdmin, hashPassword } from '../_lib/auth.js';

// Super-admin only: manage named sub-admin accounts.
// GET    /api/admin/users        -> list sub-admins (password hashes stripped)
// POST   /api/admin/users        -> create a sub-admin
// PATCH  /api/admin/users?id=..  -> update a sub-admin (optionally reset password)
// DELETE /api/admin/users?id=..  -> deactivate/delete a sub-admin
export default async function handler(req, res) {
  const session = await requireAdmin(req, res, 'super');
  if (!session) return;

  if (req.method === 'GET') {
    const { data, error } = await supabaseAdmin
      .from('admin_users')
      .select('id, username, display_name, is_super, can_upload, can_publish, can_edit, active, created_at')
      .order('created_at', { ascending: false });
    if (error) return res.status(500).json({ error: error.message });
    return res.json({ data });
  }

  if (req.method === 'POST') {
    const { username, password, display_name, can_upload = true, can_publish = true, can_edit = true } = req.body || {};
    if (!username || !password) return res.status(400).json({ error: 'username and password are required' });

    const { data, error } = await supabaseAdmin
      .from('admin_users')
      .insert({
        username,
        password_hash: hashPassword(password),
        display_name: display_name || username,
        can_upload,
        can_publish,
        can_edit,
      })
      .select('id, username, display_name, is_super, can_upload, can_publish, can_edit, active, created_at')
      .single();

    if (error) return res.status(400).json({ error: error.message });
    return res.status(201).json({ data });
  }

  if (req.method === 'PATCH') {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: 'id is required' });
    const payload = { ...(req.body || {}) };
    if (payload.password) {
      payload.password_hash = hashPassword(payload.password);
      delete payload.password;
    }
    delete payload.id;

    const { data, error } = await supabaseAdmin
      .from('admin_users')
      .update(payload)
      .eq('id', id)
      .select('id, username, display_name, is_super, can_upload, can_publish, can_edit, active, created_at')
      .single();

    if (error) return res.status(400).json({ error: error.message });
    return res.json({ data });
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: 'id is required' });
    const { error } = await supabaseAdmin.from('admin_users').delete().eq('id', id);
    if (error) return res.status(400).json({ error: error.message });
    return res.json({ ok: true });
  }

  res.setHeader('Allow', 'GET, POST, PATCH, DELETE');
  return res.status(405).json({ error: 'Method not allowed' });
}
