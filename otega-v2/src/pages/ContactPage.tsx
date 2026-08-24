import { useOutletContext } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import type { SiteSettings } from '../lib/types';
import { Section, Eyebrow } from '../components/ui';
import ContactForm from '../components/ContactForm';

export default function ContactPage() {
  const { settings } = useOutletContext<{ settings: SiteSettings }>();
  return (
    <Section>
      <Eyebrow>Reach Out</Eyebrow>
      <h1 className="font-display text-4xl sm:text-5xl text-white font-bold mb-10">Get In Touch</h1>
      <div className="grid lg:grid-cols-2 gap-12">
        <ContactForm />
        <div className="space-y-6">
          {settings.address && (
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0"><MapPin className="text-brand-lime" size={18} /></div>
              <p className="text-white/70">{settings.address}</p>
            </div>
          )}
          {settings.contact_phone && (
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0"><Phone className="text-brand-lime" size={18} /></div>
              <a href={`tel:${settings.contact_phone}`} className="text-white/70 hover:text-white">{settings.contact_phone}</a>
            </div>
          )}
          {settings.contact_email && (
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0"><Mail className="text-brand-lime" size={18} /></div>
              <a href={`mailto:${settings.contact_email}`} className="text-white/70 hover:text-white">{settings.contact_email}</a>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
