import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AdminLayout from './components/admin/AdminLayout';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FounderPage from './pages/FounderPage';
import EvangelistsPage from './pages/EvangelistsPage';
import EvangelistDetailPage from './pages/EvangelistDetailPage';
import TestimoniesPage from './pages/TestimoniesPage';
import SubmitTestimonyPage from './pages/SubmitTestimonyPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import MediaPage from './pages/MediaPage';
import PartnersPage from './pages/PartnersPage';
import ContactPage from './pages/ContactPage';
import PrayerRequestPage from './pages/PrayerRequestPage';
import DonatePage from './pages/DonatePage';
import ThankYouPage from './pages/ThankYouPage';
import NotFoundPage from './pages/NotFoundPage';

import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminEvangelistsPage from './pages/admin/AdminEvangelistsPage';
import AdminBlogPage from './pages/admin/AdminBlogPage';
import AdminTestimoniesPage from './pages/admin/AdminTestimoniesPage';
import AdminPrayerRequestsPage from './pages/admin/AdminPrayerRequestsPage';
import AdminMessagesPage from './pages/admin/AdminMessagesPage';
import AdminMediaPage from './pages/admin/AdminMediaPage';
import AdminPartnersPage from './pages/admin/AdminPartnersPage';
import AdminDonationsPage from './pages/admin/AdminDonationsPage';
import AdminNotificationsPage from './pages/admin/AdminNotificationsPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

export default function App() {
  return (
    <Routes>
      {/* Public site */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="founder" element={<FounderPage />} />
        <Route path="evangelists" element={<EvangelistsPage />} />
        <Route path="evangelists/:slug" element={<EvangelistDetailPage />} />
        <Route path="testimonies" element={<TestimoniesPage />} />
        <Route path="submit-testimony" element={<SubmitTestimonyPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:slug" element={<BlogPostPage />} />
        <Route path="media" element={<MediaPage />} />
        <Route path="partners" element={<PartnersPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="prayer" element={<PrayerRequestPage />} />
        <Route path="donate" element={<DonatePage />} />
        <Route path="thank-you" element={<ThankYouPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Admin login (no layout chrome) */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Admin area */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="evangelists" element={<AdminEvangelistsPage />} />
        <Route path="blog" element={<AdminBlogPage />} />
        <Route path="testimonies" element={<AdminTestimoniesPage />} />
        <Route path="prayer-requests" element={<AdminPrayerRequestsPage />} />
        <Route path="messages" element={<AdminMessagesPage />} />
        <Route path="media" element={<AdminMediaPage />} />
        <Route path="partners" element={<AdminPartnersPage />} />
        <Route path="donations" element={<AdminDonationsPage />} />
        <Route path="notifications" element={<AdminNotificationsPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>
    </Routes>
  );
}
