import { useEffect, useState } from 'react';
import { Loader2, ImagePlus, Save, UserPlus, Trash2 } from 'lucide-react';
import {
  getAdminSettings, updateAdminSettings, uploadFile,
  listAdminUsers, createAdminUser, deleteAdminUser, getCurrentUser,
} from '../../lib/adminApi';

const TABS = ['General', 'Founder', 'Contact', 'Giving', 'Admin Users'] as const;

export default function AdminSettingsPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>('General');
  const [settings, setSettings] = useState<Record<string, any> | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const currentUser = getCurrentUser();

  useEffect(() => { getAdminSettings().then(setSettings).catch(() => {}); }, []);

  function set(key: string, value: any) {
    setSettings((s) => ({ ...(s || {}), [key]: value }));
    setSaved(false);
  }

  async function onImagePick(key: string, file: File | null) {
    if (!file) return;
    setUploadingKey(key);
    try {
      const { url } = await uploadFile(file, 'settings');
      set(key, url);
    } finally {
      setUploadingKey(null);
    }
  }

  async function save() {
    if (!settings) return;
    setSaving(true);
    try {
      const updated = await updateAdminSettings(settings);
      setSettings(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  }

  if (!settings) return <div className="flex justify-center py-20 text-brand-muted"><Loader2 className="animate-spin" size={24} /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="font-display text-2xl text-brand-ink font-bold">Settings</h1>
        <button onClick={save} disabled={saving} className="btn-primary px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 disabled:opacity-60">
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} {saving ? 'Saving…' : saved ? 'Saved ✓' : 'Save Changes'}
        </button>
      </div>

      <div className="flex gap-1 border-b border-brand-border mb-8 overflow-x-auto">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              tab === t ? 'border-brand-blue text-brand-ink' : 'border-transparent text-brand-muted hover:text-brand-ink'
            }`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'General' && (
        <div className="space-y-4 max-w-xl">
          <Field label="Organization Name" value={settings.org_name} onChange={(v) => set('org_name', v)} />
          <Field label="Tagline" value={settings.tagline} onChange={(v) => set('tagline', v)} />
          <ImageField label="Logo" value={settings.logo_url} uploading={uploadingKey === 'logo_url'} onPick={(f) => onImagePick('logo_url', f)} />
          <ImageField label="Hero Background Image" value={settings.hero_image_url} uploading={uploadingKey === 'hero_image_url'} onPick={(f) => onImagePick('hero_image_url', f)} />
          <Field label="Hero Video URL (overrides image)" value={settings.hero_video_url} onChange={(v) => set('hero_video_url', v)} />
          <Field label="Hero Headline" value={settings.hero_headline} onChange={(v) => set('hero_headline', v)} />
          <TextArea label="Hero Subtext" value={settings.hero_subtext} onChange={(v) => set('hero_subtext', v)} />
        </div>
      )}

      {tab === 'Founder' && (
        <div className="space-y-4 max-w-xl">
          <p className="text-brand-muted text-xs mb-2">Powers the dedicated /founder page.</p>
          <Field label="Founder Name" value={settings.founder_name} onChange={(v) => set('founder_name', v)} />
          <Field label="Title" value={settings.founder_title} onChange={(v) => set('founder_title', v)} />
          <ImageField label="Photo" value={settings.founder_photo_url} uploading={uploadingKey === 'founder_photo_url'} onPick={(f) => onImagePick('founder_photo_url', f)} />
          <TextArea label="Quote" value={settings.founder_quote} onChange={(v) => set('founder_quote', v)} />
          <TextArea label="Biography (one paragraph per line)" rows={6} value={settings.founder_bio} onChange={(v) => set('founder_bio', v)} />
          <TextArea label="Vision" value={settings.founder_vision} onChange={(v) => set('founder_vision', v)} />
          <TextArea label="Mission" value={settings.founder_mission} onChange={(v) => set('founder_mission', v)} />
          <Field label="Facebook URL" value={settings.founder_facebook_url} onChange={(v) => set('founder_facebook_url', v)} />
          <Field label="Instagram URL" value={settings.founder_instagram_url} onChange={(v) => set('founder_instagram_url', v)} />
          <Field label="YouTube URL" value={settings.founder_youtube_url} onChange={(v) => set('founder_youtube_url', v)} />
        </div>
      )}

      {tab === 'Contact' && (
        <div className="space-y-4 max-w-xl">
          <Field label="Contact Email" value={settings.contact_email} onChange={(v) => set('contact_email', v)} />
          <Field label="Contact Phone" value={settings.contact_phone} onChange={(v) => set('contact_phone', v)} />
          <Field label="WhatsApp Number (with country code)" value={settings.whatsapp_number} onChange={(v) => set('whatsapp_number', v)} />
          <TextArea label="Address" value={settings.address} onChange={(v) => set('address', v)} />
          <Field label="Facebook URL" value={settings.facebook_url} onChange={(v) => set('facebook_url', v)} />
          <Field label="Instagram URL" value={settings.instagram_url} onChange={(v) => set('instagram_url', v)} />
          <Field label="YouTube URL" value={settings.youtube_url} onChange={(v) => set('youtube_url', v)} />
          <Field label="Twitter / X URL" value={settings.twitter_url} onChange={(v) => set('twitter_url', v)} />
        </div>
      )}

      {tab === 'Giving' && (
        <div className="space-y-4 max-w-xl">
          <Field label="Bank Name" value={settings.bank_name} onChange={(v) => set('bank_name', v)} />
          <Field label="Account Number" value={settings.account_number} onChange={(v) => set('account_number', v)} />
          <Field label="Account Name" value={settings.account_name} onChange={(v) => set('account_name', v)} />
          <Field label="Flutterwave Public Key" value={settings.flutterwave_public_key} onChange={(v) => set('flutterwave_public_key', v)} />
        </div>
      )}

      {tab === 'Admin Users' && (
        currentUser?.isSuper ? <AdminUsersPanel /> : (
          <p className="text-brand-muted text-sm">Only the super admin can manage other admin accounts.</p>
        )
      )}
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: any; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-brand-muted text-xs font-medium mb-1.5">{label}</label>
      <input value={value || ''} onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white border border-brand-border rounded-lg px-3 py-2.5 text-brand-ink text-sm outline-none focus:border-brand-blue" />
    </div>
  );
}

function TextArea({ label, value, onChange, rows = 3 }: { label: string; value: any; onChange: (v: string) => void; rows?: number }) {
  return (
    <div>
      <label className="block text-brand-muted text-xs font-medium mb-1.5">{label}</label>
      <textarea rows={rows} value={value || ''} onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white border border-brand-border rounded-lg px-3 py-2.5 text-brand-ink text-sm outline-none focus:border-brand-blue resize-none" />
    </div>
  );
}

function ImageField({ label, value, uploading, onPick }: { label: string; value: any; uploading: boolean; onPick: (f: File | null) => void }) {
  return (
    <div>
      <label className="block text-brand-muted text-xs font-medium mb-1.5">{label}</label>
      <div className="flex items-center gap-3">
        {value && <img src={value} className="w-12 h-12 rounded-lg object-cover" />}
        <label className="flex items-center gap-2 text-sm text-brand-muted border border-brand-border rounded-lg px-3 py-2 cursor-pointer hover:border-brand-blue">
          {uploading ? <Loader2 size={14} className="animate-spin" /> : <ImagePlus size={14} />}
          {uploading ? 'Uploading…' : 'Upload'}
          <input type="file" accept="image/*" hidden onChange={(e) => onPick(e.target.files?.[0] || null)} />
        </label>
      </div>
    </div>
  );
}

function AdminUsersPanel() {
  const [users, setUsers] = useState<any[] | null>(null);
  const [form, setForm] = useState({ username: '', password: '', display_name: '' });
  const [busy, setBusy] = useState(false);

  function refresh() { listAdminUsers().then(setUsers).catch(() => setUsers([])); }
  useEffect(refresh, []);

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await createAdminUser(form);
      setForm({ username: '', password: '', display_name: '' });
      refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-xl space-y-8">
      <form onSubmit={onCreate} className="edge-card rounded-2xl p-6 space-y-4">
        <h3 className="font-display text-brand-ink font-semibold flex items-center gap-2"><UserPlus size={18} /> New Sub-Admin</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <input required placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="bg-white border border-brand-border rounded-lg px-3 py-2.5 text-brand-ink text-sm outline-none focus:border-brand-blue" />
          <input required type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="bg-white border border-brand-border rounded-lg px-3 py-2.5 text-brand-ink text-sm outline-none focus:border-brand-blue" />
        </div>
        <input placeholder="Display name (optional)" value={form.display_name} onChange={(e) => setForm({ ...form, display_name: e.target.value })}
          className="w-full bg-white border border-brand-border rounded-lg px-3 py-2.5 text-brand-ink text-sm outline-none focus:border-brand-blue" />
        <button disabled={busy} className="btn-primary px-5 py-2.5 rounded-lg text-sm font-semibold disabled:opacity-60">
          {busy ? 'Creating…' : 'Create Sub-Admin'}
        </button>
      </form>

      {users && users.length > 0 && (
        <div className="border border-brand-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white text-brand-muted text-left">
              <tr><th className="px-4 py-3 font-medium">Username</th><th className="px-4 py-3 font-medium">Display Name</th><th className="px-4 py-3"></th></tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t border-brand-border">
                  <td className="px-4 py-3 text-brand-ink">{u.username}</td>
                  <td className="px-4 py-3 text-brand-muted">{u.display_name}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={async () => { await deleteAdminUser(u.id); refresh(); }} className="text-brand-muted hover:text-red-400 p-1.5">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
