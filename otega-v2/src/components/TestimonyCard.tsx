import { Quote } from 'lucide-react';
import type { Testimony } from '../lib/types';

export default function TestimonyCard({ t }: { t: Testimony }) {
  return (
    <div className="edge-card rounded-2xl p-6 flex flex-col h-full">
      <Quote className="text-brand-lime mb-4" size={24} />
      {t.title && <h3 className="font-display text-white font-semibold mb-2">{t.title}</h3>}
      <p className="text-white/70 text-sm leading-relaxed flex-1">{t.content}</p>
      <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/10">
        {t.image_url ? (
          <img src={t.image_url} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
        ) : (
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/60 text-xs font-semibold">
            {t.name.charAt(0)}
          </div>
        )}
        <span className="text-white text-sm font-medium">{t.name}</span>
      </div>
    </div>
  );
}
