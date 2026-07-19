// Seizoenscontext op basis van de draaidatum. Geeft het model houvast over
// wat er deze week/maand relevant is in de Nederlandse moestuin.

const NL_MONTHS = [
  'januari', 'februari', 'maart', 'april', 'mei', 'juni',
  'juli', 'augustus', 'september', 'oktober', 'november', 'december',
]

// Kernactiviteiten per maand — grof, als startpunt voor het model.
const MONTH_FOCUS = {
  0: 'Rustige maand. Zaaiplan maken, gereedschap onderhouden, eerste zaad binnen voorzaaien (ui, prei, paprika).',
  1: 'Voorzaaien binnen begint serieus: tomaat, paprika, aubergine. Tuinbonen kunnen buiten.',
  2: 'Start van het buitenseizoen: spinazie, radijs, wortel, erwt zaaien. Vroege aardappels voorkiemen.',
  3: 'Drukke zaaimaand. Veel groenten kunnen buiten. Afharden van voorgezaaide planten.',
  4: 'Uitplanten na de ijsheiligen (half mei): tomaat, courgette, pompoen, bonen. Alles kan de grond in.',
  5: 'Volle groei. Oogst van sla, radijs, aardbei. Onderhoud: dieven, water, schoffelen, plagen.',
  6: 'Hoogzomer. Oogsten en doorzaaien voor de herfst (sla, andijvie, boerenkool, veldsla).',
  7: 'Oogstmaand. Tomaat, courgette, bonen in overvloed. Herfst- en wintergroenten uitplanten.',
  8: 'Oogst en opruimen. Knoflook planten voorbereiden. Groenbemester zaaien op lege bedden.',
  9: 'Herfstoogst: pompoen, pastinaak, prei, boerenkool. Bedden afdekken, knoflook en tulpen planten.',
  10: 'Laatste oogst en winterklaar maken. Bladeren ruimen, composthoop, wintergroente beschermen.',
  11: 'Rust. Planning voor volgend jaar, zaad bestellen, gereedschap onderhouden, boerenkool oogsten na vorst.',
}

function getIsoWeek(d) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  const day = date.getUTCDay() || 7
  date.setUTCDate(date.getUTCDate() + 4 - day)
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1))
  return Math.ceil(((date - yearStart) / 86400000 + 1) / 7)
}

export function getSeasonContext(now = new Date()) {
  const month = now.getMonth()
  return {
    isoDate: now.toISOString().slice(0, 10),
    week: getIsoWeek(now),
    monthName: NL_MONTHS[month],
    year: now.getFullYear(),
    focus: MONTH_FOCUS[month],
  }
}

/** ISO-jaar+week als string, voor idempotentie ("is er deze week al iets?"). */
export function isoYearWeek(now = new Date()) {
  return `${now.getFullYear()}-W${String(getIsoWeek(now)).padStart(2, '0')}`
}
