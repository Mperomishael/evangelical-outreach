import { createClient } from '@supabase/supabase-js';

const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    'Missing Supabase server env vars. Need VITE_SUPABASE_URL (or SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY.'
  );
}

export const supabaseAdmin = createClient(url || '', serviceKey || '', {
  auth: { persistSession: false },
});

export const MEDIA_BUCKET = 'media';
