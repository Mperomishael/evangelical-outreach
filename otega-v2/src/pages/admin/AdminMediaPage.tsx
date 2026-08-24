import { useState } from 'react';
import ResourceManager, { type FieldDef } from '../../components/admin/ResourceManager';

const photoFields: FieldDef[] = [
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'image_url', label: 'Image', type: 'image', required: true },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'category', label: 'Category', type: 'text' },
  { key: 'status', label: 'Status', type: 'select', options: ['pending', 'published', 'rejected'], required: true },
];

const videoFields: FieldDef[] = [
  { key: 'title', label: 'Title', type: 'text', required: true },
  { key: 'source', label: 'Source', type: 'select', options: ['upload', 'youtube'], required: true },
  { key: 'youtube_id', label: 'YouTube Video ID', type: 'text', hint: 'e.g. dQw4w9WgXcQ — only for YouTube source' },
  { key: 'video_url', label: 'Video File', type: 'image', hint: 'For "upload" source (uses the same uploader)' },
  { key: 'thumbnail_url', label: 'Thumbnail', type: 'image' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'status', label: 'Status', type: 'select', options: ['pending', 'published', 'rejected'], required: true },
];

export default function AdminMediaPage() {
  const [tab, setTab] = useState<'photos' | 'videos'>('photos');

  return (
    <div>
      <div className="flex gap-2 bg-white/5 p-1 rounded-full w-fit mb-6">
        {(['photos', 'videos'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-colors ${tab === t ? 'bg-brand-lime text-black' : 'text-white/60'}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'photos' ? (
        <ResourceManager resource="photos" title="Photos" description="Gallery images shown on the public Media page." fields={photoFields}
          defaults={{ status: 'published', category: 'gallery' }} imageFolder="photos" />
      ) : (
        <ResourceManager resource="videos" title="Videos" description="Uploaded or YouTube-embedded videos shown on the public Media page." fields={videoFields}
          defaults={{ status: 'published', source: 'youtube' }} imageFolder="videos" />
      )}
    </div>
  );
}
