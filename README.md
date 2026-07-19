# Moestuin.nl

Next.js 15 (App Router) site op Vercel: een gratis Nederlandse **zaaikalender**,
**tuiniersgidsen** en een **wekelijkse, volledig geautomatiseerde SEO-artikelworkflow**.

## Inhoud

- **Zaaikalender** — 36 gewassen, statische data (`app/zaaikalender`).
- **Tuintips** — artikelen als markdown (`content/artikelen/*.md`) + een paar oudere
  handgeschreven JSX-artikelen (`app/artikel/<slug>/`). Beide verschijnen samen in de
  blog-index, de homepage en de sitemap via `lib/articles.js`.
- **Wekelijkse artikelworkflow** — elke maandag kiest de site zelf een actueel,
  seizoensrelevant onderwerp, schrijft er een SEO-artikel over, zoekt een passende
  rechtenvrije foto, publiceert het via een GitHub-commit en mailt een melding.

## Contentmodel

Elk gegenereerd artikel is een markdown-bestand in `content/artikelen/` met frontmatter:

```yaml
---
title: "..."           # max 60 tekens
slug: "..."            # kort, keyword-rijk, geen datum
date: "2026-07-06"
description: "..."      # meta description, max 155 tekens
excerpt: "..."         # korte intro voor de index
author: "Moos"
category: "seizoen"
tags: ["...", "..."]
primaryKeyword: "..."
readingMinutes: 8
status: "published"    # of "draft"
image:
  url: "..."
  alt: "..."           # Nederlandse alt-tekst
  width: 1600
  height: 1067
  credit: "Foto: ... via Pexels"
  creditUrl: "..."
faq:
  - question: "..."
    answer: "..."
---

Body in Markdown (## H2, ### H3, opsommingen, interne links)...
```

> Toekomst: een CMS als **Sanity** is een schonere oplossing (publiceren zonder
> redeploy via on-demand revalidation). De publicatiecode (`lib/pipeline/publish.js`)
> is bewust dun gehouden rond het bouwen van de frontmatter, zodat overstappen makkelijk blijft.

## De wekelijkse pipeline

Georkestreerd in `lib/pipeline/run.js`, per fase een losse module:

| Fase | Module | Doet |
|------|--------|------|
| 3 | `research.js` | Web search (actualiteit) + seizoen + dedup → één onderwerp als JSON |
| 4 | `write.js` | Schrijft het artikel (structured JSON output), valideert lengte en interne links |
| 4b | `images.js` | Pexels-zoekopdracht, Claude kiest de beste foto + NL alt-tekst, fallback-keten |
| 5 | `publish.js` | Commit het markdown-bestand naar GitHub → Vercel herbouwt |
| 7 | `notify.js` | Mailt bij publicatie (titel, live-URL, zoekwoord, beeldpreview) en bij fouten |

Robuustheid: publiceert **niet** als het onderzoek faalt, het artikel te kort is
(< 500 woorden) of het JSON niet parse-baar is. Idempotent: als er deze week al een
artikel gecommit is (check via de GitHub-commits-API), wordt de run overgeslagen.

### Waarom Pexels?

Rechtenvrije echte foto's van gewassen, grond en tuinen werken bij moestuinieren beter
dan AI-beeld, en Pexels vereist geen verplichte bronvermelding (we crediten de fotograaf
netjes in het bijschrift). Zonder `PEXELS_API_KEY` valt de pipeline terug op een nette
standaardafbeelding, zodat er nooit een gebroken beeld op de pagina staat.

## Cron

`vercel.json` registreert de cron op **maandag 06:00 UTC**:

```json
{ "crons": [{ "path": "/api/cron/weekly-article", "schedule": "0 6 * * 1" }] }
```

Het endpoint controleert `Authorization: Bearer <CRON_SECRET>` en weigert anders met 401.
Vercel stuurt die header automatisch mee als de env-var `CRON_SECRET` is ingesteld.

## Environment variables

Zie [.env.local.example](.env.local.example). Overzicht:

| Variabele | Nodig voor | Opmerking |
|-----------|-----------|-----------|
| `ANTHROPIC_API_KEY` | onderzoek, schrijven, fotokeuze | |
| `CRON_SECRET` | beveiliging cron-endpoint | lange random string |
| `GITHUB_TOKEN` | publiceren | fine-grained PAT, Contents: Read and write |
| `GITHUB_REPO` | publiceren | formaat `owner/repo` |
| `GITHUB_BRANCH` | publiceren | standaard `main` |
| `PEXELS_API_KEY` | foto's | optioneel; anders fallback-afbeelding |
| `RESEND_API_KEY` | meldingen + contactformulier | |
| `NOTIFY_EMAIL` | meldingen | standaard `info@moestuin.nl` |
| `ARTICLE_MODE` | optioneel | `publish` (standaard) of `draft` |

Zet deze in Vercel → Project → Settings → Environment Variables. Geen secrets in de repo.

## De workflow handmatig testen

Forceer een run zonder tot maandag te wachten (de `?force=1` slaat de "al deze week
gepubliceerd"-check over):

```bash
# lokaal (met .env.local ingevuld)
npm run dev
curl -X POST "http://localhost:3000/api/cron/weekly-article?force=1" \
  -H "Authorization: Bearer $CRON_SECRET"

# op een Vercel preview/productie
curl -X POST "https://www.moestuin.nl/api/cron/weekly-article?force=1" \
  -H "Authorization: Bearer $CRON_SECRET"
```

Tip: zet `ARTICLE_MODE=draft` de eerste weken. Dan wordt het artikel wél gegenereerd en
als concept gecommit (`status: draft`, niet zichtbaar), maar niet live gezet en geen mail.
Zet op `publish` zodra je vertrouwt op de output.

## SEO

- Dynamische `sitemap.xml` (`app/sitemap.js`) — pakt nieuwe artikelen automatisch mee.
- `robots.txt` (`app/robots.js`) wijst naar de sitemap.
- Per artikel: metadata, canonical, Open Graph + Twitter Card, en JSON-LD
  (`BlogPosting` + `BreadcrumbList`, plus `FAQPage` als er FAQ's zijn).
- **Na de eerste deploy**: dien `https://www.moestuin.nl/sitemap.xml` in bij Google
  Search Console. De verificatie-meta-tag staat al in `app/layout.jsx`.

## Ontwikkelen

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # productie-build
```
