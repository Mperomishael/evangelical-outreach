import ResourceManager, { type FieldDef } from '../../components/admin/ResourceManager';

const fields: FieldDef[] = [
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'email', label: 'Email', type: 'text' },
  { key: 'phone', label: 'Phone', type: 'text' },
  { key: 'subject', label: 'Subject', type: 'text' },
  { key: 'message', label: 'Message', type: 'textarea', required: true },
  { key: 'status', label: 'Status', type: 'select', options: ['new', 'read', 'archived'], required: true },
];

export default function AdminMessagesPage() {
  return (
    <ResourceManager
      resource="messages"
      title="Contact Messages"
      description="Submissions from the public Contact page."
      fields={fields}
      defaults={{ status: 'new' }}
    />
  );
}
