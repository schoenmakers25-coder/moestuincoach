import matter from 'gray-matter'
import { ARTICLE_MODE, requireEnv } from './config.js'

// Fase 5 — Publiceren.
// Er is (nog) geen CMS, dus we schrijven een markdown-bestand naar
// content/artikelen/ en committen dat via de GitHub API. Vercel herbouwt
// automatisch op de commit, waarna het artikel live staat, in de blog-index
// en in de sitemap verschijnt.
//
// NB: Sanity zou later een schonere oplossing zijn (publiceren zonder redeploy
// via on-demand revalidation). De code is bewust dun gehouden rond het
// bouwen van de frontmatter, zodat overstappen makkelijk blijft.

const GITHUB_API = 'https://api.github.com'
const CONTENT_PATH = 'content/artikelen'

function githubConfig() {
  // .trim() op alles: een verdwaalde spatie/tab uit copy-paste in de env-vars
  // mag de API-calls niet breken (GitHub gaf eerder "Branch \tmain not found").
  const token = requireEnv('GITHUB_TOKEN').trim()
  const repo = requireEnv('GITHUB_REPO').trim() // formaat: "owner/repo"
  const [owner, name] = repo.split('/').map(s => s.trim())
  if (!owner || !name) throw new Error('GITHUB_REPO moet het formaat "owner/repo" hebben.')
  const branch = (process.env.GITHUB_BRANCH || 'main').trim()
  return { token, owner, name, branch }
}

function ghHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'moestuin-nl-weekly-article',
  }
}

/**
 * Idempotentie-check tegen de bron van waarheid (GitHub, niet de gedeployde
 * snapshot). Kijkt of er sinds `sinceIso` al een commit in de content-map is.
 * @returns {Promise<boolean>}
 */
export async function publishedSince(sinceIso) {
  const { token, owner, name, branch } = githubConfig()
  const url = `${GITHUB_API}/repos/${owner}/${name}/commits?path=${encodeURIComponent(CONTENT_PATH)}&sha=${encodeURIComponent(branch)}&since=${encodeURIComponent(sinceIso)}&per_page=1`
  const resp = await fetch(url, { headers: ghHeaders(token) })
  if (!resp.ok) {
    // Kan de check niet uitvoeren: liever doorgaan dan een week overslaan.
    console.warn(`[publish] Kon idempotentie-check niet uitvoeren (${resp.status}).`)
    return false
  }
  const commits = await resp.json()
  return Array.isArray(commits) && commits.length > 0
}

/** Bouwt het volledige markdown-bestand (frontmatter + body). */
export function buildMarkdown({ article, image, dateIso, status }) {
  const frontmatter = {
    title: article.title,
    slug: article.slug,
    date: dateIso,
    description: article.metaDescription,
    excerpt: article.excerpt,
    author: 'Moos',
    category: article.category || 'nieuw',
    tags: article.tags || [],
    primaryKeyword: article.primaryKeyword,
    readingMinutes: article.estimatedReadingMinutes || 8,
    status, // 'published' of 'draft'
    image: {
      url: image.url,
      alt: image.alt,
      width: image.width,
      height: image.height,
      credit: image.credit,
      creditUrl: image.creditUrl,
    },
    faq: article.faq || [],
  }
  return matter.stringify(article.bodyMarkdown.trim() + '\n', frontmatter)
}

async function fileExists({ owner, name, branch, token, path }) {
  const url = `${GITHUB_API}/repos/${owner}/${name}/contents/${path}?ref=${encodeURIComponent(branch)}`
  const resp = await fetch(url, { headers: ghHeaders(token) })
  if (resp.status === 200) {
    const data = await resp.json()
    return data.sha
  }
  return null
}

/**
 * Commit het artikel naar GitHub.
 * @returns {Promise<{committed:boolean, path:string, url:string, alreadyExisted:boolean}>}
 */
export async function publishArticle({ article, image, dateIso }) {
  const status = ARTICLE_MODE === 'draft' ? 'draft' : 'published'
  const { token, owner, name, branch } = githubConfig()
  const path = `${CONTENT_PATH}/${article.slug}.md`

  // Idempotentie: bestaat het bestand al, dan niet overschrijven.
  const existingSha = await fileExists({ owner, name, branch, token, path })
  if (existingSha) {
    return { committed: false, path, url: '', alreadyExisted: true }
  }

  const markdown = buildMarkdown({ article, image, dateIso, status })
  const content = Buffer.from(markdown, 'utf8').toString('base64')

  const url = `${GITHUB_API}/repos/${owner}/${name}/contents/${path}`
  const resp = await fetch(url, {
    method: 'PUT',
    headers: { ...ghHeaders(token), 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: `Wekelijks artikel: ${article.title}${status === 'draft' ? ' (concept)' : ''}`,
      content,
      branch,
    }),
  })

  if (!resp.ok) {
    const body = await resp.text()
    throw new Error(`GitHub-commit mislukt (${resp.status}): ${body.slice(0, 300)}`)
  }

  const data = await resp.json()
  return {
    committed: true,
    path,
    url: data.content?.html_url || '',
    alreadyExisted: false,
  }
}
