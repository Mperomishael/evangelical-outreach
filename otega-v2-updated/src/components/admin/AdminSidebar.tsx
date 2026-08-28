import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Users, Newspaper, HeartHandshake, MessageSquareHeart,
  Mail, Images, Handshake, Wallet, Bell, Settings, LogOut,
} from 'lucide-react';
import { logout, type AdminUser } from '../../lib/adminApi';
import { useNavigate } from 'react-router-dom';

const ITEMS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/evangelists', label: 'Evangelists', icon: Users },
  { to: '/admin/blog', label: 'Blog Posts', icon: Newspaper },
  { to: '/admin/testimonies', label: 'Testimonies', icon: HeartHandshake },
  { to: '/admin/prayer-requests', label: 'Prayer Requests', icon: MessageSquareHeart },
  { to: '/admin/messages', label: 'Messages', icon: Mail },
  { to: '/admin/media', label: 'Media', icon: Images },
  { to: '/admin/partners', label: 'Partners', icon: Handshake },
  { to: '/admin/donations', label: 'Donations', icon: Wallet },
  { to: '/admin/notifications', label: 'Notifications', icon: Bell },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminSidebar({ user }: { user: AdminUser | null }) {
  const navigate = useNavigate();
  return (
    <aside className="w-64 flex-shrink-0 bg-brand-cream border-r border-brand-border h-screen sticky top-0 flex flex-col">
      <div className="px-5 py-6 border-b border-brand-border">
        <div className="font-display text-lg font-semibold text-brand-ink">Otega Admin</div>
        {user && <div className="text-brand-muted text-xs mt-0.5">{user.displayName}</div>}
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-brand-blue text-white' : 'text-brand-muted hover:text-brand-ink hover:bg-white'
              }`
            }
          >
            <Icon size={16} /> {label}
          </NavLink>
        ))}
      </nav>
      <div className="p-3 border-t border-brand-border">
        <button
          onClick={() => { logout(); navigate('/admin/login'); }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-brand-muted hover:text-brand-ink hover:bg-white transition-colors"
        >
          <LogOut size={16} /> Log out
        </button>
      </div>
    </aside>
  );
}
