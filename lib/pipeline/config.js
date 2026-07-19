// Centrale configuratie voor de wekelijkse artikelworkflow.
// Alle secrets komen uit env-vars; niets hardcoden.

export const MODELS = {
  // Balans kwaliteit/kosten voor onderzoek en schrijven.
  research: process.env.ARTICLE_MODEL || 'claude-sonnet-5',
  writer: process.env.ARTICLE_MODEL || 'claude-sonnet-5',
  // Goedkoop model voor de simpele "kies de beste foto"-keuze.
  imagePicker: process.env.IMAGE_PICK_MODEL || 'claude-haiku-4-5',
}

// Web search-tool: versioneert. 20260209 = dynamic filtering, werkt op
// Sonnet 5 / Opus 4.6+. Controleer de Anthropic-docs bij een modelwissel.
export const WEB_SEARCH_TOOL = { type: 'web_search_20260209', name: 'web_search', max_uses: 5 }

// draft = artikel wordt gegenereerd maar als concept opgeslagen (status: draft,
// niet live, geen mail). publish = live + mail. Standaard publish.
export const ARTICLE_MODE = (process.env.ARTICLE_MODE || 'publish').toLowerCase()

export const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'info@moestuin.nl'

// Afzender voor alle transactionele mail (workflow-melding + contactformulier).
// Standaard onboarding@resend.dev: werkt zonder geverifieerd domein, maar kan
// dan alleen naar je eigen Resend-account-adres mailen. Zodra moestuin.nl is
// geverifieerd bij Resend: zet RESEND_FROM op "Moestuin.nl <noreply@moestuin.nl>"
// (env-var, geen code-wijziging nodig).
export const RESEND_FROM = process.env.RESEND_FROM || 'Moestuin.nl <onboarding@resend.dev>'

export const SITE_URL = 'https://www.moestuin.nl'

// Interne paden die een artikel als link mag gebruiken. De schrijfstap krijgt
// deze whitelist mee zodat er nooit een dode interne link ontstaat.
export function getInternalLinkTargets(existingArticles) {
  const fixed = [
    { path: '/zaaikalender', label: 'Zaaikalender (36 gewassen per maand)' },
    { path: '/artikel', label: 'Overzicht van alle tuintips' },
    { path: '/over', label: 'Over Moestuin.nl' },
  ]
  const articleTargets = existingArticles.map(a => ({
    path: `/artikel/${a.slug}`,
    label: a.title,
  }))
  return [...fixed, ...articleTargets]
}

/** Gooit een duidelijke fout als een vereiste env-var ontbreekt. */
export function requireEnv(name) {
  const value = process.env[name]
  if (!value) throw new Error(`Ontbrekende environment variable: ${name}`)
  return value
}
