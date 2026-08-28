import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, getCurrentUser, type AdminUser } from '../lib/adminApi';

export function useAdminGuard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/admin/login', { replace: true });
      return;
    }
    setUser(getCurrentUser());
    setReady(true);
  }, [navigate]);

  return { user, ready };
}
