import { useOutletContext, Link } from 'react-router-dom';
import type { SiteSettings } from '../lib/types';
import { Section, Eyebrow } from '../components/ui';

export default function AboutPage() {
  const { settings } = useOutletContext<{ settings: SiteSettings }>();
  return (
    <Section className="max-w-3xl">
      <Eyebrow>Who We Are</Eyebrow>
      <h1 className="font-display text-4xl sm:text-5xl text-white font-bold mb-6">{settings.org_name}</h1>
      <p className="text-white/70 leading-relaxed text-lg mb-4">{settings.tagline}</p>
      <p className="text-white/60 leading-relaxed">
        We exist to mobilize evangelists, equip local ministry, and carry the Gospel to communities across Nigeria and beyond —
        through outreach, discipleship, and stories of changed lives.
      </p>
      <Link to="/founder" className="btn-primary inline-flex px-6 py-3 rounded-full font-semibold mt-8">Meet Our Founder</Link>
    </Section>
  );
}
