import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import type { BlogPost } from '../lib/types';
import { getPostBySlug } from '../lib/publicData';
import { Section, Loader, EmptyState } from '../components/ui';

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined);

  useEffect(() => { if (slug) getPostBySlug(slug).then(setPost).catch(() => setPost(null)); }, [slug]);

  if (post === undefined) return <Loader />;
  if (post === null) return <Section><EmptyState title="Post not found" message="This article may have been removed." /></Section>;

  return (
    <Section className="max-w-3xl mx-auto">
      <Link to="/blog" className="inline-flex items-center gap-1 text-brand-muted text-sm mb-8 hover:text-brand-ink transition-colors">
        <ArrowLeft size={14} /> All posts
      </Link>
      {post.featured_image && <img src={post.featured_image} alt={post.title} className="w-full aspect-video object-cover rounded-2xl mb-8" />}
      <span className="text-brand-sky text-xs font-semibold uppercase tracking-wide">{post.category}</span>
      <h1 className="font-display text-3xl sm:text-5xl text-brand-ink font-bold mt-3 leading-tight">{post.title}</h1>
      <div className="flex items-center gap-3 text-brand-muted text-sm mt-4">
        <span>{post.author}</span><span>·</span>
        <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
      </div>
      <div className="prose prose-invert max-w-none mt-10">
        {post.content.split('\n').filter(Boolean).map((para, i) => (
          <p key={i} className="text-brand-muted leading-relaxed text-lg mb-5">{para}</p>
        ))}
      </div>
    </Section>
  );
}
