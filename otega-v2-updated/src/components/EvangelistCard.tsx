import { Link } from 'react-router-dom';
import { MapPin, HeartHandshake } from 'lucide-react';
import type { Evangelist } from '../lib/types';

export default function EvangelistCard({ e }: { e: Evangelist }) {
  return (
    <Link to={`/evangelists/${e.slug}`} className="edge-card rounded-2xl overflow-hidden group focus-ring block">
      <div className="aspect-[4/5] bg-brand-soft overflow-hidden">
        {e.photo_url ? (
          <img src={e.photo_url} alt={e.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-brand-muted/40 font-display text-4xl">
            {e.name.charAt(0)}
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg text-brand-ink font-semibold">{e.name}</h3>
        <p className="text-brand-blue text-sm mt-0.5">{e.title}</p>
        {e.region && (
          <p className="text-brand-muted text-xs mt-2 flex items-center gap-1">
            <MapPin size={12} /> {e.region}{e.state ? `, ${e.state}` : ''}
          </p>
        )}
        {e.testimony_count > 0 && (
          <p className="text-brand-muted text-xs mt-1 flex items-center gap-1">
            <HeartHandshake size={12} /> {e.testimony_count} testimonies
          </p>
        )}
      </div>
    </Link>
  );
}
