import { useState } from 'react';
import { submitTestimony } from '../lib/publicData';
import { Send, CheckCircle2 } from 'lucide-react';

export default function TestimonySubmitForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', title: '', content: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setError('');
    try {
      await submitTestimony(form);
      setStatus('done');
      setForm({ name: '', email: '', phone: '', title: '', content: '' });
    } catch (err: any) {
      setStatus('error');
      setError(err.message || 'Could not submit your testimony. Please try again.');
    }
  }

  if (status === 'done') {
    return (
      <div className="edge-card rounded-2xl p-10 text-center">
        <CheckCircle2 className="text-brand-blue mx-auto mb-4" size={40} />
        <h3 className="font-display text-xl text-brand-ink font-semibold">Thank you for sharing</h3>
        <p className="text-brand-muted mt-2 text-sm">Your testimony is awaiting review and will appear on the site once approved.</p>
        <button onClick={() => setStatus('idle')} className="mt-6 text-brand-blue text-sm font-medium">Share another testimony</button>
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
      <input placeholder="Give your testimony a title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-full bg-white border border-brand-border rounded-xl px-4 py-3 text-brand-ink placeholder:text-brand-muted/70 outline-none focus:border-brand-blue" />
      <textarea required rows={6} placeholder="Tell us what God has done…" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
        className="w-full bg-white border border-brand-border rounded-xl px-4 py-3 text-brand-ink placeholder:text-brand-muted/70 outline-none focus:border-brand-blue resize-none" />
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button disabled={status === 'submitting'} className="btn-primary w-full py-3 rounded-full font-semibold flex items-center justify-center gap-2 disabled:opacity-60">
        <Send size={16} /> {status === 'submitting' ? 'Submitting…' : 'Submit Testimony'}
      </button>
    </form>
  );
}
