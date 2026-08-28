import { Link } from 'react-router-dom';
import { Section } from '../components/ui';

export default function NotFoundPage() {
  return (
    <Section className="text-center py-32">
      <h1 className="font-display text-6xl text-brand-ink font-bold">404</h1>
      <p className="text-brand-muted mt-3">Page not found.</p>
      <Link to="/" className="btn-primary inline-flex px-6 py-3 rounded-full font-semibold mt-8">Back Home</Link>
    </Section>
  );
}
