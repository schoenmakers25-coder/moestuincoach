import Anthropic from '@anthropic-ai/sdk'
import { MODELS } from './config.js'

// Fase 4b — Automatische foto's.
// Bron: Pexels. Reden: rechtenvrij, echte foto's van gewassen/grond/tuinen
// werken beter dan AI-beeld, en er is geen verplichte bronvermelding (wel netjes
// om de fotograaf te crediten, dat doen we in het bijschrift).
// Vereist PEXELS_API_KEY. Zonder key valt de pipeline terug op een nette
// standaardafbeelding zodat er nooit een gebroken beeld op de pagina staat.

const PEXELS_ENDPOINT = 'https://api.pexels.com/v1/search'

// Nette, neutrale standaardafbeelding (moestuin) als alles faalt.
const FALLBACK_IMAGE = {
  url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&h=1067&fit=crop&auto=format&q=75',
  alt: 'Een Nederlandse moestuin met verschillende gewassen',
  width: 1600,
  height: 1067,
  credit: 'Foto via Unsplash',
  creditUrl: 'https://unsplash.com',
}

async function searchPexels(query, apiKey) {
  const url = `${PEXELS_ENDPOINT}?query=${encodeURIComponent(query)}&orientation=landscape&per_page=8&size=large`
  const resp = await fetch(url, { headers: { Authorization: apiKey } })
  if (!resp.ok) return []
  const data = await resp.json()
  return (data.photos || [])
    .filter(p => p.width >= 1200 && p.width > p.height) // landschap + voldoende resolutie
    .map(p => ({
      id: p.id,
      url: p.src?.large2x || p.src?.large || p.src?.original,
      width: p.width,
      height: p.height,
      description: p.alt || '',
      photographer: p.photographer,
      photographerUrl: p.photographer_url,
      pageUrl: p.url,
    }))
}

function extractText(message) {
  return message.content.filter(b => b.type === 'text').map(b => b.text).join('\n').trim()
}

// Laat Claude uit de kandidaten de best passende kiezen + NL alt-tekst maken.
async function pickBest({ client, candidates, article, slot }) {
  const list = candidates
    .map((c, i) => `[${i}] ${c.description || '(geen beschrijving)'} — ${c.width}x${c.height}`)
    .join('\n')

  const schema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      index: { type: 'integer', description: 'Index van de best passende foto' },
      altText: { type: 'string', description: 'Beschrijvende Nederlandse alt-tekst' },
    },
    required: ['index', 'altText'],
  }

  const prompt = `Artikel: "${article.title}" over ${article.primaryKeyword}.
Kies uit onderstaande stockfoto's de foto die het beste past als ${slot} bij dit artikel.
Kies op relevantie voor het onderwerp (echte moestuin/gewas/grond boven algemeen groen).

KANDIDATEN:
${list}

Geef de index van de beste foto en een korte, beschrijvende Nederlandse alt-tekst
(verwerk het zoekwoord "${article.primaryKeyword}" alleen als dat natuurlijk past).`

  try {
    const resp = await client.messages.create({
      model: MODELS.imagePicker,
      max_tokens: 400,
      output_config: { format: { type: 'json_schema', schema } },
      messages: [{ role: 'user', content: prompt }],
    })
    const parsed = JSON.parse(extractText(resp))
    const chosen = candidates[parsed.index] || candidates[0]
    return { chosen, altText: parsed.altText }
  } catch {
    // Model faalt of geeft geen JSON: neem gewoon de eerste kandidaat.
    return { chosen: candidates[0], altText: article.title }
  }
}

function toImageObject(candidate, altText) {
  return {
    url: candidate.url,
    alt: altText || candidate.description || 'Moestuinfoto',
    width: candidate.width,
    height: candidate.height,
    credit: candidate.photographer ? `Foto: ${candidate.photographer} via Pexels` : 'Foto via Pexels',
    creditUrl: candidate.photographerUrl || candidate.pageUrl || 'https://www.pexels.com',
  }
}

/**
 * Kiest een featured image (en optioneel inline beeld) voor het artikel.
 * Fallback-keten: query 1 -> query 2 -> ... -> nette standaardafbeelding.
 * @returns {Promise<{featured: object, usedFallback: boolean}>}
 */
export async function selectImages({ article, apiKey }) {
  if (!apiKey) {
    return { featured: FALLBACK_IMAGE, usedFallback: true }
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  const queries = (article.imageQueries && article.imageQueries.length)
    ? article.imageQueries
    : [article.primaryKeyword, 'vegetable garden']

  // Probeer de queries op volgorde tot er bruikbare kandidaten zijn.
  for (const query of queries) {
    let candidates = []
    try {
      candidates = await searchPexels(query, apiKey)
    } catch {
      candidates = []
    }
    if (candidates.length === 0) continue

    const { chosen, altText } = await pickBest({ client, candidates, article, slot: 'featured image' })
    if (chosen?.url) {
      return { featured: toImageObject(chosen, altText), usedFallback: false }
    }
  }

  // Niets gevonden: nette standaardafbeelding.
  return { featured: FALLBACK_IMAGE, usedFallback: true }
}

export { FALLBACK_IMAGE }
