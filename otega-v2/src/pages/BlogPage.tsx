import { useEffect, useState } from 'react';
import type { BlogPost } from '../lib/types';
import { getPublishedPosts } from '../lib/publicData';
import { Section, Eyebrow, Loader, EmptyState } from '../components/ui';
import BlogCard from '../components/BlogCard';

export default function BlogPage() {
  const [data, setData] = useState<BlogPost[] | null>(null);
  useEffect(() => { getPublishedPosts().then(setData).catch(() => setData([])); }, []);

  return (
    <Section>
      <Eyebrow>From The Field</Eyebrow>
      <h1 className="font-display text-4xl sm:text-5xl text-white font-bold mb-10">Blog & Updates</h1>
      {data === null ? <Loader /> : data.length === 0 ? (
        <EmptyState title="No posts yet" message="New stories from the field are posted regularly." />
      ) : (
        <div className="grid md:grid-cols-3 gap-5">
          {data.map((p) => <BlogCard key={p.id} post={p} />)}
        </div>
      )}
    </Section>
  );
}
