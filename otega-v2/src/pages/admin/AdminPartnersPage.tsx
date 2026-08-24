import ResourceManager, { type FieldDef } from '../../components/admin/ResourceManager';

const fields: FieldDef[] = [
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'logo_url', label: 'Logo', type: 'image' },
  { key: 'website_url', label: 'Website URL', type: 'text' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'order', label: 'Display Order', type: 'number' },
  { key: 'status', label: 'Status', type: 'select', options: ['draft', 'published'], required: true },
];

export default function AdminPartnersPage() {
  return (
    <ResourceManager
      resource="partners"
      title="Partners"
      description="Ministry and organizational partners shown on the public Partners page."
      fields={fields}
      defaults={{ status: 'draft', order: 0 }}
      imageFolder="partners"
    />
  );
}
