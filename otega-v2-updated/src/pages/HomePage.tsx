import { Link, useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowRight, Flame, HeartHandshake, Users, BookOpen, HandHeart } from 'lucide-react';
import type { SiteSettings, Evangelist, Testimony, BlogPost } from '../lib/types';
import { getPublishedEvangelists, getApprovedTestimonies, getPublishedPosts } from '../lib/publicData';
import { Section, Eyebrow, Loader } from '../components/ui';
import EvangelistCard from '../components/EvangelistCard';
import TestimonyCard from '../components/TestimonyCard';
import BlogCard from '../components/BlogCard';

export default function HomePage() {
  const { settings } = useOutletContext<{ settings: SiteSettings }>();
  const [evangelists, setEvangelists] = useState<Evangelist[] | null>(null);
  const [testimonies, setTestimonies] = useState<Testimony[] | null>(null);
  const [posts, setPosts] = useState<BlogPost[] | null>(null);

  useEffect(() => {
    getPublishedEvangelists().then((d) => setEvangelists(d.slice(0, 4))).catch(() => setEvangelists([]));
    getApprovedTestimonies().then((d) => setTestimonies(d.slice(0, 3))).catch(() => setTestimonies([]));
    getPublishedPosts().then((d) => setPosts(d.slice(0, 3))).catch(() => setPosts([]));
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        {settings.hero_image_url && (
          <div className="absolute inset-0">
            <img src={settings.hero_image_url} alt="" className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/40 via-brand-milk/90 to-brand-milk" />
          </div>
        )}
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-20 sm:pt-28 pb-24 sm:pb-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-brand-blue text-xs font-semibold tracking-widest uppercase mb-6">
              <Flame size={14} /> {settings.tagline || 'Gospel Outreach'}
            </div>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-brand-ink leading-[1.1] tracking-tight">
              {settings.hero_headline || 'Reaching Nations With The Gospel'}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-brand-muted leading-relaxed max-w-2xl">
              {settings.hero_subtext ||
                'Mobilizing evangelists, sharing testimonies, and equipping ministry across Nigeria and beyond.'}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/evangelists" className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold">
                Meet Our Evangelists <ArrowRight size={16} />
              </Link>
              <Link to="/donate" className="btn-outline inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold">
                Partner With Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS / PILLARS */}
      <Section className="!pt-0">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Users, title: 'Evangelists', desc: 'Field workers carrying the Gospel into communities.' },
            { icon: HeartHandshake, title: 'Testimonies', desc: 'Real stories of lives transformed by Christ.' },
            { icon: BookOpen, title: 'Discipleship', desc: 'Equipping believers for lasting fruit.' },
            { icon: HandHeart, title: 'Partnership', desc: 'Join hands to reach the unreached.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="edge-card rounded-2xl p-6">
              <Icon className="text-brand-blue mb-4" size={24} />
              <h3 className="font-display text-lg font-semibold text-brand-ink mb-2">{title}</h3>
              <p className="text-brand-muted text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* EVANGELISTS PREVIEW */}
      <Section>
        <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
          <div>
            <Eyebrow>On The Field</Eyebrow>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-ink">Our Evangelists</h2>
          </div>
          <Link to="/evangelists" className="text-brand-blue text-sm font-semibold hover:underline inline-flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        {evangelists === null ? (
          <Loader />
        ) : evangelists.length === 0 ? (
          <p className="text-brand-muted text-sm">Evangelist profiles coming soon.</p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {evangelists.map((e) => (
              <EvangelistCard key={e.id} e={e} />
            ))}
          </div>
        )}
      </Section>

      {/* TESTIMONIES PREVIEW */}
      <Section className="bg-brand-cream">
        <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
          <div>
            <Eyebrow>Changed Lives</Eyebrow>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-ink">Testimonies</h2>
          </div>
          <Link to="/testimonies" className="text-brand-blue text-sm font-semibold hover:underline inline-flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        {testimonies === null ? (
          <Loader />
        ) : testimonies.length === 0 ? (
          <p className="text-brand-muted text-sm">Testimonies will appear here once approved.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-5">
            {testimonies.map((t) => (
              <TestimonyCard key={t.id} t={t} />
            ))}
          </div>
        )}
        <div className="mt-10 text-center">
          <Link to="/submit-testimony" className="btn-outline inline-flex px-6 py-3 rounded-full text-sm font-semibold">
            Share Your Testimony
          </Link>
        </div>
      </Section>

      {/* BLOG PREVIEW */}
      <Section>
        <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
          <div>
            <Eyebrow>From The Field</Eyebrow>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-ink">Latest Updates</h2>
          </div>
          <Link to="/blog" className="text-brand-blue text-sm font-semibold hover:underline inline-flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        {posts === null ? (
          <Loader />
        ) : posts.length === 0 ? (
          <p className="text-brand-muted text-sm">Blog posts coming soon.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-5">
            {posts.map((p) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </div>
        )}
      </Section>

      {/* CTA */}
      <Section>
        <div className="edge-card rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 via-transparent to-brand-sky/5 pointer-events-none" />
          <div className="relative">
            <Eyebrow>Partner With Us</Eyebrow>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-ink mb-4">
              Help Us Reach More Souls
            </h2>
            <p className="text-brand-muted max-w-xl mx-auto mb-8">
              Your giving fuels outreach, supports evangelists, and multiplies the impact of the Gospel across communities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/donate" className="btn-primary inline-flex px-8 py-3.5 rounded-full text-sm font-semibold">
                Give Now
              </Link>
              <Link to="/prayer" className="btn-outline inline-flex px-8 py-3.5 rounded-full text-sm font-semibold">
                Request Prayer
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
