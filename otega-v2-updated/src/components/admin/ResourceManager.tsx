import type { ReactNode, FormEvent } from 'react';
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
  renderExtraRowActions?: (row: any, refresh: () => void) => ReactNode;
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
          <h1 className="font-display text-2xl text-brand-ink font-bold">{title}</h1>
          {description && <p className="text-brand-muted text-sm mt-1">{description}</p>}
        </div>
        <button onClick={() => setCreating(true)} className="btn-primary px-4 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2">
          <Plus size={16} /> New
        </button>
      </div>

      {error && <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-lg px-4 py-3 mb-4">{error}</div>}

      {rows === null ? (
        <div className="flex items-center justify-center py-20 text-brand-muted"><Loader2 className="animate-spin" size={24} /></div>
      ) : rows.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-brand-border rounded-2xl text-brand-muted">Nothing here yet.</div>
      ) : (
        <div className="border border-brand-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white text-brand-muted text-left">
              <tr>
                {tableFields.map((f) => <th key={f.key} className="px-4 py-3 font-medium">{f.label}</th>)}
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-t border-brand-border hover:bg-brand-cream">
                  {tableFields.map((f) => (
                    <td key={f.key} className="px-4 py-3 text-brand-ink max-w-xs truncate">
                      {f.type === 'checkbox' ? (row[f.key] ? 'Yes' : 'No') :
                       f.type === 'image' ? (row[f.key] ? <img src={row[f.key]} className="w-8 h-8 rounded object-cover" /> : '—') :
                       String(row[f.key] ?? '—')}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    {renderExtraRowActions?.(row, refresh)}
                    <button onClick={() => setEditing(row)} className="text-brand-muted hover:text-brand-blue p-1.5 inline-flex"><Pencil size={14} /></button>
                    <button
                      onClick={async () => { if (confirm('Delete this item permanently?')) { await remove(resource, row.id); refresh(); } }}
                      className="text-brand-muted hover:text-red-400 p-1.5 inline-flex"
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

  async function onSubmit(e: FormEvent) {
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
    <div className="fixed inset-0 bg-brand-milk/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="bg-white border border-brand-border rounded-2xl w-full max-w-xl max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border sticky top-0 bg-white">
          <h2 className="font-display text-lg text-brand-ink font-semibold">{isNew ? 'New' : 'Edit'} Item</h2>
          <button onClick={onClose} className="text-brand-muted hover:text-brand-ink"><X size={18} /></button>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="block text-brand-muted text-xs font-medium mb-1.5">{f.label}{f.required && ' *'}</label>
              {f.type === 'textarea' ? (
                <textarea rows={4} required={f.required} value={form[f.key] || ''} onChange={(e) => setField(f.key, e.target.value)}
                  className="w-full bg-white border border-brand-border rounded-lg px-3 py-2 text-brand-ink text-sm outline-none focus:border-brand-blue resize-none" />
              ) : f.type === 'select' ? (
                <select value={form[f.key] || ''} onChange={(e) => setField(f.key, e.target.value)}
                  className="w-full bg-white border border-brand-border rounded-lg px-3 py-2 text-brand-ink text-sm outline-none focus:border-brand-blue">
                  {(f.options || []).map((o) => <option key={o} value={o} className="bg-brand-milk">{o}</option>)}
                </select>
              ) : f.type === 'checkbox' ? (
                <label className="flex items-center gap-2 text-brand-ink text-sm">
                  <input type="checkbox" checked={!!form[f.key]} onChange={(e) => setField(f.key, e.target.checked)} className="accent-brand-blue" />
                  {f.hint || 'Yes'}
                </label>
              ) : f.type === 'number' ? (
                <input type="number" required={f.required} value={form[f.key] ?? ''} onChange={(e) => setField(f.key, Number(e.target.value))}
                  className="w-full bg-white border border-brand-border rounded-lg px-3 py-2 text-brand-ink text-sm outline-none focus:border-brand-blue" />
              ) : f.type === 'tags' ? (
                <input placeholder="comma, separated, tags" value={(form[f.key] || []).join(', ')}
                  onChange={(e) => setField(f.key, e.target.value.split(',').map((s) => s.trim()).filter(Boolean))}
                  className="w-full bg-white border border-brand-border rounded-lg px-3 py-2 text-brand-ink text-sm outline-none focus:border-brand-blue" />
              ) : f.type === 'image' ? (
                <div className="flex items-center gap-3">
                  {form[f.key] && <img src={form[f.key]} className="w-12 h-12 rounded-lg object-cover" />}
                  <label className="flex items-center gap-2 text-sm text-brand-muted border border-brand-border rounded-lg px-3 py-2 cursor-pointer hover:border-brand-blue">
                    {uploadingKey === f.key ? <Loader2 size={14} className="animate-spin" /> : <ImagePlus size={14} />}
                    {uploadingKey === f.key ? 'Uploading…' : 'Upload'}
                    <input type="file" accept="image/*" hidden onChange={(e) => onImagePick(f.key, e.target.files?.[0] || null)} />
                  </label>
                </div>
              ) : (
                <input type="text" required={f.required} value={form[f.key] || ''} onChange={(e) => setField(f.key, e.target.value)}
                  className="w-full bg-white border border-brand-border rounded-lg px-3 py-2 text-brand-ink text-sm outline-none focus:border-brand-blue" />
              )}
              {f.hint && f.type !== 'checkbox' && <p className="text-brand-muted/70 text-xs mt-1">{f.hint}</p>}
            </div>
          ))}
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 border border-brand-border text-brand-muted py-2.5 rounded-lg text-sm font-medium">Cancel</button>
            <button disabled={saving} className="flex-1 btn-primary py-2.5 rounded-lg text-sm font-semibold disabled:opacity-60">
              {saving ? 'Saving…' : isNew ? 'Create' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
