// Handmatige testrun van de genererende fasen (onderzoek -> schrijven -> foto),
// ZONDER te publiceren of te mailen. Zo zie je de output voordat er iets live gaat.
//
// Gebruik:
//   1. Vul .env.local met minstens ANTHROPIC_API_KEY (PEXELS_API_KEY optioneel).
//   2. node scripts/test-pipeline.mjs
//
// Voor een echte end-to-end run (mét publiceren + mail) gebruik je het
// cron-endpoint met ?force=1 (zie README).

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Minimale .env.local-loader (geen extra dependency nodig).
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const envPath = path.join(root, '.env.local')
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
}

if (!process.env.ANTHROPIC_API_KEY) {
  console.error('ANTHROPIC_API_KEY ontbreekt. Zet die in .env.local en probeer opnieuw.')
  process.exit(1)
}

const { getPublishedTopics, getAllArticles } = await import('../lib/articles.js')
const { researchTopic } = await import('../lib/pipeline/research.js')
const { writeArticle } = await import('../lib/pipeline/write.js')
const { selectImages } = await import('../lib/pipeline/images.js')

const now = new Date()
console.log('== Testrun wekelijkse artikelworkflow (geen publicatie) ==\n')

console.log('1/3  Trendonderzoek (web search + seizoen + dedup)...')
const { topic, season } = await researchTopic({ existingTopics: getPublishedTopics(), now })
console.log('     Onderwerp     :', topic.onderwerp)
console.log('     Primair kw    :', topic.primairKeyword)
console.log('     Secundair     :', topic.secundaireKeywords.join(', '))
console.log('     Invalshoek    :', topic.invalshoek)
console.log('     Waarom nu     :', topic.waaromNu)

console.log('\n2/3  Artikel schrijven...')
const { article, wordCount } = await writeArticle({ topic, season, existingArticles: getAllArticles() })
console.log('     Titel         :', article.title, `(${article.title.length} tekens)`)
console.log('     Slug          :', article.slug)
console.log('     Meta          :', article.metaDescription, `(${article.metaDescription.length} tekens)`)
console.log('     Woorden       :', wordCount)
console.log('     Tags          :', article.tags.join(', '))
console.log('     Beeldzoektermen:', article.imageQueries.join(' | '))

console.log('\n3/3  Foto kiezen (Pexels + AI-selectie, fallback)...')
const { featured, usedFallback } = await selectImages({ article, apiKey: process.env.PEXELS_API_KEY })
console.log('     Foto          :', featured.url, usedFallback ? '(FALLBACK)' : '')
console.log('     Alt-tekst     :', featured.alt)
console.log('     Credit        :', featured.credit)

console.log('\n== VOLLEDIG ARTIKEL (Markdown) ==\n')
console.log(article.bodyMarkdown)
console.log('\n== FAQ ==')
for (const f of article.faq) console.log(`  Q: ${f.question}\n  A: ${f.answer}`)
console.log('\nKlaar. Er is NIETS gepubliceerd of gemaild (dit was een testrun).')
