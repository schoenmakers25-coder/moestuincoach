import Anthropic from '@anthropic-ai/sdk'
import { MODELS, WEB_SEARCH_TOOL, requireEnv } from './config.js'
import { getSeasonContext } from './season.js'

// Fase 3 — Trendonderzoek.
// Combineert drie signalen: (1) actualiteit via web search, (2) seizoen op
// basis van de datum, (3) dedup tegen reeds gepubliceerde onderwerpen.
// Levert één concreet onderwerp als strak JSON.

const TOPIC_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    onderwerp: { type: 'string', description: 'Concreet artikelonderwerp in het Nederlands' },
    primairKeyword: { type: 'string', description: 'Primair long-tail zoekwoord' },
    secundaireKeywords: {
      type: 'array',
      items: { type: 'string' },
      description: '2 tot 4 secundaire zoekwoorden',
    },
    invalshoek: { type: 'string', description: 'De hoek/insteek van het artikel' },
    waaromNu: { type: 'string', description: 'Waarom dit onderwerp deze week relevant is' },
  },
  required: ['onderwerp', 'primairKeyword', 'secundaireKeywords', 'invalshoek', 'waaromNu'],
}

function extractText(message) {
  return message.content
    .filter(b => b.type === 'text')
    .map(b => b.text)
    .join('\n')
    .trim()
}

/**
 * @param {object} opts
 * @param {Array<{slug:string,title:string,date:string}>} opts.existingTopics
 * @param {Date} [opts.now]
 * @returns {Promise<{topic:object, brief:string, season:object}>}
 */
export async function researchTopic({ existingTopics, now = new Date() }) {
  const apiKey = requireEnv('ANTHROPIC_API_KEY')
  const client = new Anthropic({ apiKey })
  const season = getSeasonContext(now)

  // Stap 1 — web search: wat speelt er nu in het Nederlandse moestuinieren?
  const searchPrompt = `Het is ${season.isoDate} (week ${season.week}, ${season.monthName} ${season.year}).
Zoek op het web wat er op dit moment speelt in de wereld van het Nederlandse moestuinieren:
actuele tuinnieuws, seizoensdrukte, veelgestelde vragen, opkomende thema's, weersinvloeden.

Seizoenscontext voor deze maand: ${season.focus}

Vat in maximaal 250 woorden samen wat er nu speelt en welke onderwerpen zoekwaardig zijn
voor Nederlandse hobbytuiniers. Noem concrete gewassen, activiteiten en vragen.`

  const searchResp = await client.messages.create({
    model: MODELS.research,
    max_tokens: 2000,
    tools: [WEB_SEARCH_TOOL],
    messages: [{ role: 'user', content: searchPrompt }],
  })
  const brief = extractText(searchResp) || season.focus

  // Stap 2 — beslissing als strak JSON (geen tools, wel structured output).
  const existingList = existingTopics
    .map(t => `- "${t.title}" (${t.slug})`)
    .join('\n') || '(nog geen artikelen)'

  const decisionPrompt = `Je bent de contentstrateeg van moestuin.nl, een Nederlandse moestuinsite.
Kies EEN concreet artikelonderwerp voor deze week.

WAT SPEELT ER NU (uit webonderzoek):
${brief}

SEIZOEN (${season.monthName} ${season.year}, week ${season.week}):
${season.focus}

AL GEPUBLICEERDE ONDERWERPEN — kies GEEN onderwerp dat hier al op lijkt:
${existingList}

Eisen aan het onderwerp:
- Actueel EN seizoensrelevant voor de Nederlandse moestuin deze week.
- Zoekwaardig: mensen zoeken hier actief op.
- Niet-duplicaat van de lijst hierboven.
- Concreet en praktisch, geen breed overzichtsartikel.
- Kies een primair long-tail zoekwoord waar realistisch op te scoren is.`

  const decisionResp = await client.messages.create({
    model: MODELS.research,
    max_tokens: 1000,
    output_config: { format: { type: 'json_schema', schema: TOPIC_SCHEMA } },
    messages: [{ role: 'user', content: decisionPrompt }],
  })

  const jsonText = extractText(decisionResp)
  let topic
  try {
    topic = JSON.parse(jsonText)
  } catch {
    throw new Error(`Trendonderzoek gaf geen parse-baar JSON terug: ${jsonText.slice(0, 300)}`)
  }

  if (!topic.onderwerp || !topic.primairKeyword) {
    throw new Error('Trendonderzoek: onderwerp of primair keyword ontbreekt.')
  }

  return { topic, brief, season }
}
