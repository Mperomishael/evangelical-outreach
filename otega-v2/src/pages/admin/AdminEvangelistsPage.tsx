import ResourceManager, { type FieldDef } from '../../components/admin/ResourceManager';

const fields: FieldDef[] = [
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'slug', label: 'Slug (url-friendly)', type: 'text', required: true, hint: 'e.g. john-adeyemi' },
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'region', label: 'Region', type: 'text' },
  { key: 'state', label: 'State', type: 'text' },
  { key: 'photo_url', label: 'Photo', type: 'image', showInTable: true },
  { key: 'phone', label: 'Phone' , type: 'text' },
  { key: 'whatsapp', label: 'WhatsApp', type: 'text' },
  { key: 'email', label: 'Email', type: 'text' },
  { key: 'bio', label: 'Bio', type: 'textarea' },
  { key: 'testimony_count', label: 'Testimony Count', type: 'number' },
  { key: 'souls_won', label: 'Souls Won', type: 'number' },
  { key: 'featured', label: 'Featured', type: 'checkbox', hint: 'Show first on the public list' },
  { key: 'status', label: 'Status', type: 'select', options: ['draft', 'published'], required: true },
];

export default function AdminEvangelistsPage() {
  return (
    <ResourceManager
      resource="evangelists"
      title="Evangelists"
      description="Profiles shown on the public Evangelists page."
      fields={fields}
      defaults={{ status: 'draft', testimony_count: 0, souls_won: 0 }}
      imageFolder="evangelists"
    />
  );
}
