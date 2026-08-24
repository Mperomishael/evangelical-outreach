import { Link } from 'react-router-dom';
import type { BlogPost } from '../lib/types';

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link to={`/blog/${post.slug}`} className="edge-card rounded-2xl overflow-hidden group focus-ring block flex flex-col">
      <div className="aspect-video bg-white/5 overflow-hidden">
        {post.featured_image ? (
          <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/20 text-sm">No image</div>
        )}
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <span className="text-brand-yellow text-xs font-semibold uppercase tracking-wide">{post.category}</span>
        <h3 className="font-display text-white font-semibold mt-2 leading-snug">{post.title}</h3>
        <p className="text-white/50 text-sm mt-2 line-clamp-2 flex-1">{post.excerpt}</p>
        <span className="text-white/30 text-xs mt-4">{new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
      </div>
    </Link>
  );
}
