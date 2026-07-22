import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

export const SITE_URL = 'https://www.moestuin.nl'
export const CONTENT_DIR = path.join(process.cwd(), 'content', 'artikelen')

/**
 * De echte persoon achter Moestuin.nl. Eén bron van waarheid voor de auteur,
 * gebruikt in de artikel-schema (JSON-LD Person) en in de frontmatter van de
 * wekelijkse workflow. Pas naam/rol hier aan; het werkt overal door.
 * (Vervangt de eerdere fictieve auteur "Moos".)
 */
export const SITE_AUTHOR = {
  name: 'Hans',
  jobTitle: 'Moestuinier op Hoeve 1700',
  url: `${SITE_URL}/over`,
}

/**
 * Handgeschreven artikelen die als eigen JSX-pagina in de repo staan.
 * Ze hebben geen markdown-bestand, maar moeten wel in de index, de sitemap
 * en de dedup-lijst van de wekelijkse workflow opduiken.
 */
export const LEGACY_ARTICLES = [
  {
    slug: 'moestuin-beginnen',
    title: 'Moestuin beginnen',
    titleIt: 'de complete gids',
    date: '2026-05-18',
    excerpt: 'Plek kiezen, grond voorbereiden, de makkelijkste groenten en de vijf fouten die elke beginner maakt.',
    tag: 'Beginners',
    category: 'beginners',
    readingMinutes: 14,
    image: {
      url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=450&fit=crop&auto=format&q=75',
      alt: 'Moestuin beginnen voor beginners',
    },
  },
  {
    slug: 'tomaten-uitplanten',
    title: 'Tomaten uitplanten',
    titleIt: 'in zes stappen',
    date: '2026-05-12',
    excerpt: 'Wanneer, hoe diep en welke drie fouten elke beginner maakt bij het uitplanten van tomaten.',
    tag: 'Stappenplan',
    category: 'tomaten',
    readingMinutes: 9,
    image: {
      url: 'https://images.unsplash.com/photo-1686278895718-26a2331d7297?w=600&h=450&fit=crop&auto=format&q=75',
      alt: 'Tomatenplanten in de volle grond',
    },
  },
  {
    slug: 'tomatenproblemen',
    title: 'Wat is er mis met je tomaten?',
    titleIt: 'Zes diagnoses',
    date: '2026-05-10',
    excerpt: 'Bruine blaadjes, krullende bovenkant, splijtende vruchten: hoe je weet wat er aan de hand is.',
    tag: 'Probleem',
    category: 'tomaten',
    readingMinutes: 6,
    image: {
      url: 'https://images.unsplash.com/photo-1686278895718-26a2331d7297?w=600&h=450&fit=crop&auto=format&q=75',
      alt: 'Tomatenproblemen herkennen',
    },
  },
  {
    slug: 'tomatenstokken',
    title: 'Tomatenstokken zetten',
    titleIt: 'zonder de wortels te raken',
    date: '2026-04-28',
    excerpt: 'Wanneer, hoe diep, en waarom de meeste tuiniers dit eigenlijk verkeerd doen.',
    tag: 'Methode',
    category: 'tomaten',
    readingMinutes: 7,
    image: {
      url: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=600&h=450&fit=crop&auto=format&q=75',
      alt: 'Tomatenstokken plaatsen',
    },
  },
  {
    slug: 'tomatenrassen',
    title: 'Tien tomatenrassen',
    titleIt: 'die altijd lukken',
    date: '2026-04-20',
    excerpt: "Van Gardeners' Delight tot Brandywine, getest op smaak, opbrengst en hoe vergevingsgezind ze zijn.",
    tag: 'Rassen',
    category: 'tomaten',
    readingMinutes: 12,
    image: {
      url: 'https://images.unsplash.com/photo-1686278895718-26a2331d7297?w=600&h=450&fit=crop&auto=format&q=75',
      alt: 'Diverse tomatenrassen',
    },
  },
]

function readContentFiles() {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs
    .readdirSync(CONTENT_DIR)
    .filter(name => name.endsWith('.md'))
    .map(name => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, name), 'utf8')
      const { data, content } = matter(raw)
      return { ...data, slug: data.slug || name.replace(/\.md$/, ''), body: content }
    })
}

/** Alle markdown-artikelen met status "published", nieuwste eerst. */
export function getMarkdownArticles({ includeDrafts = false } = {}) {
  return readContentFiles()
    .filter(a => includeDrafts || a.status !== 'draft')
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))
}

export function getArticleBySlug(slug) {
  return getMarkdownArticles({ includeDrafts: true }).find(a => a.slug === slug) || null
}

/**
 * Alles wat op de site staat: markdown + legacy JSX, nieuwste eerst.
 * Gebruikt voor de blogindex, de homepage en de sitemap.
 */
export function getAllArticles() {
  const markdown = getMarkdownArticles().map(a => ({
    slug: a.slug,
    title: a.title,
    titleIt: a.titleIt || '',
    date: a.date,
    excerpt: a.excerpt || a.description || '',
    tag: (a.tags && a.tags[0]) || 'Gids',
    category: a.category || 'nieuw',
    readingMinutes: a.readingMinutes || 8,
    image: a.image,
  }))
  return [...markdown, ...LEGACY_ARTICLES].sort((a, b) => String(b.date).localeCompare(String(a.date)))
}

/** Titels + slugs van alles wat al bestaat: input voor de dedup-stap van de workflow. */
export function getPublishedTopics() {
  return getAllArticles().map(({ slug, title, date }) => ({ slug, title, date }))
}

const NL_MONTHS = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec']

export function formatDateShort(iso) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return `${d.getDate()} ${NL_MONTHS[d.getMonth()]}`
}

export function formatDateLong(iso) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  const months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december']
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
}

/** Markdown → HTML. Inline afbeeldingen krijgen lazy loading mee. */
export function renderMarkdown(md) {
  const html = marked.parse(md || '', { async: false, breaks: false })
  return html.replace(/<img /g, '<img loading="lazy" decoding="async" ')
}
