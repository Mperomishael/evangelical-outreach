// Whitelist of admin-manageable resources → their DB table + safe defaults.
// Keeping this centralized means one dynamic [resource] API route can
// safely serve every entity instead of hand-writing a file per table.
export const RESOURCES = {
  evangelists: { table: 'evangelists', orderBy: 'created_at', ascending: false },
  blog_posts: { table: 'blog_posts', orderBy: 'created_at', ascending: false },
  testimonies: { table: 'testimonies', orderBy: 'created_at', ascending: false },
  prayer_requests: { table: 'prayer_requests', orderBy: 'created_at', ascending: false },
  messages: { table: 'messages', orderBy: 'created_at', ascending: false },
  photos: { table: 'photos', orderBy: 'created_at', ascending: false },
  videos: { table: 'videos', orderBy: 'created_at', ascending: false },
  partners: { table: 'partners', orderBy: 'order', ascending: true },
  donations: { table: 'donations', orderBy: 'created_at', ascending: false },
  notifications: { table: 'notifications', orderBy: 'created_at', ascending: false },
};

export function resolveResource(key) {
  return RESOURCES[key] || null;
}
