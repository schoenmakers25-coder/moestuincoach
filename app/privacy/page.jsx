export const metadata = {
  title: 'Privacybeleid · Moestuin.nl',
  description: 'Privacybeleid van Moestuin.nl: hoe wij omgaan met je gegevens.',
  robots: { index: false },
}

export default function PrivacyPage() {
  return (
    <main className="page-wrap" style={{ maxWidth: 680, margin: '0 auto', padding: '60px 24px 100px' }}>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 5vw, 42px)', marginBottom: 8 }}>
        Privacybeleid
      </h1>
      <p style={{ color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 40 }}>
        Laatste update: mei 2026
      </p>

      <section style={{ lineHeight: 1.7, fontSize: 16 }}>
        <h2>Wie zijn wij?</h2>
        <p>Moestuin.nl is een Nederlandse website met een gratis zaaikalender en praktische tuiniersgidsen. Je kunt ons bereiken via <a href="mailto:info@moestuin.nl">info@moestuin.nl</a>.</p>

        <h2>Welke gegevens verwerken wij?</h2>
        <p>Moestuin.nl verwerkt zo min mogelijk persoonsgegevens. Wij verzamelen:</p>
        <ul>
          <li><strong>Gegevens uit het contactformulier</strong>: als je ons via het contactformulier een bericht stuurt, verwerken wij je naam, e-mailadres en bericht. Deze gegevens gebruiken wij uitsluitend om je vraag te beantwoorden en bewaren wij niet langer dan nodig.</li>
          <li><strong>Anonieme bezoekersdata</strong>: via standaard server-logging (IP-adres, bezochte pagina&apos;s, tijdstip). Wij gebruiken deze gegevens uitsluitend voor technisch beheer.</li>
        </ul>
        <p>Wij maken geen gebruik van tracking-cookies of advertentietrackers van derden.</p>

        <h2>Verzenden van e-mail</h2>
        <p>Een bericht via het contactformulier wordt afgeleverd via de transactionele mailservice Resend. Zij verwerken de inhoud van je bericht uitsluitend om het bij ons af te leveren.</p>

        <h2>Hoe lang bewaren wij je gegevens?</h2>
        <p>Berichten uit het contactformulier bewaren wij niet langer dan nodig om je vraag te beantwoorden. Wij slaan geen persoonsgegevens op in een database die aan jou gekoppeld is.</p>

        <h2>Jouw rechten</h2>
        <p>Op grond van de AVG heb je het recht op inzage, correctie en verwijdering van je persoonsgegevens. Omdat wij geen persoonsgegevens opslaan die aan jou gekoppeld zijn, is er in de praktijk niets te inzien of verwijderen. Bij vragen kun je contact opnemen via <a href="mailto:info@moestuin.nl">info@moestuin.nl</a>.</p>

        <h2>Wijzigingen</h2>
        <p>Wij kunnen dit privacybeleid aanpassen. De meest recente versie staat altijd op deze pagina.</p>
      </section>
    </main>
  )
}
