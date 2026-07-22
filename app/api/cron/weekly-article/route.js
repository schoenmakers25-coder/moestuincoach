import { NextResponse } from 'next/server'
import { runWeeklyArticle } from '@/lib/pipeline/run'

// Fase 2: Wekelijkse trigger (Vercel Cron).
// Draait elke maandagochtend (zie vercel.json) en voert de hele pipeline uit.
// Beveiligd met CRON_SECRET via de Authorization-header.

export const dynamic = 'force-dynamic'
export const maxDuration = 300 // seconden, ruim voor onderzoek + schrijven + foto's

function isAuthorized(request) {
  const secret = process.env.CRON_SECRET
  if (!secret) return false
  const auth = request.headers.get('authorization') || ''
  // Vercel Cron stuurt "Authorization: Bearer <CRON_SECRET>".
  return auth === `Bearer ${secret}`
}

async function handle(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Niet geautoriseerd.' }, { status: 401 })
  }

  // ?force=1 slaat de "al deze week gepubliceerd"-check over (voor handmatig testen).
  const force = new URL(request.url).searchParams.get('force') === '1'

  const result = await runWeeklyArticle({ force })

  const httpStatus = result.status === 'error' ? 500 : 200
  return NextResponse.json(result, { status: httpStatus })
}

// GET zodat Vercel Cron 'm kan aanroepen; POST voor handmatige triggers.
export async function GET(request) {
  return handle(request)
}

export async function POST(request) {
  return handle(request)
}
