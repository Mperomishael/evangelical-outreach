import { useOutletContext, Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Quote, Phone, Mail } from 'lucide-react';
import type { SiteSettings } from '../lib/types';
import { Section, Eyebrow } from '../components/ui';

// The dedicated Founder page — content (photo, bio, vision, mission, quote,
// socials) is fully editable from Admin → Settings → Founder, so the org
// can update it without a redeploy.
export default function FounderPage() {
  const { settings } = useOutletContext<{ settings: SiteSettings }>();

  const socials = [
    { url: settings.founder_facebook_url, Icon: Facebook, label: 'Facebook' },
    { url: settings.founder_instagram_url, Icon: Instagram, label: 'Instagram' },
    { url: settings.founder_youtube_url, Icon: Youtube, label: 'YouTube' },
  ].filter((s) => s.url);

  return (
    <>
      {/* HERO */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-16 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-white edge-card">
              {settings.founder_photo_url ? (
                <img src={settings.founder_photo_url} alt={settings.founder_name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-brand-muted/40 font-display text-6xl">
                  {(settings.founder_name || settings.org_name).charAt(0)}
                </div>
              )}
            </div>
          </div>
          <div className="md:col-span-7">
            <Eyebrow>{settings.founder_title || 'Founder & President'}</Eyebrow>
            <h1 className="font-display text-4xl sm:text-6xl text-brand-ink font-bold leading-tight tracking-tight">
              {settings.founder_name || 'The Founder'}
            </h1>

            {settings.founder_quote && (
              <div className="mt-8 flex gap-4">
                <Quote className="text-brand-blue flex-shrink-0" size={28} />
                <p className="text-brand-ink text-lg sm:text-xl leading-relaxed italic">{settings.founder_quote}</p>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4 mt-8">
              {settings.contact_phone && (
                <a href={`tel:${settings.contact_phone}`} className="btn-primary px-6 py-3 rounded-full font-semibold flex items-center gap-2">
                  <Phone size={16} /> Call
                </a>
              )}
              {settings.contact_email && (
                <a href={`mailto:${settings.contact_email}`} className="border border-brand-border text-brand-ink px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:border-brand-blue transition-colors">
                  <Mail size={16} /> Email
                </a>
              )}
              {socials.map(({ url, Icon, label }) => (
                <a key={label} href={url!} target="_blank" rel="noreferrer" aria-label={label}
                   className="w-11 h-11 rounded-full border border-brand-border flex items-center justify-center hover:border-brand-blue hover:text-brand-blue transition-colors">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BIO */}
      {settings.founder_bio && (
        <Section className="border-t border-brand-border">
          <Eyebrow>Biography</Eyebrow>
          <div className="prose prose-invert max-w-3xl">
            {settings.founder_bio.split('\n').filter(Boolean).map((para, i) => (
              <p key={i} className="text-brand-muted leading-relaxed text-base sm:text-lg mb-4">{para}</p>
            ))}
          </div>
        </Section>
      )}

      {/* VISION / MISSION */}
      {(settings.founder_vision || settings.founder_mission) && (
        <Section className="bg-brand-cream border-y border-brand-border">
          <div className="grid md:grid-cols-2 gap-6">
            {settings.founder_vision && (
              <div className="edge-card rounded-2xl p-8">
                <h3 className="font-display text-2xl text-brand-ink font-semibold mb-3">Vision</h3>
                <p className="text-brand-muted leading-relaxed">{settings.founder_vision}</p>
              </div>
            )}
            {settings.founder_mission && (
              <div className="edge-card rounded-2xl p-8">
                <h3 className="font-display text-2xl text-brand-ink font-semibold mb-3">Mission</h3>
                <p className="text-brand-muted leading-relaxed">{settings.founder_mission}</p>
              </div>
            )}
          </div>
        </Section>
      )}

      <Section>
        <div className="edge-card rounded-3xl p-10 sm:p-16 text-center bg-gradient-to-br from-white/[0.03] to-transparent">
          <h2 className="font-display text-3xl sm:text-4xl text-brand-ink font-bold">Partner with {settings.founder_name || 'the ministry'}</h2>
          <p className="text-brand-muted mt-3 max-w-lg mx-auto">Your support fuels evangelists on the field every day.</p>
          <Link to="/donate" className="btn-primary inline-flex px-7 py-3.5 rounded-full font-semibold mt-6">Give Today</Link>
        </div>
      </Section>
    </>
  );
}
