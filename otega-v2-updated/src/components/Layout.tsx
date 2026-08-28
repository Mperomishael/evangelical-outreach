import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppFloat from './WhatsAppFloat';
import { useSettings } from '../hooks/useSettings';
import { Loader } from './ui';

export default function Layout() {
  const { settings, loading } = useSettings();

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-milk flex items-center justify-center">
        <Loader label="Loading…" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-milk flex flex-col">
      <Navbar settings={settings} />
      <main className="flex-1">
        <Outlet context={{ settings }} />
      </main>
      <Footer settings={settings} />
      {settings.whatsapp_number && (
        <WhatsAppFloat number={settings.whatsapp_number} />
      )}
    </div>
  );
}
