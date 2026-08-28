import { useOutletContext } from 'react-router-dom';
import type { SiteSettings } from '../lib/types';
import { Section, Eyebrow } from '../components/ui';
import DonationForm from '../components/DonationForm';

export default function DonatePage() {
  const { settings } = useOutletContext<{ settings: SiteSettings }>();
  return (
    <Section className="max-w-xl mx-auto">
      <Eyebrow>Sow Into The Harvest</Eyebrow>
      <h1 className="font-display text-4xl text-brand-ink font-bold mb-3">Give</h1>
      <p className="text-brand-muted mb-8">Every gift sends evangelists further and equips lives transformed by the Gospel.</p>
      <DonationForm settings={settings} />
    </Section>
  );
}
