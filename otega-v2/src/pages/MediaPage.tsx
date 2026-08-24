import { useEffect, useState } from 'react';
import { Play } from 'lucide-react';
import type { Photo, Video } from '../lib/types';
import { getPublishedPhotos, getPublishedVideos } from '../lib/publicData';
import { Section, Eyebrow, Loader, EmptyState } from '../components/ui';

export default function MediaPage() {
  const [tab, setTab] = useState<'photos' | 'videos'>('photos');
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [videos, setVideos] = useState<Video[] | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    getPublishedPhotos().then(setPhotos).catch(() => setPhotos([]));
    getPublishedVideos().then(setVideos).catch(() => setVideos([]));
  }, []);

  return (
    <Section>
      <Eyebrow>Moments</Eyebrow>
      <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
        <h1 className="font-display text-4xl sm:text-5xl text-white font-bold">Media Gallery</h1>
        <div className="flex gap-2 bg-white/5 p-1 rounded-full">
          {(['photos', 'videos'] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-colors ${tab === t ? 'bg-brand-lime text-black' : 'text-white/60'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {tab === 'photos' && (
        photos === null ? <Loader /> : photos.length === 0 ? <EmptyState title="No photos yet" message="Photos from outreach events will appear here." /> : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {photos.map((p) => (
              <button key={p.id} onClick={() => setLightbox(p.image_url)} className="aspect-square rounded-xl overflow-hidden edge-card">
                <img src={p.image_url} alt={p.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </button>
            ))}
          </div>
        )
      )}

      {tab === 'videos' && (
        videos === null ? <Loader /> : videos.length === 0 ? <EmptyState title="No videos yet" message="Ministry videos will appear here." /> : (
          <div className="grid md:grid-cols-3 gap-5">
            {videos.map((v) => (
              <div key={v.id} className="edge-card rounded-2xl overflow-hidden">
                {v.source === 'youtube' && v.youtube_id ? (
                  <div className="aspect-video">
                    <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${v.youtube_id}`} title={v.title} allowFullScreen />
                  </div>
                ) : v.video_url ? (
                  <video controls className="w-full aspect-video object-cover" poster={v.thumbnail_url || undefined} src={v.video_url} />
                ) : (
                  <div className="aspect-video flex items-center justify-center text-white/20"><Play size={32} /></div>
                )}
                <div className="p-4">
                  <h3 className="font-display text-white font-semibold">{v.title}</h3>
                  {v.description && <p className="text-white/50 text-sm mt-1 line-clamp-2">{v.description}</p>}
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {lightbox && (
        <div onClick={() => setLightbox(null)} className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6 cursor-zoom-out">
          <img src={lightbox} alt="" className="max-w-3xl max-h-[85vh] rounded-2xl object-contain" />
        </div>
      )}
    </Section>
  );
}
