import { useEffect, useState } from 'react';
import { getSettings } from '../lib/publicData';
import type { SiteSettings } from '../lib/types';

const FALLBACK: SiteSettings = {
  id: 'global',
  org_name: 'Otega Outreach',
  tagline: 'Reaching Nations With The Gospel',
  logo_url: null,
  hero_video_url: null,
  hero_image_url: null,
  hero_headline: 'Reaching Nations With The Gospel',
  hero_subtext: 'Mobilizing evangelists, sharing testimonies, and equipping ministry across Nigeria and beyond.',
  founder_name: '',
  founder_title: 'Founder & President',
  founder_photo_url: null,
  founder_signature_url: null,
  founder_quote: '',
  founder_bio: '',
  founder_vision: '',
  founder_mission: '',
  founder_facebook_url: null,
  founder_instagram_url: null,
  founder_youtube_url: null,
  contact_email: '',
  contact_phone: '',
  whatsapp_number: '',
  address: '',
  facebook_url: null,
  instagram_url: null,
  youtube_url: null,
  twitter_url: null,
  bank_name: '',
  account_number: '',
  account_name: '',
  flutterwave_public_key: '',
};

export function useSettings() {
  const [settings, setSettings] = useState<SiteSettings>(FALLBACK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getSettings()
      .then((data) => { if (active && data) setSettings(data); })
      .catch(() => {})
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return { settings, loading };
}
