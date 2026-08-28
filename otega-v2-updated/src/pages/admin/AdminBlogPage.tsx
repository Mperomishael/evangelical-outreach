import ResourceManager, { type FieldDef } from '../../components/admin/ResourceManager';

const fields: FieldDef[] = [
  { key: 'title', label: 'Title', type: 'text', required: true },
  { key: 'slug', label: 'Slug', type: 'text', required: true },
  { key: 'category', label: 'Category', type: 'text' },
  { key: 'featured_image', label: 'Featured Image', type: 'image' },
  { key: 'author', label: 'Author', type: 'text' },
  { key: 'excerpt', label: 'Excerpt', type: 'textarea' },
  { key: 'content', label: 'Content', type: 'textarea', required: true, hint: 'Plain text, one paragraph per line' },
  { key: 'tags', label: 'Tags', type: 'tags' },
  { key: 'status', label: 'Status', type: 'select', options: ['draft', 'published'], required: true },
];

export default function AdminBlogPage() {
  return (
    <ResourceManager
      resource="blog_posts"
      title="Blog Posts"
      description="Articles and updates shown on the public Blog page."
      fields={fields}
      defaults={{ status: 'draft', category: 'General', views: 0 }}
      imageFolder="blog"
    />
  );
}
