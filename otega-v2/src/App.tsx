import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
// ... import your other pages (Admin, Events, Sermons, About, etc.)

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        {/* Keep all your existing routes */}
        <Route path="events" element={<EventsPage />} />
        <Route path="sermons" element={<SermonsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="admin/*" element={<AdminLayout />} />
        {/* ... etc */}
      </Route>
    </Routes>
  );
}
