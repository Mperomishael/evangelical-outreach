import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { Section } from '../components/ui';

export default function ThankYouPage() {
  return (
    <Section className="max-w-lg mx-auto text-center py-32">
      <CheckCircle2 className="text-brand-blue mx-auto mb-6" size={48} />
      <h1 className="font-display text-3xl text-brand-ink font-bold">Thank You</h1>
      <p className="text-brand-muted mt-3">Your action has been received. We deeply appreciate your partnership in the Gospel.</p>
      <Link to="/" className="btn-primary inline-flex px-6 py-3 rounded-full font-semibold mt-8">Back Home</Link>
    </Section>
  );
}
