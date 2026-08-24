import { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { ArrowRight, Users, HeartHandshake, Globe2, BookOpen } from 'lucide-react';
import type { SiteSettings, Evangelist, Testimony, BlogPost } from '../lib/types';
import { getPublishedEvangelists, getApprovedTestimonies, getPublishedPosts } from '../lib/publicData';
import { Section, Eyebrow } from '../components/ui';
import EvangelistCard from '../components/EvangelistCard';
import TestimonyCard from '../components/TestimonyCard';
import BlogCard from '../components/BlogCard';

export default function HomePage() {
  const { settings } = useOutletContext<{ settings: SiteSettings }>();
  const [evangelists, setEvangelists] = useState<Evangelist[]>([]);
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    getPublishedEvangelists().then((d) => setEvangelists(d.slice(0, 4))).catch(() => {});
    getApprovedTestimonies().then((d) => setTestimonies(d.slice(0, 3))).catch(() => {});
    getPublishedPosts().then((d) => setPosts(d.slice(0, 3))).catch(() => {});
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          {settings.hero_video_url ? (
            <video autoPlay muted loop playsInline className="w-full h-full object-cover" src={settings.hero_video_url} />
          ) : settings.hero_image_url ? (
            <img src={settings.hero_image_url} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-black via-black to-[#141d05]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        </div>

        <div className="relative z-10 max-w-4xl px-5 sm:px-8 pb-16 sm:pb-24">
          <Eyebrow>{settings.tagline}</Eyebrow>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight">
            {settings.hero_headline}
          </h1>
          <p className="text-white/60 text-base sm:text-lg mt-6 max-w-xl leading-relaxed">{settings.hero_subtext}</p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link to="/founder" className="btn-primary px-7 py-3.5 rounded-full font-semibold flex items-center gap-2">
              Meet the Founder <ArrowRight size={16} />
            </Link>
            <Link to="/donate" className="border border-white/20 text-white px-7 py-3.5 rounded-full font-semibold hover:border-brand-lime transition-colors">
              Give
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <Section className="border-b border-white/5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Users, label: 'Evangelists', value: `${evangelists.length}+` },
            { icon: HeartHandshake, label: 'Testimonies', value: `${testimonies.length}+` },
            { icon: Globe2, label: 'Regions Reached', value: 'Nigeria & Beyond' },
            { icon: BookOpen, label: 'Stories Shared', value: `${posts.length}+` },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="text-center">
              <Icon className="mx-auto text-brand-lime mb-3" size={24} />
              <div className="font-display text-2xl text-white font-bold">{value}</div>
              <div className="text-white/40 text-xs uppercase tracking-wide mt-1">{label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* EVANGELISTS */}
      <Section>
        <div className="flex items-end justify-between mb-8">
          <div>
            <Eyebrow>On The Field</Eyebrow>
            <h2 className="font-display text-3xl sm:text-4xl text-white font-bold">Our Evangelists</h2>
          </div>
          <Link to="/evangelists" className="hidden sm:flex items-center gap-1 text-brand-lime text-sm font-medium">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {evangelists.map((e) => <EvangelistCard key={e.id} e={e} />)}
        </div>
      </Section>

      {/* TESTIMONIES */}
      {testimonies.length > 0 && (
        <Section className="bg-white/[0.02] border-y border-white/5">
          <Eyebrow>Changed Lives</Eyebrow>
          <h2 className="font-display text-3xl sm:text-4xl text-white font-bold mb-8">Testimonies</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonies.map((t) => <TestimonyCard key={t.id} t={t} />)}
          </div>
        </Section>
      )}

      {/* BLOG */}
      {posts.length > 0 && (
        <Section>
          <Eyebrow>From The Field</Eyebrow>
          <h2 className="font-display text-3xl sm:text-4xl text-white font-bold mb-8">Latest Stories</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {posts.map((p) => <BlogCard key={p.id} post={p} />)}
          </div>
        </Section>
      )}

      {/* CTA */}
      <Section className="border-t border-white/5">
        <div className="edge-card rounded-3xl p-10 sm:p-16 text-center bg-gradient-to-br from-white/[0.03] to-transparent">
          <h2 className="font-display text-3xl sm:text-4xl text-white font-bold">Carry someone in prayer today</h2>
          <p className="text-white/60 mt-3 max-w-lg mx-auto">Submit a prayer request and our team will stand with you.</p>
          <Link to="/prayer" className="btn-primary inline-flex px-7 py-3.5 rounded-full font-semibold mt-6">Request Prayer</Link>
        </div>
      </Section>
    </>
  );
}
