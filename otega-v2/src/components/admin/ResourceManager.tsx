import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Loader2, ImagePlus } from 'lucide-react';
import { list, create, update, remove, uploadFile } from '../../lib/adminApi';

export type FieldType = 'text' | 'textarea' | 'select' | 'checkbox' | 'number' | 'image' | 'tags';

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  options?: string[];
  required?: boolean;
  hint?: string;
  showInTable?: boolean;
}

interface Props {
  resource: string;
  title: string;
  description?: string;
  fields: FieldDef[];
  defaults?: Record<string, any>;
  imageFolder?: string;
  renderExtraRowActions?: (row: any, refresh: () => void) => React.ReactNode;
}

export default function ResourceManager({ resource, title, description, fields, defaults = {}, imageFolder = 'uploads', renderExtraRowActions }: Props) {
  const [rows, setRows] = useState<any[] | null>(null);
  const [editing, setEditing] = useState<any | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');

  async function refresh() {
    setError('');
    try {
      const data = await list(resource);
      setRows(data);
    } catch (err: any) {
      setError(err.message);
    }
  }

  useEffect(() => { refresh(); }, [resource]);

  const tableFields = fields.filter((f) => f.showInTable !== false).slice(0, 4);

  return (
    <div>
      <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl text-white font-bold">{title}</h1>
          {description && <p className="text-white/50 text-sm mt-1">{description}</p>}
        </div>
        <button onClick={() => setCreating(true)} className="btn-primary px-4 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2">
          <Plus size={16} /> New
        </button>
      </div>

      {error && <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-lg px-4 py-3 mb-4">{error}</div>}

      {rows === null ? (
        <div className="flex items-center justify-center py-20 text-white/40"><Loader2 className="animate-spin" size={24} /></div>
      ) : rows.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl text-white/40">Nothing here yet.</div>
      ) : (
        <div className="border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-white/50 text-left">
              <tr>
                {tableFields.map((f) => <th key={f.key} className="px-4 py-3 font-medium">{f.label}</th>)}
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-t border-white/5 hover:bg-white/[0.02]">
                  {tableFields.map((f) => (
                    <td key={f.key} className="px-4 py-3 text-white/80 max-w-xs truncate">
                      {f.type === 'checkbox' ? (row[f.key] ? 'Yes' : 'No') :
                       f.type === 'image' ? (row[f.key] ? <img src={row[f.key]} className="w-8 h-8 rounded object-cover" /> : '—') :
                       String(row[f.key] ?? '—')}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    {renderExtraRowActions?.(row, refresh)}
                    <button onClick={() => setEditing(row)} className="text-white/50 hover:text-brand-lime p-1.5 inline-flex"><Pencil size={14} /></button>
                    <button
                      onClick={async () => { if (confirm('Delete this item permanently?')) { await remove(resource, row.id); refresh(); } }}
                      className="text-white/50 hover:text-red-400 p-1.5 inline-flex"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {(creating || editing) && (
        <ResourceForm
          resource={resource}
          fields={fields}
          initial={editing || defaults}
          isNew={!editing}
          imageFolder={imageFolder}
          onClose={() => { setCreating(false); setEditing(null); }}
          onSaved={() => { setCreating(false); setEditing(null); refresh(); }}
        />
      )}
    </div>
  );
}

function ResourceForm({ resource, fields, initial, isNew, imageFolder, onClose, onSaved }: {
  resource: string; fields: FieldDef[]; initial: any; isNew: boolean; imageFolder: string;
  onClose: () => void; onSaved: () => void;
}) {
  const [form, setForm] = useState<Record<string, any>>(() => {
    const base: Record<string, any> = { ...initial };
    fields.forEach((f) => { if (base[f.key] === undefined) base[f.key] = f.type === 'checkbox' ? false : f.type === 'tags' ? [] : ''; });
    return base;
  });
  const [saving, setSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [error, setError] = useState('');

  function setField(key: string, value: any) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onImagePick(key: string, file: File | null) {
    if (!file) return;
    setUploadingKey(key);
    try {
      const { url } = await uploadFile(file, imageFolder);
      setField(key, url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploadingKey(null);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (isNew) await create(resource, form);
      else await update(resource, form.id, form);
      onSaved();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-xl max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 sticky top-0 bg-[#111]">
          <h2 className="font-display text-lg text-white font-semibold">{isNew ? 'New' : 'Edit'} Item</h2>
          <button onClick={onClose} className="text-white/50 hover:text-white"><X size={18} /></button>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="block text-white/60 text-xs font-medium mb-1.5">{f.label}{f.required && ' *'}</label>
              {f.type === 'textarea' ? (
                <textarea rows={4} required={f.required} value={form[f.key] || ''} onChange={(e) => setField(f.key, e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-brand-lime resize-none" />
              ) : f.type === 'select' ? (
                <select value={form[f.key] || ''} onChange={(e) => setField(f.key, e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-brand-lime">
                  {(f.options || []).map((o) => <option key={o} value={o} className="bg-black">{o}</option>)}
                </select>
              ) : f.type === 'checkbox' ? (
                <label className="flex items-center gap-2 text-white/80 text-sm">
                  <input type="checkbox" checked={!!form[f.key]} onChange={(e) => setField(f.key, e.target.checked)} className="accent-brand-lime" />
                  {f.hint || 'Yes'}
                </label>
              ) : f.type === 'number' ? (
                <input type="number" required={f.required} value={form[f.key] ?? ''} onChange={(e) => setField(f.key, Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-brand-lime" />
              ) : f.type === 'tags' ? (
                <input placeholder="comma, separated, tags" value={(form[f.key] || []).join(', ')}
                  onChange={(e) => setField(f.key, e.target.value.split(',').map((s) => s.trim()).filter(Boolean))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-brand-lime" />
              ) : f.type === 'image' ? (
                <div className="flex items-center gap-3">
                  {form[f.key] && <img src={form[f.key]} className="w-12 h-12 rounded-lg object-cover" />}
                  <label className="flex items-center gap-2 text-sm text-white/70 border border-white/15 rounded-lg px-3 py-2 cursor-pointer hover:border-brand-lime">
                    {uploadingKey === f.key ? <Loader2 size={14} className="animate-spin" /> : <ImagePlus size={14} />}
                    {uploadingKey === f.key ? 'Uploading…' : 'Upload'}
                    <input type="file" accept="image/*" hidden onChange={(e) => onImagePick(f.key, e.target.files?.[0] || null)} />
                  </label>
                </div>
              ) : (
                <input type="text" required={f.required} value={form[f.key] || ''} onChange={(e) => setField(f.key, e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-brand-lime" />
              )}
              {f.hint && f.type !== 'checkbox' && <p className="text-white/30 text-xs mt-1">{f.hint}</p>}
            </div>
          ))}
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 border border-white/15 text-white/70 py-2.5 rounded-lg text-sm font-medium">Cancel</button>
            <button disabled={saving} className="flex-1 btn-primary py-2.5 rounded-lg text-sm font-semibold disabled:opacity-60">
              {saving ? 'Saving…' : isNew ? 'Create' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
