import { useEffect, useState } from 'react';
import type { Evangelist } from '../lib/types';
import { getPublishedEvangelists } from '../lib/publicData';
import { Section, Eyebrow, Loader, EmptyState } from '../components/ui';
import EvangelistCard from '../components/EvangelistCard';

export default function EvangelistsPage() {
  const [data, setData] = useState<Evangelist[] | null>(null);

  useEffect(() => { getPublishedEvangelists().then(setData).catch(() => setData([])); }, []);

  return (
    <Section>
      <Eyebrow>On The Field</Eyebrow>
      <h1 className="font-display text-4xl sm:text-5xl text-white font-bold mb-10">Our Evangelists</h1>
      {data === null ? (
        <Loader />
      ) : data.length === 0 ? (
        <EmptyState title="No evangelists listed yet" message="Check back soon — new profiles are added regularly." />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {data.map((e) => <EvangelistCard key={e.id} e={e} />)}
        </div>
      )}
    </Section>
  );
}
