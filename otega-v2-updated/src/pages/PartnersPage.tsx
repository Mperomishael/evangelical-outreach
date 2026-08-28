import { useEffect, useState } from 'react';
import type { Partner } from '../lib/types';
import { getPublishedPartners } from '../lib/publicData';
import { Section, Eyebrow, Loader, EmptyState } from '../components/ui';
import PartnerCard from '../components/PartnerCard';

export default function PartnersPage() {
  const [data, setData] = useState<Partner[] | null>(null);
  useEffect(() => { getPublishedPartners().then(setData).catch(() => setData([])); }, []);

  return (
    <Section>
      <Eyebrow>Working Together</Eyebrow>
      <h1 className="font-display text-4xl sm:text-5xl text-brand-ink font-bold mb-10">Our Partners</h1>
      {data === null ? <Loader /> : data.length === 0 ? <EmptyState title="No partners listed yet" message="Ministry and organizational partners will appear here." /> : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.map((p) => <PartnerCard key={p.id} p={p} />)}
        </div>
      )}
    </Section>
  );
}
