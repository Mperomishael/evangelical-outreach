// Public-facing data access — reads go straight to Supabase with the anon
// key (fast, cacheable, works even if the API layer is cold). Writes are
// narrow, RLS-guarded inserts (testimony/prayer-request/message/donation)
// so a visitor can never read or tamper with anything they didn't submit.
import { supabase } from './supabase';
import type {
  Evangelist, BlogPost, Testimony, Photo, Video, Partner, SiteSettings,
} from './types';

function ensureClient() {
  if (!supabase) throw new Error('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  return supabase;
}

export async function getSettings(): Promise<SiteSettings | null> {
  const db = ensureClient();
  const { data, error } = await db.from('site_settings').select('*').eq('id', 'global').maybeSingle();
  if (error) throw error;
  return data as SiteSettings | null;
}

export async function getPublishedEvangelists(): Promise<Evangelist[]> {
  const db = ensureClient();
  const { data, error } = await db
    .from('evangelists').select('*').eq('status', 'published').order('featured', { ascending: false }).order('created_at', { ascending: false });
  if (error) throw error;
  return (data || []) as Evangelist[];
}

export async function getEvangelistBySlug(slug: string): Promise<Evangelist | null> {
  const db = ensureClient();
  const { data, error } = await db.from('evangelists').select('*').eq('slug', slug).eq('status', 'published').maybeSingle();
  if (error) throw error;
  return data as Evangelist | null;
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const db = ensureClient();
  const { data, error } = await db.from('blog_posts').select('*').eq('status', 'published').order('created_at', { ascending: false });
  if (error) throw error;
  return (data || []) as BlogPost[];
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const db = ensureClient();
  const { data, error } = await db.from('blog_posts').select('*').eq('slug', slug).eq('status', 'published').maybeSingle();
  if (error) throw error;
  if (data) {
    await db.from('blog_posts').update({ views: (data.views || 0) + 1 }).eq('id', data.id);
  }
  return data as BlogPost | null;
}

export async function getApprovedTestimonies(): Promise<Testimony[]> {
  const db = ensureClient();
  const { data, error } = await db.from('testimonies').select('*').eq('approved', true).order('featured', { ascending: false }).order('created_at', { ascending: false });
  if (error) throw error;
  return (data || []) as Testimony[];
}

export async function submitTestimony(input: { name: string; email?: string; phone?: string; title?: string; content: string; evangelist_id?: string }) {
  const db = ensureClient();
  const { error } = await db.from('testimonies').insert({ ...input, approved: false, featured: false });
  if (error) throw error;
}

export async function submitPrayerRequest(input: { name: string; email?: string; phone?: string; category?: string; request: string }) {
  const db = ensureClient();
  const { error } = await db.from('prayer_requests').insert({ ...input, status: 'new' });
  if (error) throw error;
}

export async function submitMessage(input: { name: string; email?: string; phone?: string; subject?: string; message: string }) {
  const db = ensureClient();
  const { error } = await db.from('messages').insert({ ...input, status: 'new' });
  if (error) throw error;
}

export async function submitDonationRecord(input: { donor_name?: string; donor_email?: string; donor_phone?: string; amount: number; currency?: string; purpose?: string; payment_method?: string; tx_ref?: string }) {
  const db = ensureClient();
  const { data, error } = await db
    .from('donations')
    .insert({ status: 'pending', currency: 'NGN', payment_method: 'flutterwave', ...input })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getPublishedPhotos(): Promise<Photo[]> {
  const db = ensureClient();
  const { data, error } = await db.from('photos').select('*').eq('status', 'published').order('created_at', { ascending: false });
  if (error) throw error;
  return (data || []) as Photo[];
}

export async function getPublishedVideos(): Promise<Video[]> {
  const db = ensureClient();
  const { data, error } = await db.from('videos').select('*').eq('status', 'published').order('created_at', { ascending: false });
  if (error) throw error;
  return (data || []) as Video[];
}

export async function getPublishedPartners(): Promise<Partner[]> {
  const db = ensureClient();
  const { data, error } = await db.from('partners').select('*').eq('status', 'published').order('order', { ascending: true });
  if (error) throw error;
  return (data || []) as Partner[];
}
