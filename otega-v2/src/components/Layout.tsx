import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppFloat from './WhatsAppFloat';
import { useSettings } from '../hooks/useSettings';
import { useWhatsApp } from '../hooks/useWhatsApp';

interface LayoutProps {
  // If your Layout accepts props, keep them here
  // Example: settings?: SiteSettings;
}

export default function Layout({}: LayoutProps) {
  // Keep your existing hooks
  const { settings } = useSettings();
  const { number } = useWhatsApp();

  return (
    // ✅ Only change: added bg-[#E3F2FD] (light blue)
    <div className="min-h-screen bg-[#E3F2FD] flex flex-col">
      <Navbar />
      <main className="flex-1 py-8 px-4">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat number={number} />
    </div>
  );
}
