import ResourceManager, { type FieldDef } from '../../components/admin/ResourceManager';

const fields: FieldDef[] = [
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'email', label: 'Email', type: 'text' },
  { key: 'phone', label: 'Phone', type: 'text' },
  { key: 'category', label: 'Category', type: 'text' },
  { key: 'request', label: 'Request', type: 'textarea', required: true },
  { key: 'status', label: 'Status', type: 'select', options: ['new', 'in_progress', 'answered', 'archived'], required: true },
];

export default function AdminPrayerRequestsPage() {
  return (
    <ResourceManager
      resource="prayer_requests"
      title="Prayer Requests"
      description="Private submissions from visitors — never shown publicly."
      fields={fields}
      defaults={{ status: 'new', category: 'General' }}
    />
  );
}
