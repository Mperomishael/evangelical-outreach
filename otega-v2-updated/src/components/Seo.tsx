import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type { SiteSettings } from '../lib/types';

const SITE_URL =
  (typeof window !== 'undefined' && window.location.origin) ||
  'https://otegaoutreach.org';

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
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

function upsertJsonLd(id: string, data: object) {
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

/** Per-page SEO: title, description, Open Graph, Twitter, canonical, JSON-LD. */
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
    const org = settings?.org_name || 'Otega Outreach';
    const tagline =
      settings?.tagline ||
      'Reaching Nations With The Gospel — mobilizing evangelists across Nigeria and beyond.';
    const pageTitle = title ? `${title} | ${org}` : `${org} — ${tagline.split('—')[0].trim()}`;
    const desc = description || settings?.hero_subtext || tagline;
    const img =
      image ||
      settings?.hero_image_url ||
      settings?.logo_url ||
      `${SITE_URL}/favicon.svg`;
    const url = `${SITE_URL}${pathname === '/' ? '' : pathname}`;

    document.title = pageTitle;
    upsertMeta('name', 'description', desc);
    upsertMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');
    upsertMeta('name', 'author', org);
    upsertMeta('name', 'theme-color', '#1E5AA8');

    // Open Graph
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:site_name', org);
    upsertMeta('property', 'og:title', pageTitle);
    upsertMeta('property', 'og:description', desc);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', img);
    upsertMeta('property', 'og:locale', 'en_NG');

    // Twitter
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', pageTitle);
    upsertMeta('name', 'twitter:description', desc);
    upsertMeta('name', 'twitter:image', img);

    upsertLink('canonical', url);

    // Organization + WebSite structured data (homepage-level)
    upsertJsonLd('ld-org', {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: org,
      url: SITE_URL,
      logo: settings?.logo_url || undefined,
      description: desc,
      email: settings?.contact_email || undefined,
      telephone: settings?.contact_phone || undefined,
      address: settings?.address
        ? { '@type': 'PostalAddress', streetAddress: settings.address, addressCountry: 'NG' }
        : undefined,
      sameAs: [
        settings?.facebook_url,
        settings?.instagram_url,
        settings?.youtube_url,
        settings?.twitter_url,
      ].filter(Boolean),
    });

    upsertJsonLd('ld-website', {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: org,
      url: SITE_URL,
      description: desc,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/blog?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    });
  }, [title, description, image, type, noIndex, settings, pathname]);

  return null;