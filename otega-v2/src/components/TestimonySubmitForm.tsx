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
        <CheckCircle2 className="text-brand-lime mx-auto mb-4" size={40} />
        <h3 className="font-display text-xl text-white font-semibold">Thank you for sharing</h3>
        <p className="text-white/60 mt-2 text-sm">Your testimony is awaiting review and will appear on the site once approved.</p>
        <button onClick={() => setStatus('idle')} className="mt-6 text-brand-lime text-sm font-medium">Share another testimony</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="edge-card rounded-2xl p-6 sm:p-8 space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <input required placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-brand-lime" />
        <input type="email" placeholder="Email (optional)" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-brand-lime" />
      </div>
      <input placeholder="Give your testimony a title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-brand-lime" />
      <textarea required rows={6} placeholder="Tell us what God has done…" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-brand-lime resize-none" />
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button disabled={status === 'submitting'} className="btn-primary w-full py-3 rounded-full font-semibold flex items-center justify-center gap-2 disabled:opacity-60">
        <Send size={16} /> {status === 'submitting' ? 'Submitting…' : 'Submit Testimony'}
      </button>
    </form>
  );
}
