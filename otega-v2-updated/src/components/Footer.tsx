import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import type { SiteSettings } from '../lib/types';

export default function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();
  const socials = [
    { url: settings.facebook_url, Icon: Facebook, label: 'Facebook' },
    { url: settings.instagram_url, Icon: Instagram, label: 'Instagram' },
    { url: settings.youtube_url, Icon: Youtube, label: 'YouTube' },
    { url: settings.twitter_url, Icon: Twitter, label: 'Twitter' },
  ].filter((s) => s.url);

  return (
    <footer className="bg-brand-cream border-t border-brand-border text-brand-muted">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10 grid md:grid-cols-4 gap-10">
        <div>
          <div className="font-display text-2xl font-semibold text-brand-ink mb-3">{settings.org_name}</div>
          <p className="text-sm leading-relaxed">{settings.tagline}</p>
          {socials.length > 0 && (
            <div className="flex gap-3 mt-6">
              {socials.map(({ url, Icon, label }) => (
                <a key={label} href={url!} target="_blank" rel="noreferrer" aria-label={label}
                   className="w-9 h-9 rounded-full border border-brand-border bg-white flex items-center justify-center text-brand-muted hover:border-brand-blue hover:text-brand-blue transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-brand-muted/80 mb-4">Explore</div>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/founder" className="hover:text-brand-blue transition-colors">Founder</Link>
            <Link to="/evangelists" className="hover:text-brand-blue transition-colors">Evangelists</Link>
            <Link to="/testimonies" className="hover:text-brand-blue transition-colors">Testimonies</Link>
            <Link to="/blog" className="hover:text-brand-blue transition-colors">Blog</Link>
            <Link to="/partners" className="hover:text-brand-blue transition-colors">Partners</Link>
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-brand-muted/80 mb-4">Get Involved</div>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/submit-testimony" className="hover:text-brand-blue transition-colors">Share a Testimony</Link>
            <Link to="/prayer" className="hover:text-brand-blue transition-colors">Request Prayer</Link>
            <Link to="/donate" className="hover:text-brand-blue transition-colors">Give</Link>
            <Link to="/contact" className="hover:text-brand-blue transition-colors">Contact Us</Link>
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-brand-muted/80 mb-4">Contact</div>
          <div className="flex flex-col gap-3 text-sm">
            {settings.contact_email && (
              <a href={`mailto:${settings.contact_email}`} className="flex items-center gap-2 hover:text-brand-blue transition-colors">
                <Mail size={14} /> {settings.contact_email}
              </a>
            )}
            {settings.contact_phone && (
              <a href={`tel:${settings.contact_phone}`} className="flex items-center gap-2 hover:text-brand-blue transition-colors">
                <Phone size={14} /> {settings.contact_phone}
              </a>
            )}
            {settings.address && (
              <div className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" /> <span>{settings.address}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-brand-border py-6 text-center text-xs text-brand-muted/70">
        © {year} {settings.org_name}. All rights reserved.
      </div>
    </footer>
  );
}
