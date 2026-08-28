import { useState } from 'react';
import { submitDonationRecord } from '../lib/publicData';
import { Copy, Check, HeartHandshake } from 'lucide-react';
import type { SiteSettings } from '../lib/types';

const AMOUNTS = [5000, 10000, 25000, 50000, 100000];

export default function DonationForm({ settings }: { settings: SiteSettings }) {
  const [amount, setAmount] = useState(10000);
  const [custom, setCustom] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [copied, setCopied] = useState(false);
  const [recorded, setRecorded] = useState(false);

  const finalAmount = custom ? Number(custom) : amount;

  function copyAccount() {
    navigator.clipboard.writeText(settings.account_number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function recordIntent() {
    try {
      await submitDonationRecord({ donor_name: name || 'Anonymous', donor_email: email, amount: finalAmount, purpose: 'General' });
      setRecorded(true);
    } catch {
      // Non-blocking — the bank transfer itself is what matters.
      setRecorded(true);
    }
  }

  return (
    <div className="edge-card rounded-2xl p-6 sm:p-8">
      <div className="flex items-center gap-2 text-brand-blue mb-6">
        <HeartHandshake size={20} />
        <span className="text-sm font-semibold uppercase tracking-wide">Give Toward the Harvest</span>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        {AMOUNTS.map((a) => (
          <button key={a} onClick={() => { setAmount(a); setCustom(''); }}
            className={`py-3 rounded-xl text-sm font-semibold border transition-colors ${
              amount === a && !custom ? 'bg-brand-blue text-white border-brand-blue' : 'border-brand-border text-brand-muted hover:border-brand-border'
            }`}>
            ₦{a.toLocaleString()}
          </button>
        ))}
        <input placeholder="Other ₦" value={custom} onChange={(e) => setCustom(e.target.value.replace(/[^0-9]/g, ''))}
          className="bg-white border border-brand-border rounded-xl px-3 py-3 text-brand-ink text-sm placeholder:text-brand-muted/70 outline-none focus:border-brand-blue" />
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mt-4">
        <input placeholder="Your name (optional)" value={name} onChange={(e) => setName(e.target.value)}
          className="bg-white border border-brand-border rounded-xl px-4 py-3 text-brand-ink placeholder:text-brand-muted/70 outline-none focus:border-brand-blue text-sm" />
        <input type="email" placeholder="Email (optional)" value={email} onChange={(e) => setEmail(e.target.value)}
          className="bg-white border border-brand-border rounded-xl px-4 py-3 text-brand-ink placeholder:text-brand-muted/70 outline-none focus:border-brand-blue text-sm" />
      </div>

      <div className="mt-6 bg-white rounded-xl p-5 text-center">
        <div className="text-xs uppercase tracking-widest text-brand-muted">{settings.bank_name || 'Bank Transfer'}</div>
        <button onClick={copyAccount} className="mt-2 group">
          <div className="text-3xl font-mono font-bold text-brand-ink tracking-widest group-active:scale-95 transition-transform">
            {settings.account_number || '—'}
          </div>
        </button>
        <div className="text-brand-muted text-sm mt-1">{settings.account_name || settings.org_name}</div>
        <button onClick={copyAccount} className="mt-4 w-full py-2.5 border border-brand-border rounded-full text-sm flex items-center justify-center gap-2 hover:border-brand-blue transition-colors">
          {copied ? <Check size={14} className="text-brand-blue" /> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy Account Number'}
        </button>
      </div>

      <button onClick={recordIntent} disabled={recorded} className="btn-primary w-full py-3 rounded-full font-semibold mt-4 disabled:opacity-60">
        {recorded ? `Thank you for giving ₦${finalAmount.toLocaleString()}` : `I've Given ₦${finalAmount.toLocaleString()}`}
      </button>
      <p className="text-brand-muted/70 text-xs text-center mt-3">
        After transferring, tap the button above so our team can follow up and send a receipt.
      </p>
    </div>
  );
}
