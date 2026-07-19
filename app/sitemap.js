import { getAllArticles, SITE_URL } from '@/lib/articles'

export const revalidate = 3600

export default function sitemap() {
  const now = new Date()

  const staticPages = [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/zaaikalender`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/artikel`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/over`, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${SITE_URL}/contact`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/linkpartners`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.2 },
  ].map(p => ({ ...p, lastModified: now }))

  const articlePages = getAllArticles().map(a => ({
    url: `${SITE_URL}/artikel/${a.slug}`,
    lastModified: new Date(a.dateModified || a.date || now),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticPages, ...articlePages]
}
