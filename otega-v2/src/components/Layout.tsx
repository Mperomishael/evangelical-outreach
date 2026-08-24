import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppFloat from './WhatsAppFloat';

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#E3F2FD] flex flex-col">
      <Navbar />
      <main className="flex-1 py-8 px-4">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
