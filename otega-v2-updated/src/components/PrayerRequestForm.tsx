import { useState } from 'react';
import { submitPrayerRequest } from '../lib/publicData';
import { Send, CheckCircle2 } from 'lucide-react';

const CATEGORIES = ['Healing', 'Family', 'Finances', 'Salvation', 'Guidance', 'Other'];

export default function PrayerRequestForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', category: 'Healing', request: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setError('');
    try {
      await submitPrayerRequest(form);
      setStatus('done');
      setForm({ name: '', email: '', phone: '', category: 'Healing', request: '' });
    } catch (err: any) {
      setStatus('error');
      setError(err.message || 'Could not submit your request. Please try again.');
    }
  }

  if (status === 'done') {
    return (
      <div className="edge-card rounded-2xl p-10 text-center">
        <CheckCircle2 className="text-brand-blue mx-auto mb-4" size={40} />
        <h3 className="font-display text-xl text-brand-ink font-semibold">Your request has been received</h3>
        <p className="text-brand-muted mt-2 text-sm">Our prayer team will be standing with you. Thank you for trusting us with this.</p>
        <button onClick={() => setStatus('idle')} className="mt-6 text-brand-blue text-sm font-medium">Submit another request</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="edge-card rounded-2xl p-6 sm:p-8 space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <input required placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="bg-white border border-brand-border rounded-xl px-4 py-3 text-brand-ink placeholder:text-brand-muted/70 outline-none focus:border-brand-blue" />
        <input type="email" placeholder="Email (optional)" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="bg-white border border-brand-border rounded-xl px-4 py-3 text-brand-ink placeholder:text-brand-muted/70 outline-none focus:border-brand-blue" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <input placeholder="Phone / WhatsApp (optional)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="bg-white border border-brand-border rounded-xl px-4 py-3 text-brand-ink placeholder:text-brand-muted/70 outline-none focus:border-brand-blue" />
        <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="bg-white border border-brand-border rounded-xl px-4 py-3 text-brand-ink outline-none focus:border-brand-blue">
          {CATEGORIES.map((c) => <option key={c} value={c} className="bg-brand-milk">{c}</option>)}
        </select>
      </div>
      <textarea required rows={5} placeholder="Share your prayer request…" value={form.request} onChange={(e) => setForm({ ...form, request: e.target.value })}
        className="w-full bg-white border border-brand-border rounded-xl px-4 py-3 text-brand-ink placeholder:text-brand-muted/70 outline-none focus:border-brand-blue resize-none" />
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button disabled={status === 'submitting'} className="btn-primary w-full py-3 rounded-full font-semibold flex items-center justify-center gap-2 disabled:opacity-60">
        <Send size={16} /> {status === 'submitting' ? 'Sending…' : 'Send Prayer Request'}
      </button>
      <p className="text-brand-muted/70 text-xs text-center">Your request is kept private and only seen by our prayer team.</p>
    </form>
  );
}
