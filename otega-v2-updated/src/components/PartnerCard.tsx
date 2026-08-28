import type { Partner } from '../lib/types';

export default function PartnerCard({ p }: { p: Partner }) {
  const content = (
    <div className="edge-card rounded-2xl p-6 flex flex-col items-center justify-center gap-3 h-36 text-center">
      {p.logo_url ? (
        <img src={p.logo_url} alt={p.name} className="max-h-12 max-w-[140px] object-contain grayscale hover:grayscale-0 transition-all" />
      ) : (
        <span className="font-display text-brand-ink font-semibold">{p.name}</span>
      )}
    </div>
  );
  return p.website_url ? (
    <a href={p.website_url} target="_blank" rel="noreferrer" className="focus-ring block">{content}</a>
  ) : content;
}
