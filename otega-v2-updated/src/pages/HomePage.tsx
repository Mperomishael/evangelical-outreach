import { Link, useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowRight, Flame, HeartHandshake, Users, BookOpen, HandHeart, Sparkles } from 'lucide-react';
import type { SiteSettings, Evangelist, Testimony, BlogPost } from '../lib/types';
import { getPublishedEvangelists, getApprovedTestimonies, getPublishedPosts } from '../lib/publicData';
import { Section, Eyebrow, Loader } from '../components/ui';
import EvangelistCard from '../components/EvangelistCard';
import TestimonyCard from '../components/TestimonyCard';
import BlogCard from '../components/BlogCard';
import Reveal from '../components/Reveal';
import Seo from '../components/Seo';

export default function HomePage() {
  const ctx = useOutletContext<{ settings: SiteSettings } | null>();
  const settings = ctx?.settings;
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
      <Seo
        settings={settings || undefined}
        description={
          settings?.hero_subtext ||
          settings?.tagline ||
          'Otega Outreach mobilizes evangelists, shares testimonies, and equips ministry across Nigeria and beyond.'
        }
        image={settings?.hero_image_url || settings?.logo_url}
      />

      {/* HERO — clear image, faint blue wash only */}
      <section className="relative overflow-hidden min-h-[78vh] flex items-center">
        {/* Background image — sharp, no heavy blur */}
        <div className="absolute inset-0">
          {settings?.hero_image_url ? (
            <img
              src={settings?.hero_image_url}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-brand-soft via-brand-milk to-brand-cream" />
          )}
          {/* Faint blue overlay only — image stays readable */}
          <div className="absolute inset-0 bg-brand-blue/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-milk via-brand-milk/40 to-transparent" />
        </div>

        {/* Soft decorative blobs */}
        <div className="hero-blob absolute -top-24 -right-16 w-72 h-72 rounded-full bg-brand-sky/20 blur-3xl" />
        <div className="hero-blob absolute bottom-10 -left-20 w-64 h-64 rounded-full bg-brand-blue/15 blur-3xl" style={{ animationDelay: '2s' }} />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28 w-full">
          <div className="max-w-3xl">
            <div className="hero-anim-1 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-white/60 text-brand-blue text-xs font-semibold tracking-wide uppercase shadow-soft mb-6">
              <Sparkles size={13} /> {settings?.tagline || 'Gospel Outreach'}
            </div>

            <h1 className="hero-anim-2 font-display text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-bold text-brand-ink leading-[1.08] tracking-tight drop-shadow-sm">
              {settings?.hero_headline || 'Reaching Nations With The Gospel'}
            </h1>

            <p className="hero-anim-3 mt-6 text-lg sm:text-xl text-brand-ink/80 leading-relaxed max-w-2xl">
              {settings?.hero_subtext ||
                'Mobilizing evangelists, sharing testimonies, and equipping ministry across Nigeria and beyond.'}
            </p>

            <div className="hero-anim-4 mt-10 flex flex-wrap gap-3 sm:gap-4">
              <Link
                to="/evangelists"
                className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold"
              >
                Meet Our Evangelists <ArrowRight size={16} />
              </Link>
              <Link
                to="/donate"
                className="btn-outline inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold"
              >
                Partner With Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <Section className="pattern-dots !pt-16 !pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Users, title: 'Evangelists', desc: 'Field workers carrying the Gospel into communities.' },
            { icon: HeartHandshake, title: 'Testimonies', desc: 'Real stories of lives transformed by Christ.' },
            { icon: BookOpen, title: 'Discipleship', desc: 'Equipping believers for lasting fruit.' },
            { icon: HandHeart, title: 'Partnership', desc: 'Join hands to reach the unreached.' },
          ].map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 90} variant="up">
              <div className="edge-card rounded-2xl p-6 h-full group">
                <div className="w-11 h-11 rounded-xl bg-brand-soft flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="text-brand-blue" size={22} />
                </div>
                <h3 className="font-display text-lg font-semibold text-brand-ink mb-2">{title}</h3>
                <p className="text-brand-muted text-sm leading-relaxed">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* EVANGELISTS */}
      <Section className="pattern-waves">
        <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
          <Reveal>
            <Eyebrow>On The Field</Eyebrow>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-ink">Our Evangelists</h2>
          </Reveal>
          <Reveal delay={120}>
            <Link to="/evangelists" className="text-brand-blue text-sm font-semibold hover:underline inline-flex items-center gap-1">
              View all <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>
        {evangelists === null ? (
          <Loader />
        ) : evangelists.length === 0 ? (
          <p className="text-brand-muted text-sm">Evangelist profiles coming soon.</p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {evangelists.map((e, i) => (
              <Reveal key={e.id} delay={i * 80} variant="up">
                <EvangelistCard e={e} />
              </Reveal>
            ))}
          </div>
        )}
      </Section>

      {/* TESTIMONIES */}
      <Section className="pattern-grid">
        <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
          <Reveal>
            <Eyebrow>Changed Lives</Eyebrow>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-ink">Testimonies</h2>
          </Reveal>
          <Reveal delay={120}>
            <Link to="/testimonies" className="text-brand-blue text-sm font-semibold hover:underline inline-flex items-center gap-1">
              View all <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>
        {testimonies === null ? (
          <Loader />
        ) : testimonies.length === 0 ? (
          <p className="text-brand-muted text-sm">Testimonies will appear here once approved.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-5">
            {testimonies.map((t, i) => (
              <Reveal key={t.id} delay={i * 90} variant="up">
                <TestimonyCard t={t} />
              </Reveal>
            ))}
          </div>
        )}
        <Reveal delay={200} className="mt-10 text-center">
          <Link to="/submit-testimony" className="btn-outline inline-flex px-6 py-3 rounded-full text-sm font-semibold">
            Share Your Testimony
          </Link>
        </Reveal>
      </Section>

      {/* BLOG */}
      <Section className="pattern-soft-blue">
        <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
          <Reveal>
            <Eyebrow>From The Field</Eyebrow>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-ink">Latest Updates</h2>
          </Reveal>
          <Reveal delay={120}>
            <Link to="/blog" className="text-brand-blue text-sm font-semibold hover:underline inline-flex items-center gap-1">
              View all <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>
        {posts === null ? (
          <Loader />
        ) : posts.length === 0 ? (
          <p className="text-brand-muted text-sm">Blog posts coming soon.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-5">
            {posts.map((p, i) => (
              <Reveal key={p.id} delay={i * 90} variant="up">
                <BlogCard post={p} />
              </Reveal>
            ))}
          </div>
        )}
      </Section>

      {/* CTA */}
      <Section className="pattern-dots">
        <Reveal variant="scale">
          <div className="relative overflow-hidden rounded-3xl border border-brand-border bg-white shadow-card p-10 sm:p-14 text-center">
            <div className="absolute -top-20 -right-16 w-56 h-56 rounded-full bg-brand-soft blur-2xl float-slow" />
            <div className="absolute -bottom-16 -left-12 w-48 h-48 rounded-full bg-brand-sky/20 blur-2xl float-slow" style={{ animationDelay: '1.5s' }} />
            <div className="relative">
              <div className="inline-flex items-center gap-2 text-brand-blue text-xs font-semibold tracking-widest uppercase mb-4">
                <Flame size={14} /> Partner With Us
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-ink mb-4">
                Help Us Reach More Souls
              </h2>
              <p className="text-brand-muted max-w-xl mx-auto mb-8 leading-relaxed">
                Your giving fuels outreach, supports evangelists, and multiplies the impact of the Gospel across communities.
              </p>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                <Link to="/donate" className="btn-primary inline-flex px-8 py-3.5 rounded-full text-sm font-semibold">
                  Give Now
                </Link>
                <Link to="/prayer" className="btn-outline inline-flex px-8 py-3.5 rounded-full text-sm font-semibold">
                  Request Prayer
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
