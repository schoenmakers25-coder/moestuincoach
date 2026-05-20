import Link from 'next/link'

export const metadata = {
  title: 'Productaanbevelingen voor de moestuin | Moestuin.nl',
  description: 'De beste zaden, gereedschap, potgrond en kweekbakken voor je moestuin, geselecteerd op kwaliteit en geschiktheid voor Nederlandse tuiniers.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.moestuin.nl/producten' },
  openGraph: {
    type: 'website',
    url: 'https://www.moestuin.nl/producten',
    title: 'Productaanbevelingen voor de moestuin | Moestuin.nl',
    description: 'De beste zaden, gereedschap, potgrond en kweekbakken voor je moestuin.',

    locale: 'nl_NL',
  },
}

const CATEGORIES = [
  {
    id: 'zaden',
    label: 'Zaden',
    intro: 'Goed zaad is de basis van een goede oogst. Wij raden rassen aan die betrouwbaar kiemen, goed presteren in Nederlandse omstandigheden en geschikt zijn voor zowel de volle grond als de pot op het balkon.',
    products: [
      {
        name: 'Courgette \'Romanesco\'',
        tag: 'Zaden',
        why: 'Eén van de productiefte courgettes voor Nederlandse tuinen. De getande vruchten zijn aromatischer dan standaardrassen en de plant is robuust tegen wisselvallig zomerweer. Eén plant geeft van juni tot september een voortdurende oogst.',
        ideal: 'Beginners, grote tuin én balkon (in 40L pot)',
        zaaitijd: 'April–mei (binnen) of mei–juni (buiten)',
      },
      {
        name: 'Tomaat \'Gardeners\' Delight\'',
        tag: 'Zaden',
        why: 'De meest aanbevolen kersttomaat voor beginners in Nederland. Kleine, zoete vruchten in trossen, vroeg in productie en bestand tegen schimmelziekten. Werkt goed in kas, serre en buiten op een beschutte plek.',
        ideal: 'Beginners, kas en beschutte buitenplek',
        zaaitijd: 'Februari–maart (binnen vooruit zaaien)',
      },
      {
        name: 'Veldsla mengsel (snijsla)',
        tag: 'Zaden',
        why: 'Een mengsel van slarassen dat van maart tot november gezaaid kan worden. Snel oogstbaar (vanaf 5–6 weken), neemt weinig ruimte in en is na knippen hergroei-bestendig. Ideaal voor wie het hele seizoen verse sla wil.',
        ideal: 'Doorlopende oogst, ook op balkon en in bak',
        zaaitijd: 'Maart–oktober (buiten, elke 2–3 weken)',
      },
      {
        name: 'Radijs \'Cherry Belle\'',
        tag: 'Zaden',
        why: 'Klaar in 22 tot 28 dagen na zaaien, de snelste oogst in de moestuin. Ronde, knapperige vruchten met milde smaak. Uitstekend als tussengewas tussen langzamere planten als broccoli of kool.',
        ideal: 'Absolute beginners, ook voor kinderen',
        zaaitijd: 'Maart–september (direct buiten zaaien)',
      },
    ],
  },
  {
    id: 'gereedschap',
    label: 'Gereedschap',
    intro: 'Goed gereedschap maakt tuinieren aangenamer en efficiënter. Je hebt geen grote collectie nodig, met vier basisstukken kom je een heel seizoen ver. We raden producten aan met een degelijke constructie die ook intensief gebruik aankan.',
    products: [
      {
        name: 'Plantenschepje (RVS of smeedijzer)',
        tag: 'Gereedschap',
        why: 'Het meest gebruikte stuk gereedschap in de moestuin. Onmisbaar voor het planten van zaailingen, uittrekken van onkruid en controleren van worteldiepte. Kies een exemplaar met een houten handvat voor grip en een geroest-vrij blad.',
        ideal: 'Elke moestuinier, dagelijks gebruik',
        tip: 'Neem een model met centimetermarkering op het blad, handig voor het bepalen van zaai- en plantdiepte.',
      },
      {
        name: 'Wiedijzer (harkschoffel)',
        tag: 'Gereedschap',
        why: 'Effectiever dan wieden met de hand: het oscillerende blad snijdt jonge onkruidwortels net onder de grond af zonder de bodemstructuur te verstoren. Werkt het best in droge omstandigheden, ideaal voor een kwartier werk na een droge dag.',
        ideal: 'Iedereen met meer dan 4 m² moestuin',
        tip: 'Gebruik na regen, wanneer de grond zacht is maar het onkruid net zichtbaar wordt.',
      },
      {
        name: 'Gieter met afneembare broes (8–10L)',
        tag: 'Gereedschap',
        why: 'Een gieter met lange hals en een fijnmazige broes geeft een zachte, gelijkmatige waternevel die zaailingen niet platslaat. De afneembare broes maakt diepe, gerichte bewatering aan de voet van planten ook mogelijk.',
        ideal: 'Dagelijks gebruik, jong zaaisel en volwassen planten',
        tip: 'Kies roestvrij staal of dikwandig kunststof, want goedkope gieters barsten na één winter buiten.',
      },
      {
        name: 'Tuinhandschoenen (katoen-rubber coating)',
        tag: 'Gereedschap',
        why: 'Beschermen handen, verbeteren grip op gereedschap en voorkomen snijwonden bij herstellen van draad of bindtouw. Een rubberen coating op de vingertoppen geeft gevoel voor wat je doet, terwijl de palm beschermd blijft.',
        ideal: 'Iedereen, ook wie niet vies wil worden',
        tip: 'Koop een maatje kleiner dan je denkt nodig te hebben, handschoenen rekken uit bij gebruik.',
      },
    ],
  },
  {
    id: 'potgrond',
    label: 'Potgrond & bodem',
    intro: 'De grond is het fundament van je moestuin. Goede bodem houdt vocht vast, heeft de juiste luchtdoorlatendheid en bevat de voedingsstoffen die groenten nodig hebben. Voor in de volle grond gelden andere keuzes dan voor potten en bakken op het balkon.',
    products: [
      {
        name: 'Moestuingrond (specifiek voor groenten)',
        tag: 'Potgrond',
        why: 'Speciaal samengesteld voor groenten en kruiden: rijker aan voedingsstoffen dan standaard potgrond, met compost en een lagere pH die past bij de meeste moestuingewassen. Geschikt voor het vullen van verhoogde bedden en grote plantenbakken.',
        ideal: 'Verhoogde bedden, grote potten, opbouwen van nieuwe bedden',
        tip: 'Meng bij voorkeur 70% moestuingrond met 30% rijpe compost voor het beste resultaat.',
      },
      {
        name: 'Rijpe tuincompost (gedroogd)',
        tag: 'Potgrond',
        why: 'Compost verbetert elke grondsoort: zandgrond houdt beter vocht vast, kleigrond wordt losser en beter doorlatend. Gedroogde compost is makkelijker te doseren en bewaren dan verse compost. Jaarlijks toevoegen houdt de bodem in conditie.',
        ideal: 'Jaarlijkse bodemverbetering, toevoeging bij plantgaten',
        tip: 'Voeg compost toe in de herfst of vroege lente en geef het de tijd om in te werken voor het planten.',
      },
      {
        name: 'Kokosvezel kweekmedium',
        tag: 'Potgrond',
        why: 'Uitstekend medium voor het voorzaaien van zaden: steriel (geen onkruid, geen ziekten), licht en luchtig genoeg voor delicate worteltjes. Duurzamer dan turf, kokos is een bijproduct van de kokosnotenindustrie.',
        ideal: 'Zaaien op de vensterbank, kweekpluggen vullen',
        tip: 'Houd het medium vochtig maar niet nat, kokos houdt zoveel vocht vast dat overwatering makkelijk is.',
      },
      {
        name: 'Perliet (voor drainage in potten)',
        tag: 'Potgrond',
        why: 'Lichte vulstof van vulkanisch gesteente die de drainage van potmengsel sterk verbetert. Essentieel voor potten en bakken op het balkon, waar waterstagnatie snel rot veroorzaakt. Meng 10–20% perliet door standaard potgrond.',
        ideal: 'Potten en bakken op balkon of terras',
        tip: 'Adem niet in bij het verwerken, zet het buiten of draag een stofmasker.',
      },
    ],
  },
  {
    id: 'kweekbakken',
    label: 'Kweekbakken & containers',
    intro: 'Of je nu een tuin, balkon of vensterbank hebt, met de juiste bakken en containers is overal een moestuin mogelijk. We raden producten aan die duurzaam zijn, voldoende diepte bieden voor gezonde wortels en gemakkelijk te onderhouden zijn.',
    products: [
      {
        name: 'Verhoogd moestuinbed (houten of cortenstaal)',
        tag: 'Kweekbak',
        why: 'Een verhoogd bed van minimaal 30 cm hoog heeft vier grote voordelen: betere drainage, snellere opwarming in de lente, minder bukken bij onderhoud en bescherming tegen slakken en kleine knaagdieren. In een verhoogd bed heb je volledige controle over de grondkwaliteit.',
        ideal: 'Tuin, terras, oprit, overal waar een vlakke ondergrond is',
        tip: 'Kies een breedte van maximaal 120 cm, zodat je er van beide kanten bij kunt zonder de grond in te lopen.',
      },
      {
        name: 'Diepe plantenbak voor balkon (min. 40 cm diep)',
        tag: 'Kweekbak',
        why: 'Oppervlakkige balkonbakken zijn de meest gemaakte fout op het balkon. Tomaten, courgettes en paprika\'s hebben wortels van 30–50 cm diep nodig. Een bak van minimaal 40 cm diep geeft echt resultaat; ondieper levert alleen bladmassa zonder oogst.',
        ideal: 'Balkon, dakterras, ook voor tomaten en courgette',
        tip: 'Let op het gewicht: een gevulde bak van 60L weegt 30–40 kg. Controleer de draagkracht van je balkon.',
      },
      {
        name: 'Kweekplateau met kweekpluggen (54-gaats)',
        tag: 'Kweekbak',
        why: 'Een kweekplateau met vaste pluggen geeft elk zaailing zijn eigen ruimte met ideale luchtcirculatie rondom de wortels (air-pruning). Dit voorkomt dat wortels in kringen gaan groeien, wat een betere uitplantresultaten geeft.',
        ideal: 'Voorzaaien op vensterbank of in serre, februari–april',
        tip: 'Gebruik een doorzichtige koepel de eerste week om vochtigheid te bewaren totdat zaden ontkiemen.',
      },
      {
        name: 'Mini-broeikas / koudebak',
        tag: 'Kweekbak',
        why: 'Een kleine opklapbare broeikas verlengt het seizoen met vier tot zes weken aan beide kanten: vroeger planten in de lente, later doorkweken in de herfst. Beschermt ook tegen nachtvorst en insecten. Goedkopere optie dan een vaste serre.',
        ideal: 'Kleine tuin, terras, voor starters met tomaten of paprika',
        tip: 'Open de broeikas overdag als het boven 18°C is, anders verbranden jonge planten of krijgen ze schimmel.',
      },
    ],
  },
]

export default function ProductenPage() {
  return (
    <>
      <section style={{ padding: '48px 0 0', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Broodkruimelpad" style={{ marginBottom: 24 }}>
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <b>Producten</b>
          </nav>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: 14 }}>
            Aanbevelingen
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 64px)', lineHeight: 1.0, letterSpacing: '-0.01em', marginBottom: 20 }}>
            Producten voor <span style={{ fontStyle: 'italic' }}>de moestuin.</span>
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.65, color: 'var(--ink-2)', maxWidth: '60ch', marginBottom: 40 }}>
            Wij selecteren producten op kwaliteit, geschiktheid voor Nederlandse omstandigheden en eerlijke prijs-kwaliteitsverhouding. Alle aanbevelingen zijn gebaseerd op eigen gebruik en ervaring. Geen betaalde plaatsingen.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', paddingBottom: 32 }}>
            {CATEGORIES.map(cat => (
              <a key={cat.id} href={`#${cat.id}`} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink)', border: '1px solid var(--ink)', padding: '7px 14px', textDecoration: 'none' }}>
                {cat.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {CATEGORIES.map((cat, ci) => (
        <section key={cat.id} id={cat.id} style={{ padding: '72px 0', borderBottom: '1px solid var(--line)', background: ci % 2 === 1 ? 'var(--paper-2)' : 'var(--paper)' }}>
          <div className="wrap">
            <div className="page-cat-intro">
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>Categorie</div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1.0, margin: '0 0 16px' }}>{cat.label}</h2>
              </div>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--ink-2)', margin: 0, paddingTop: 28 }}>{cat.intro}</p>
            </div>

            <div className="page-cards-grid" style={{ background: 'var(--line-strong)', border: '1px solid var(--line-strong)' }}>
              {cat.products.map(p => (
                <div key={p.name} style={{ background: ci % 2 === 1 ? 'var(--paper)' : 'var(--paper-2)', padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--terracotta)' }}>{p.tag}</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, lineHeight: 1.1, margin: 0 }}>{p.name}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--ink-2)', margin: 0, flexGrow: 1 }}>{p.why}</p>
                  <div style={{ borderTop: '1px solid var(--line)', paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--muted)' }}>
                      <b style={{ color: 'var(--ink)', textTransform: 'uppercase', fontSize: 9, letterSpacing: '0.12em' }}>Ideaal voor</b><br />
                      {p.ideal}
                    </div>
                    {(p.zaaitijd || p.tip) && (
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--muted)' }}>
                        <b style={{ color: 'var(--forest)', textTransform: 'uppercase', fontSize: 9, letterSpacing: '0.12em' }}>{p.zaaitijd ? 'Zaaitijd' : 'Tip'}</b><br />
                        {p.zaaitijd || p.tip}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section style={{ padding: '72px 0', background: 'var(--forest)', color: 'var(--paper)' }}>
        <div className="wrap page-cta-grid">
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(244,239,228,.55)', marginBottom: 12 }}>Gratis hulp</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 4vw, 36px)', lineHeight: 1.1, margin: '0 0 12px' }}>
              Welk product past bij <em>jouw situatie?</em>
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(244,239,228,.75)', margin: 0, maxWidth: '52ch', lineHeight: 1.6 }}>
              Niet zeker welk zaad of gereedschap je nodig hebt? Stel je vraag aan Moos, de gratis AI moestuincoach geeft je een persoonlijk advies op basis van jouw tuin, grond en ervaring.
            </p>
          </div>
          <Link href="/" style={{ display: 'inline-block', background: 'var(--terracotta)', color: 'var(--paper)', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.12em', textTransform: 'uppercase', padding: '14px 24px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            Vraag Moos →
          </Link>
        </div>
      </section>
    </>
  )
}
