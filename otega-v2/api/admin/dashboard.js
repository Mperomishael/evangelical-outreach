import { supabaseAdmin } from '../_lib/supabaseAdmin.js';
import { requireAdmin } from '../_lib/auth.js';

// GET /api/admin/dashboard -> aggregated counts for the dashboard overview
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await requireAdmin(req, res);
  if (!session) return;

  const count = async (table, filters = {}) => {
    let q = supabaseAdmin.from(table).select('*', { count: 'exact', head: true });
    for (const [col, val] of Object.entries(filters)) q = q.eq(col, val);
    const { count: c, error } = await q;
    if (error) throw error;
    return c || 0;
  };

  try {
    const [
      evangelists,
      publishedEvangelists,
      blogPosts,
      publishedPosts,
      pendingTestimonies,
      approvedTestimonies,
      newPrayerRequests,
      unreadNotifications,
      newMessages,
      photos,
      videos,
    ] = await Promise.all([
      count('evangelists'),
      count('evangelists', { status: 'published' }),
      count('blog_posts'),
      count('blog_posts', { status: 'published' }),
      count('testimonies', { approved: false }),
      count('testimonies', { approved: true }),
      count('prayer_requests', { status: 'new' }),
      count('notifications', { read: false }),
      count('messages', { status: 'new' }),
      count('photos'),
      count('videos'),
    ]);

    const { data: donationRows, error: donErr } = await supabaseAdmin
      .from('donations')
      .select('amount, currency, status')
      .eq('status', 'successful');
    if (donErr) throw donErr;

    const totalsByCurrency = {};
    for (const row of donationRows || []) {
      totalsByCurrency[row.currency] = (totalsByCurrency[row.currency] || 0) + Number(row.amount);
    }

    return res.json({
      data: {
        evangelists,
        publishedEvangelists,
        blogPosts,
        publishedPosts,
        pendingTestimonies,
        approvedTestimonies,
        newPrayerRequests,
        unreadNotifications,
        newMessages,
        photos,
        videos,
        donationTotals: totalsByCurrency,
        donationCount: (donationRows || []).length,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
