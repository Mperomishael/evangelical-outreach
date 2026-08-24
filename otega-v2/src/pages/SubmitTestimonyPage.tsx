import { Section, Eyebrow } from '../components/ui';
import TestimonySubmitForm from '../components/TestimonySubmitForm';

export default function SubmitTestimonyPage() {
  return (
    <Section className="max-w-2xl mx-auto">
      <Eyebrow>Share Your Story</Eyebrow>
      <h1 className="font-display text-4xl text-white font-bold mb-3">Submit a Testimony</h1>
      <p className="text-white/60 mb-8">Tell us what God has done in your life. Approved testimonies are featured on the site.</p>
      <TestimonySubmitForm />
    </Section>
  );
}
