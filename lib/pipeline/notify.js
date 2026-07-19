import { Resend } from 'resend'
import { NOTIFY_EMAIL, SITE_URL, RESEND_FROM } from './config.js'

// Fase 7 — Melding bij publicatie.
// Stuurt een mail naar NOTIFY_EMAIL (info@moestuin.nl) bij een geslaagde,
// live publicatie, met titel, klikbare live-URL, zoekwoord en beeldpreview.
// Bij een mislukte run gaat er een korte foutmelding naar hetzelfde adres.

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  return new Resend(key)
}

/** Melding bij een geslaagde, live publicatie. */
export async function notifyPublished({ article, image, topic }) {
  const resend = getResend()
  if (!resend) {
    console.warn('[notify] RESEND_API_KEY ontbreekt — melding overgeslagen.')
    return { sent: false }
  }

  const liveUrl = `${SITE_URL}/artikel/${article.slug}`
  const title = escapeHtml(article.title)
  const keyword = escapeHtml(topic?.primairKeyword || article.primaryKeyword || '')
  const imgUrl = image?.url || ''
  const imgAlt = escapeHtml(image?.alt || article.title)

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
      <p style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#a3501f;margin:0 0 6px">
        Nieuw artikel live op Moestuin.nl
      </p>
      <h1 style="font-size:24px;line-height:1.2;margin:0 0 12px">${title}</h1>
      ${imgUrl ? `<img src="${escapeHtml(imgUrl)}" alt="${imgAlt}" style="width:100%;height:auto;border-radius:6px;margin:0 0 16px" />` : ''}
      <p style="margin:0 0 8px"><strong>Zoekwoord/onderwerp:</strong> ${keyword}</p>
      <p style="margin:0 0 20px">
        <a href="${liveUrl}" style="display:inline-block;background:#3d5a3a;color:#fff;text-decoration:none;padding:12px 20px;border-radius:4px;font-weight:600">
          Bekijk het artikel live &rarr;
        </a>
      </p>
      <p style="font-size:13px;color:#666;margin:0">
        Directe link: <a href="${liveUrl}" style="color:#a3501f">${liveUrl}</a>
      </p>
      <p style="font-size:12px;color:#999;margin:16px 0 0">
        Automatisch gegenereerd en gepubliceerd door de wekelijkse artikelworkflow.
      </p>
    </div>`

  const { error } = await resend.emails.send({
    from: RESEND_FROM,
    to: NOTIFY_EMAIL,
    subject: `Nieuw artikel live: ${article.title}`,
    html,
    text: `Nieuw artikel live op Moestuin.nl\n\n${article.title}\nZoekwoord: ${topic?.primairKeyword || article.primaryKeyword || ''}\nLive: ${liveUrl}`,
  })

  if (error) {
    console.error('[notify] Resend gaf een fout:', error)
    return { sent: false, error }
  }
  return { sent: true }
}

/** Korte foutmelding als een run mislukt, zodat een stille misser opvalt. */
export async function notifyError({ stage, message, topic }) {
  const resend = getResend()
  if (!resend) {
    console.warn('[notify] RESEND_API_KEY ontbreekt — foutmelding overgeslagen.')
    return { sent: false }
  }

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
      <p style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#7a2a2a;margin:0 0 6px">
        Wekelijkse artikelworkflow mislukt
      </p>
      <h1 style="font-size:20px;line-height:1.2;margin:0 0 12px">Er is deze week geen artikel gepubliceerd</h1>
      <p style="margin:0 0 8px"><strong>Fase:</strong> ${escapeHtml(stage)}</p>
      ${topic?.onderwerp ? `<p style="margin:0 0 8px"><strong>Gekozen onderwerp:</strong> ${escapeHtml(topic.onderwerp)}</p>` : ''}
      <p style="margin:0 0 8px"><strong>Fout:</strong></p>
      <pre style="white-space:pre-wrap;background:#f4f1ea;padding:12px;border-radius:4px;font-size:13px;margin:0">${escapeHtml(message)}</pre>
    </div>`

  const { error } = await resend.emails.send({
    from: RESEND_FROM,
    to: NOTIFY_EMAIL,
    subject: 'Wekelijkse artikelworkflow mislukt — geen publicatie',
    html,
    text: `Wekelijkse artikelworkflow mislukt in fase "${stage}".\nOnderwerp: ${topic?.onderwerp || '(nog niet gekozen)'}\nFout: ${message}`,
  })

  if (error) {
    console.error('[notify] Resend foutmelding faalde:', error)
    return { sent: false, error }
  }
  return { sent: true }
}
