import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Testimony } from '../lib/types';
import { getApprovedTestimonies } from '../lib/publicData';
import { Section, Eyebrow, Loader, EmptyState } from '../components/ui';
import TestimonyCard from '../components/TestimonyCard';

export default function TestimoniesPage() {
  const [data, setData] = useState<Testimony[] | null>(null);

  useEffect(() => { getApprovedTestimonies().then(setData).catch(() => setData([])); }, []);

  return (
    <Section>
      <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
        <div>
          <Eyebrow>Changed Lives</Eyebrow>
          <h1 className="font-display text-4xl sm:text-5xl text-white font-bold">Testimonies</h1>
        </div>
        <Link to="/submit-testimony" className="btn-primary px-6 py-3 rounded-full font-semibold">Share Yours</Link>
      </div>
      {data === null ? <Loader /> : data.length === 0 ? (
        <EmptyState title="No testimonies yet" message="Be the first to share what God has done." />
      ) : (
        <div className="grid md:grid-cols-3 gap-5">
          {data.map((t) => <TestimonyCard key={t.id} t={t} />)}
        </div>
      )}
    </Section>
  );
}
