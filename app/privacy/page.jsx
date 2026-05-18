export const metadata = {
  title: 'Privacybeleid · Moestuin.nl',
  description: 'Privacybeleid van Moestuin.nl — hoe wij omgaan met je gegevens.',
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
        <p>Moestuin.nl is een Nederlandse website die een gratis AI moestuincoach aanbiedt. Je kunt ons bereiken via <a href="mailto:info@moestuin.nl">info@moestuin.nl</a>.</p>

        <h2>Welke gegevens verwerken wij?</h2>
        <p>Moestuin.nl verwerkt zo min mogelijk persoonsgegevens. Wij verzamelen:</p>
        <ul>
          <li><strong>Vragen die je stelt aan de coach</strong> — deze worden lokaal in je browser opgeslagen (localStorage) en niet gekoppeld aan een account of e-mailadres.</li>
          <li><strong>Anonieme bezoekersdata</strong> — via standaard server-logging (IP-adres, bezochte pagina&apos;s, tijdstip). Wij gebruiken deze gegevens uitsluitend voor technisch beheer.</li>
        </ul>
        <p>Wij maken geen gebruik van tracking-cookies of advertentietrackers van derden.</p>

        <h2>AI-vragen en Anthropic</h2>
        <p>De vragen die je stelt aan Moos worden doorgestuurd naar de API van Anthropic (de maker van Claude). Anthropic heeft een eigen privacybeleid. Stuur geen gevoelige persoonlijke informatie mee in je vraag.</p>

        <h2>Hoe lang bewaren wij je gegevens?</h2>
        <p>Vragen worden uitsluitend in jouw eigen browser bewaard en worden niet door ons opgeslagen op een server. Je kunt de browserdata op elk moment wissen via de instellingen van je browser.</p>

        <h2>Jouw rechten</h2>
        <p>Op grond van de AVG heb je het recht op inzage, correctie en verwijdering van je persoonsgegevens. Omdat wij geen persoonsgegevens opslaan die aan jou gekoppeld zijn, is er in de praktijk niets te inzien of verwijderen. Bij vragen kun je contact opnemen via <a href="mailto:info@moestuin.nl">info@moestuin.nl</a>.</p>

        <h2>Wijzigingen</h2>
        <p>Wij kunnen dit privacybeleid aanpassen. De meest recente versie staat altijd op deze pagina.</p>
      </section>
    </main>
  )
}
