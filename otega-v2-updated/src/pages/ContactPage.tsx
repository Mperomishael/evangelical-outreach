import { useOutletContext } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import type { SiteSettings } from '../lib/types';
import { Section, Eyebrow } from '../components/ui';
import Seo from '../components/Seo';
import ContactForm from '../components/ContactForm';

export default function ContactPage() {
  const _ctx = useOutletContext<{ settings: SiteSettings } | null>();
  const settings = _ctx?.settings ?? ({} as SiteSettings);
  return (
    <>
      <Seo settings={settings} title="Contact" description={`Contact ${settings.org_name}. We would love to hear from you.`} />
      <Section>
      <Eyebrow>Reach Out</Eyebrow>
      <h1 className="font-display text-4xl sm:text-5xl text-brand-ink font-bold mb-10">Get In Touch</h1>
      <div className="grid lg:grid-cols-2 gap-12">
        <ContactForm />
        <div className="space-y-6">
          {settings.address && (
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center flex-shrink-0"><MapPin className="text-brand-blue" size={18} /></div>
              <p className="text-brand-muted">{settings.address}</p>
            </div>
          )}
          {settings.contact_phone && (
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center flex-shrink-0"><Phone className="text-brand-blue" size={18} /></div>
              <a href={`tel:${settings.contact_phone}`} className="text-brand-muted hover:text-brand-ink">{settings.contact_phone}</a>
            </div>
          )}
          {settings.contact_email && (
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center flex-shrink-0"><Mail className="text-brand-blue" size={18} /></div>
              <a href={`mailto:${settings.contact_email}`} className="text-brand-muted hover:text-brand-ink">{settings.contact_email}</a>
            </div>
          )}
        </div>
      </div>
    </Section>
    </>
  );
}
