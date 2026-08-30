import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type { SiteSettings } from '../lib/types';

const SITE_URL = 'https://www.otegaoutreach.org';

/** Remove any HTML/script tags that might leak into titles or meta */
function cleanText(value: unknown, fallback = ''): string {
  if (value == null) return fallback;
  const s = String(value)
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
  return s || fallback;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  const safe = cleanText(content);
  if (!safe) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', safe);
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertJsonLd(id: string, data: Record<string, unknown>) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.id = id;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export interface SeoProps {
  title?: string;
  description?: string;
  image?: string | null;
  type?: 'website' | 'article' | 'profile';
  noIndex?: boolean;
  settings?: SiteSettings;
}

export default function Seo({
  title,
  description,
  image,
  type = 'website',
  noIndex = false,
  settings,
}: SeoProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    const org = cleanText(settings?.org_name, 'Otega Outreach');
    const tagline = cleanText(
      settings?.tagline,
      'Reaching Nations With The Gospel - mobilizing evangelists across Nigeria and beyond.'
    );
    const shortTag = cleanText(tagline.split(/[-—|]/)[0], org);
    const pageTitle = title
      ? `${cleanText(title)} | ${org}`
      : `${org} - ${shortTag}`;
    const desc = cleanText(
      description || settings?.hero_subtext || tagline,
      tagline
    );
    const img =
      (typeof image === 'string' && image) ||
      settings?.hero_image_url ||
      settings?.logo_url ||
      `${SITE_URL}/favicon.svg`;
    const url = `${SITE_URL}${pathname === '/' ? '' : pathname}`;

    document.title = pageTitle;
    upsertMeta('name', 'description', desc);
    upsertMeta(
      'name',
      'robots',
      noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'
    );
    upsertMeta('name', 'author', org);
    upsertMeta('name', 'theme-color', '#1E5AA8');

    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:site_name', org);
    upsertMeta('property', 'og:title', pageTitle);
    upsertMeta('property', 'og:description', desc);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', String(img));
    upsertMeta('property', 'og:locale', 'en_NG');

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', pageTitle);
    upsertMeta('name', 'twitter:description', desc);
    upsertMeta('name', 'twitter:image', String(img));

    upsertLink('canonical', url);

    const sameAs = [
      settings?.facebook_url,
      settings?.instagram_url,
      settings?.youtube_url,
      settings?.twitter_url,
    ].filter((u): u is string => Boolean(u));

    const orgLd: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: org,
      url: SITE_URL,
      description: desc,
    };
    if (settings?.logo_url) orgLd.logo = settings.logo_url;
    if (settings?.contact_email) orgLd.email = settings.contact_email;
    if (settings?.contact_phone) orgLd.telephone = settings.contact_phone;
    if (settings?.address) {
      orgLd.address = {
        '@type': 'PostalAddress',
        streetAddress: settings.address,
        addressCountry: 'NG',
      };
    }
    if (sameAs.length) orgLd.sameAs = sameAs;

    upsertJsonLd('ld-org', orgLd);
    upsertJsonLd('ld-website', {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: org,
      url: SITE_URL,
      description: desc,
    });
  }, [title, description, image, type, noIndex, settings, pathname]);

  return null;
}
