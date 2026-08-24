import { Check } from 'lucide-react';
import ResourceManager, { type FieldDef } from '../../components/admin/ResourceManager';
import { update } from '../../lib/adminApi';

const fields: FieldDef[] = [
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'email', label: 'Email', type: 'text' },
  { key: 'phone', label: 'Phone', type: 'text' },
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'content', label: 'Testimony', type: 'textarea', required: true },
  { key: 'image_url', label: 'Photo', type: 'image' },
  { key: 'approved', label: 'Approved', type: 'checkbox', hint: 'Visible on the public site' },
  { key: 'featured', label: 'Featured', type: 'checkbox', hint: 'Show first' },
];

export default function AdminTestimoniesPage() {
  return (
    <ResourceManager
      resource="testimonies"
      title="Testimonies"
      description="Review and approve testimonies submitted by visitors."
      fields={fields}
      defaults={{ approved: false, featured: false }}
      imageFolder="testimonies"
      renderExtraRowActions={(row, refresh) => !row.approved && (
        <button
          onClick={async () => { await update('testimonies', row.id, { approved: true }); refresh(); }}
          className="text-white/50 hover:text-brand-lime p-1.5 inline-flex" title="Approve"
        >
          <Check size={14} />
        </button>
      )}
    />
  );
}
