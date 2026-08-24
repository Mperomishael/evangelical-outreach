import ResourceManager, { type FieldDef } from '../../components/admin/ResourceManager';

const fields: FieldDef[] = [
  { key: 'donor_name', label: 'Donor', type: 'text' },
  { key: 'donor_email', label: 'Email', type: 'text' },
  { key: 'amount', label: 'Amount', type: 'number', required: true },
  { key: 'currency', label: 'Currency', type: 'select', options: ['NGN', 'GHS', 'USD', 'XAF'] },
  { key: 'purpose', label: 'Purpose', type: 'text' },
  { key: 'tx_ref', label: 'Transaction Ref', type: 'text' },
  { key: 'status', label: 'Status', type: 'select', options: ['pending', 'successful', 'failed'], required: true },
];

export default function AdminDonationsPage() {
  return (
    <ResourceManager
      resource="donations"
      title="Donations"
      description="Bank-transfer intents and gateway records. Mark as successful once confirmed."
      fields={fields}
      defaults={{ status: 'pending', currency: 'NGN' }}
    />
  );
}
