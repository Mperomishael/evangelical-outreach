import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowLeft } from 'lucide-react';
import type { Evangelist } from '../lib/types';
import { getEvangelistBySlug } from '../lib/publicData';
import { Section, Loader, EmptyState } from '../components/ui';

export default function EvangelistDetailPage() {
  const { slug } = useParams();
  const [data, setData] = useState<Evangelist | null | undefined>(undefined);

  useEffect(() => {
    if (!slug) return;
    getEvangelistBySlug(slug).then(setData).catch(() => setData(null));
  }, [slug]);

  if (data === undefined) return <Loader />;
  if (data === null) return <Section><EmptyState title="Evangelist not found" message="This profile may have been removed." /></Section>;

  return (
    <Section>
      <Link to="/evangelists" className="inline-flex items-center gap-1 text-white/50 text-sm mb-8 hover:text-white transition-colors">
        <ArrowLeft size={14} /> All evangelists
      </Link>
      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-white/5 edge-card">
            {data.photo_url ? <img src={data.photo_url} alt={data.name} className="w-full h-full object-cover" /> : (
              <div className="w-full h-full flex items-center justify-center text-white/20 font-display text-6xl">{data.name.charAt(0)}</div>
            )}
          </div>
        </div>
        <div className="md:col-span-8">
          <h1 className="font-display text-4xl text-white font-bold">{data.name}</h1>
          <p className="text-brand-lime mt-1">{data.title}</p>
          {data.region && (
            <p className="text-white/50 text-sm mt-2 flex items-center gap-1"><MapPin size={14} /> {data.region}{data.state ? `, ${data.state}` : ''}</p>
          )}
          {data.bio && <p className="text-white/70 leading-relaxed mt-6 whitespace-pre-line">{data.bio}</p>}
          <div className="flex flex-wrap gap-3 mt-8">
            {data.phone && <a href={`tel:${data.phone}`} className="btn-primary px-6 py-3 rounded-full font-semibold flex items-center gap-2"><Phone size={16} /> Call</a>}
            {data.email && <a href={`mailto:${data.email}`} className="border border-white/20 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:border-brand-lime transition-colors"><Mail size={16} /> Email</a>}
          </div>
        </div>
      </div>
    </Section>
  );
}
