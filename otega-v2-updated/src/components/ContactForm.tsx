import { useState } from 'react';
import { submitMessage } from '../lib/publicData';
import { Send, CheckCircle2 } from 'lucide-react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setError('');
    try {
      await submitMessage(form);
      setStatus('done');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err: any) {
      setStatus('error');
      setError(err.message || 'Could not send your message. Please try again.');
    }
  }

  if (status === 'done') {
    return (
      <div className="edge-card rounded-2xl p-10 text-center">
        <CheckCircle2 className="text-brand-blue mx-auto mb-4" size={40} />
        <h3 className="font-display text-xl text-brand-ink font-semibold">Message sent</h3>
        <p className="text-brand-muted mt-2 text-sm">We'll get back to you shortly.</p>
        <button onClick={() => setStatus('idle')} className="mt-6 text-brand-blue text-sm font-medium">Send another message</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <input required placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="bg-white border border-brand-border rounded-xl px-4 py-3 text-brand-ink placeholder:text-brand-muted/70 outline-none focus:border-brand-blue" />
        <input type="email" required placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="bg-white border border-brand-border rounded-xl px-4 py-3 text-brand-ink placeholder:text-brand-muted/70 outline-none focus:border-brand-blue" />
      </div>
      <input placeholder="Phone number (optional)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="w-full bg-white border border-brand-border rounded-xl px-4 py-3 text-brand-ink placeholder:text-brand-muted/70 outline-none focus:border-brand-blue" />
      <input placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
        className="w-full bg-white border border-brand-border rounded-xl px-4 py-3 text-brand-ink placeholder:text-brand-muted/70 outline-none focus:border-brand-blue" />
      <textarea required rows={5} placeholder="Your message…" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="w-full bg-white border border-brand-border rounded-xl px-4 py-3 text-brand-ink placeholder:text-brand-muted/70 outline-none focus:border-brand-blue resize-none" />
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button disabled={status === 'submitting'} className="btn-primary w-full py-3 rounded-full font-semibold flex items-center justify-center gap-2 disabled:opacity-60">
        <Send size={16} /> {status === 'submitting' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
