import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// ✅ Import your existing pages (keep them as they are)
import EventsPage from './pages/EventsPage';
import SermonsPage from './pages/SermonsPage';
import AboutPage from './pages/AboutPage';
import AdminLayout from './pages/admin/AdminLayout';
// ... any other page imports (Contact, Donate, etc.)

// ✅ NEW: import the iPhone showcase homepage
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* ✅ NEW: set the index route to HomePage */}
        <Route index element={<HomePage />} />

        {/* ✅ Keep all your existing routes exactly as they were */}
        <Route path="events" element={<EventsPage />} />
        <Route path="sermons" element={<SermonsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="admin/*" element={<AdminLayout />} />
        {/* ... other routes (contact, donate, etc.) */}
      </Route>
    </Routes>
  );
}
