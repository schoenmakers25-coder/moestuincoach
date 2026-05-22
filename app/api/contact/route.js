import { Resend } from 'resend'

// In-memory rate limiter: max 3 submissions per IP per minute
const rateMap = new Map()
const WINDOW = 60_000
const MAX = 3

function isRateLimited(ip) {
  const now = Date.now()
  const hits = (rateMap.get(ip) || []).filter(t => now - t < WINDOW)
  if (hits.length >= MAX) return true
  rateMap.set(ip, [...hits, now])
  return false
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'

  if (isRateLimited(ip)) {
    return Response.json(
      { error: 'Te veel verzoeken. Wacht even en probeer het opnieuw.' },
      { status: 429 }
    )
  }

  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Ongeldig verzoek.' }, { status: 400 })
  }

  const { naam, email, bericht, honeypot } = body

  // Honeypot: bots vullen dit veld in, echte gebruikers niet
  if (honeypot) {
    return Response.json({ ok: true })
  }

  // Validatie
  const naamClean = String(naam ?? '').trim()
  const emailClean = String(email ?? '').trim().toLowerCase()
  const berichtClean = String(bericht ?? '').trim()

  if (naamClean.length < 2 || naamClean.length > 100) {
    return Response.json({ error: 'Vul je naam in (minimaal 2 tekens).' }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailClean)) {
    return Response.json({ error: 'Vul een geldig e-mailadres in.' }, { status: 400 })
  }
  if (berichtClean.length < 10) {
    return Response.json({ error: 'Vul een bericht in (minimaal 10 tekens).' }, { status: 400 })
  }
  if (berichtClean.length > 2000) {
    return Response.json({ error: 'Bericht is te lang (maximaal 2000 tekens).' }, { status: 400 })
  }

  const naamSafe = escapeHtml(naamClean)
  const berichtSafe = escapeHtml(berichtClean)

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'Moestuin.nl <noreply@moestuin.nl>',
      to: 'info@moestuin.nl',
      replyTo: emailClean,
      subject: `Contactformulier — ${naamSafe}`,
      html: `
        <p><strong>Naam:</strong> ${naamSafe}</p>
        <p><strong>E-mail:</strong> ${escapeHtml(emailClean)}</p>
        <hr />
        <p><strong>Bericht:</strong></p>
        <p style="white-space:pre-wrap">${berichtSafe}</p>
      `,
      text: `Naam: ${naamClean}\nE-mail: ${emailClean}\n\nBericht:\n${berichtClean}`,
    })

    return Response.json({ ok: true })
  } catch (err) {
    console.error('[contact] Resend error:', err)
    return Response.json(
      { error: 'Er ging iets mis bij het versturen. Mail ons direct op info@moestuin.nl.' },
      { status: 500 }
    )
  }
}
