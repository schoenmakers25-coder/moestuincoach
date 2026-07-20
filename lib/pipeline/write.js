import Anthropic from '@anthropic-ai/sdk'
import { MODELS, requireEnv, getInternalLinkTargets } from './config.js'

// Fase 4 — Artikel schrijven (SEO), volledig in het Nederlands.
// Levert strak JSON dat 1-op-1 naar frontmatter + body vertaald wordt.

const ARTICLE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    title: { type: 'string', description: 'Pakkende titel, max 60 tekens, met zoekwoord, in Nederlandse zinstijl (alleen het eerste woord en eigennamen met een hoofdletter)' },
    slug: { type: 'string', description: 'Schone korte slug, kleine letters en koppeltekens, geen datum' },
    metaDescription: { type: 'string', description: 'Meta description, max 155 tekens, met zoekwoord' },
    excerpt: { type: 'string', description: 'Korte intro/samenvatting van 1-2 zinnen voor de index' },
    bodyMarkdown: { type: 'string', description: 'Volledig artikel in Markdown: 1 H1, H2/H3, korte alineas, opsomming waar passend' },
    faq: {
      type: 'array',
      description: '2 tot 4 veelgestelde vragen',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          question: { type: 'string' },
          answer: { type: 'string' },
        },
        required: ['question', 'answer'],
      },
    },
    primaryKeyword: { type: 'string' },
    tags: { type: 'array', items: { type: 'string' }, description: '3 tot 6 tags' },
    estimatedReadingMinutes: { type: 'integer' },
    imageQueries: {
      type: 'array',
      items: { type: 'string' },
      description: '1 tot 3 korte Engelstalige stockfoto-zoektermen die bij de inhoud passen',
    },
  },
  required: [
    'title', 'slug', 'metaDescription', 'excerpt', 'bodyMarkdown',
    'faq', 'primaryKeyword', 'tags', 'estimatedReadingMinutes', 'imageQueries',
  ],
}

function extractText(message) {
  return message.content
    .filter(b => b.type === 'text')
    .map(b => b.text)
    .join('\n')
    .trim()
}

/**
 * Sommige modellen escapen newlines dubbel in hun JSON-uitvoer, waardoor er
 * letterlijke "\n" (backslash-n) in de tekst belandt in plaats van echte
 * regeleindes. Marked ziet de body dan als één alinea en herkent de ##/###
 * koppen niet. Deze normalisatie herstelt dat, zodat de opmaak altijd klopt.
 */
function normalizeMarkdown(md) {
  return String(md || '')
    .replace(/\r\n/g, '\n')
    .replace(/\\r\\n/g, '\n')
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '  ')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

/**
 * @param {object} opts
 * @param {object} opts.topic   Resultaat van researchTopic()
 * @param {object} opts.season  Seizoenscontext
 * @param {Array}  opts.existingArticles  Voor de interne-link-whitelist
 */
export async function writeArticle({ topic, season, existingArticles }) {
  const apiKey = requireEnv('ANTHROPIC_API_KEY')
  const client = new Anthropic({ apiKey })

  const linkTargets = getInternalLinkTargets(existingArticles)
  const linkList = linkTargets.map(t => `- ${t.path} — ${t.label}`).join('\n')

  const prompt = `Je bent Moos, de moestuinredacteur van moestuin.nl. Schrijf een compleet,
SEO-geoptimaliseerd artikel in het NEDERLANDS voor Nederlandse hobbytuiniers.

ONDERWERP: ${topic.onderwerp}
INVALSHOEK: ${topic.invalshoek}
PRIMAIR ZOEKWOORD: ${topic.primairKeyword}
SECUNDAIRE ZOEKWOORDEN: ${topic.secundaireKeywords.join(', ')}
WAAROM NU RELEVANT: ${topic.waaromNu}
SEIZOEN: ${season.monthName} ${season.year} — ${season.focus}

TONE OF VOICE: behulpzaam, praktisch, direct, voor hobbytuiniers. Geen jargon zonder uitleg.
Geen overdreven marketingtaal. Schrijf zoals een ervaren tuinier het een buurman uitlegt.

EISEN:
- Lengte: 900-1500 woorden, afgestemd op de zoekintentie.
- Structuur in bodyMarkdown: begin met een korte intro (geen H1 in de markdown — de titel
  wordt apart als H1 gerenderd). Gebruik ## voor H2 en ### voor H3. Korte alineas.
  Gebruik een opsomming of genummerd stappenplan waar dat past.
- Verweef het primaire zoekwoord natuurlijk in de intro en in minstens een kop. Geen keyword stuffing.
- SCHRIJFWIJZE: gebruik overal NEDERLANDSE zinstijl. Alleen het eerste woord van
  een titel of kop en eigennamen (plaatsnamen, merken, "Nederlandse") krijgen een
  hoofdletter. GEEN Engelse Title Case waarbij Elk Woord Een Hoofdletter Krijgt —
  dat geldt voor de title, de H2/H3-koppen en de faq-vragen.
- Interne links: verwerk 2 tot 4 links naar bestaande pagina's, in Markdown-linkformaat.
  Gebruik UITSLUITEND paden uit deze whitelist (anders ontstaat een dode link):
${linkList}
- Sluit de body NIET af met een FAQ-kop; de FAQ lever je apart in het faq-veld.
- Eindig de body met een korte uitsmijter/CTA die naar de zaaikalender of een overzichtspagina verwijst.
- title: max 60 tekens, met zoekwoord, in zinstijl. Voorbeeld goed:
  "Moestuin mulchen tegen droogte: zo bescherm je je bodem". Voorbeeld fout:
  "Moestuin Mulchen Tegen Droogte: Zo Bescherm Je Je Bodem".
- metaDescription: max 155 tekens, met zoekwoord.
- slug: kort, kleine letters, koppeltekens, keyword-rijk, geen datum, geen "artikel" prefix.
- faq: 2 tot 4 vragen die mensen echt stellen, met bondige antwoorden.
- imageQueries: 1 tot 3 korte ENGELSTALIGE stockfoto-zoektermen (bijv. "vegetable garden soil",
  "sowing seeds indoors") die passen bij de inhoud.

Lever alles als het gevraagde JSON-object.`

  const resp = await client.messages.create({
    model: MODELS.writer,
    max_tokens: 8000,
    output_config: { format: { type: 'json_schema', schema: ARTICLE_SCHEMA } },
    messages: [{ role: 'user', content: prompt }],
  })

  const jsonText = extractText(resp)
  let article
  try {
    article = JSON.parse(jsonText)
  } catch {
    throw new Error(`Schrijfstap gaf geen parse-baar JSON terug: ${jsonText.slice(0, 300)}`)
  }

  // Opmaak normaliseren: letterlijke "\n" -> echte regeleindes (zie hierboven).
  article.bodyMarkdown = normalizeMarkdown(article.bodyMarkdown)

  // Kwaliteitspoorten: publiceer niet als het artikel te kort of incompleet is.
  const wordCount = (article.bodyMarkdown || '').split(/\s+/).filter(Boolean).length
  if (wordCount < 500) {
    throw new Error(`Artikel te kort (${wordCount} woorden) — publicatie afgebroken.`)
  }
  if (!article.title || !article.slug || !article.bodyMarkdown || !article.metaDescription) {
    throw new Error('Artikel mist een verplicht veld (title/slug/body/metaDescription).')
  }

  // Slug normaliseren naar een veilige vorm.
  article.slug = slugify(article.slug)

  return { article, wordCount }
}

export function slugify(input) {
  return String(input)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // accenten weg
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}
