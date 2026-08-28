import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, Loader2 } from 'lucide-react';
import { login, isLoggedIn } from '../../lib/adminApi';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isLoggedIn()) { navigate('/admin', { replace: true }); }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(username, password);
      navigate('/admin', { replace: true });
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-brand-milk flex items-center justify-center px-5">
      <form onSubmit={onSubmit} className="w-full max-w-sm edge-card rounded-2xl p-8">
        <div className="flex items-center gap-2 text-brand-ink font-display font-semibold text-lg mb-8">
          <Flame className="text-brand-blue" size={22} /> Otega Admin
        </div>
        <label className="block text-brand-muted text-xs font-medium mb-1.5">Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="superadmin"
          className="w-full bg-white border border-brand-border rounded-lg px-3 py-2.5 text-brand-ink text-sm outline-none focus:border-brand-blue mb-4" />
        <label className="block text-brand-muted text-xs font-medium mb-1.5">Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
          className="w-full bg-white border border-brand-border rounded-lg px-3 py-2.5 text-brand-ink text-sm outline-none focus:border-brand-blue mb-6" />
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        <button disabled={loading} className="btn-primary w-full py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60">
          {loading && <Loader2 size={14} className="animate-spin" />} {loading ? 'Signing in…' : 'Sign In'}
        </button>
        <p className="text-brand-muted/70 text-xs text-center mt-5">
          Super admin uses <span className="text-brand-muted">ADMIN_PASSWORD</span> only — leave username blank.
        </p>
      </form>
    </div>
  );
}
