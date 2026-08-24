import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { useAdminGuard } from '../../hooks/useAdminGuard';

export default function AdminLayout() {
  const { user, ready } = useAdminGuard();
  if (!ready) return null;

  return (
    <div className="min-h-screen flex bg-[#0A0A0A]">
      <AdminSidebar user={user} />
      <div className="flex-1 min-w-0">
        <div className="p-6 sm:p-8 max-w-6xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
