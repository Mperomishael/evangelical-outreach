import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Newspaper, HeartHandshake, MessageSquareHeart, Bell, Mail, Wallet, Images } from 'lucide-react';
import { getDashboardStats } from '../../lib/adminApi';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any | null>(null);

  useEffect(() => { getDashboardStats().then(setStats).catch(() => setStats({})); }, []);

  const cards = [
    { label: 'Published Evangelists', value: stats?.publishedEvangelists, total: stats?.evangelists, icon: Users, to: '/admin/evangelists' },
    { label: 'Published Posts', value: stats?.publishedPosts, total: stats?.blogPosts, icon: Newspaper, to: '/admin/blog' },
    { label: 'Testimonies Pending', value: stats?.pendingTestimonies, icon: HeartHandshake, to: '/admin/testimonies', urgent: true },
    { label: 'New Prayer Requests', value: stats?.newPrayerRequests, icon: MessageSquareHeart, to: '/admin/prayer-requests', urgent: true },
    { label: 'New Messages', value: stats?.newMessages, icon: Mail, to: '/admin/messages', urgent: true },
    { label: 'Photos & Videos', value: (stats?.photos ?? 0) + (stats?.videos ?? 0), icon: Images, to: '/admin/media' },
    { label: 'Unread Notifications', value: stats?.unreadNotifications, icon: Bell, to: '/admin/notifications', urgent: true },
    { label: 'Successful Donations', value: stats?.donationCount, icon: Wallet, to: '/admin/donations' },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl text-white font-bold mb-1">Dashboard</h1>
      <p className="text-white/50 text-sm mb-8">Overview of everything happening across the ministry site.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map(({ label, value, total, icon: Icon, to, urgent }) => (
          <Link key={label} to={to} className={`edge-card rounded-2xl p-5 ${urgent && value > 0 ? 'border-brand-yellow/40' : ''}`}>
            <Icon className="text-brand-lime mb-3" size={20} />
            <div className="font-display text-2xl text-white font-bold">{value ?? '—'}{total !== undefined ? <span className="text-white/30 text-base"> / {total}</span> : ''}</div>
            <div className="text-white/50 text-xs mt-1">{label}</div>
          </Link>
        ))}
      </div>

      {stats?.donationTotals && Object.keys(stats.donationTotals).length > 0 && (
        <div className="edge-card rounded-2xl p-6">
          <h2 className="font-display text-white font-semibold mb-4">Total Given (Successful)</h2>
          <div className="flex flex-wrap gap-6">
            {Object.entries(stats.donationTotals).map(([currency, amount]) => (
              <div key={currency}>
                <div className="font-display text-xl text-brand-lime font-bold">{currency} {Number(amount).toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
