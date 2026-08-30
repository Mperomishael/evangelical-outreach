import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppFloat from './WhatsAppFloat';
import { useSettings } from '../hooks/useSettings';

export default function Layout() {
  const { settings } = useSettings();

  return (
    <div className="min-h-screen bg-brand-milk flex flex-col">
      <Navbar settings={settings} />
      <main className="flex-1">
        <Outlet context={{ settings }} />
      </main>
      <Footer settings={settings} />
      {settings?.whatsapp_number ? (
        <WhatsAppFloat number={settings.whatsapp_number} />
      ) : null}
    </div>
  );
}
