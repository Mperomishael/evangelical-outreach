import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Flame } from 'lucide-react';
import type { SiteSettings } from '../lib/types';

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Founder', to: '/founder' },
  { label: 'Evangelists', to: '/evangelists' },
  { label: 'Testimonies', to: '/testimonies' },
  { label: 'Media', to: '/media' },
  { label: 'Blog', to: '/blog' },
  { label: 'Partners', to: '/partners' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar({ settings }: { settings: SiteSettings }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/10">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-8 py-4">
        <Link to="/" className="flex items-center gap-2 text-white font-display font-semibold text-lg">
          {settings.logo_url ? (
            <img src={settings.logo_url} alt={settings.org_name} className="h-8 w-8 rounded-md object-cover" />
          ) : (
            <Flame size={22} className="text-brand-lime" strokeWidth={1.75} />
          )}
          <span>{settings.org_name}</span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive ? 'text-brand-lime' : 'text-white/70 hover:text-white'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link to="/prayer" className="text-sm font-medium text-white/70 hover:text-white transition-colors px-3 py-2">
            Prayer
          </Link>
          <Link to="/donate" className="btn-primary text-sm font-semibold px-5 py-2.5 rounded-full transition-colors">
            Give
          </Link>
        </div>

        <button
          className="lg:hidden text-white p-2 border border-white/10 rounded-lg focus-ring"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-white/10 bg-black px-5 py-4 flex flex-col gap-1">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-3 py-3 rounded-lg text-sm font-medium ${isActive ? 'text-brand-lime bg-white/5' : 'text-white/80'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <div className="flex gap-2 mt-2 pt-3 border-t border-white/10">
            <Link to="/prayer" onClick={() => setOpen(false)} className="flex-1 text-center border border-white/15 text-white text-sm font-medium px-4 py-3 rounded-full">
              Prayer
            </Link>
            <Link to="/donate" onClick={() => setOpen(false)} className="flex-1 text-center btn-primary text-sm font-semibold px-4 py-3 rounded-full">
              Give
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
