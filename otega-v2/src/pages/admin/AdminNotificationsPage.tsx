import ResourceManager, { type FieldDef } from '../../components/admin/ResourceManager';

const fields: FieldDef[] = [
  { key: 'type', label: 'Type', type: 'text' },
  { key: 'title', label: 'Title', type: 'text', required: true },
  { key: 'message', label: 'Message', type: 'textarea' },
  { key: 'link', label: 'Link', type: 'text' },
  { key: 'read', label: 'Read', type: 'checkbox' },
];

export default function AdminNotificationsPage() {
  return (
    <ResourceManager
      resource="notifications"
      title="Notifications"
      description="Auto-generated whenever a visitor submits a testimony, prayer request, message, or donation."
      fields={fields}
      defaults={{ read: false }}
    />
  );
}
