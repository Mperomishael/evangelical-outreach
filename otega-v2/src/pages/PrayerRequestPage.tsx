import { Section, Eyebrow } from '../components/ui';
import PrayerRequestForm from '../components/PrayerRequestForm';

export default function PrayerRequestPage() {
  return (
    <Section className="max-w-2xl mx-auto">
      <Eyebrow>We Stand With You</Eyebrow>
      <h1 className="font-display text-4xl text-white font-bold mb-3">Request Prayer</h1>
      <p className="text-white/60 mb-8">Whatever you're facing, our prayer team is here for you.</p>
      <PrayerRequestForm />
    </Section>
  );
}
