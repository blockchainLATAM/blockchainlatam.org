import { useMemo, useState, type FormEvent } from 'react'
import versionMeta from '../../../version.production.json'
import './App.css'

type Category = 'all' | 'money' | 'security' | 'builders' | 'blockchain' | 'lab'
type Language = 'es' | 'en'

type Article = {
  id: number
  category: Exclude<Category, 'all'>
  label: string
  time: string
  read: string
  title: string
  dek: string
  art: 'bars' | 'signal' | 'blocks' | 'risk' | 'network'
}

const colors: Record<Exclude<Category, 'all'>, string> = {
  money: '#1fb981',
  security: '#e39a32',
  builders: '#9a7cff',
  blockchain: '#5d88f2',
  lab: '#00c8e8',
}

const articles: Article[] = [
  {
    id: 1,
    category: 'money',
    label: 'DINERO',
    time: 'HACE 2 H',
    read: '8 MIN',
    title: 'Por qué las stablecoins importan más en LATAM que en Estados Unidos',
    dek: 'Donde la inflación es alta y los bancos son lentos, un dólar digital deja de ser una apuesta y se convierte en infraestructura de uso diario.',
    art: 'bars',
  },
  {
    id: 2,
    category: 'blockchain',
    label: 'BLOCKCHAIN',
    time: 'HACE 5 H',
    read: '6 MIN',
    title: 'Qué pasa realmente cuando presionas Enviar en MetaMask',
    dek: 'Una transacción parece un botón. En realidad es una conversación entre claves, mempools, validadores y tiempo.',
    art: 'network',
  },
  {
    id: 3,
    category: 'money',
    label: 'DINERO',
    time: 'HACE 8 H',
    read: '11 MIN',
    title: 'La infraestructura de tokenización de Brasil, explicada',
    dek: 'Qué está cambiando para bancos, emisores y la próxima generación de activos financieros regionales.',
    art: 'blocks',
  },
  {
    id: 4,
    category: 'security',
    label: 'SEGURIDAD',
    time: 'HACE 1 D',
    read: '5 MIN',
    title: 'El permiso de wallet que puede vaciar tu cuenta',
    dek: 'Cómo leer una aprobación antes de firmarla y qué hacer si ya autorizaste el contrato equivocado.',
    art: 'risk',
  },
  {
    id: 5,
    category: 'lab',
    label: 'LAB',
    time: 'HACE 2 D',
    read: '9 MIN',
    title: 'Enviamos US$10 por cuatro blockchains: esto costó cada una',
    dek: 'Comisión, tiempo de confirmación y fallos reales en Ethereum, Base, Solana y Tron.',
    art: 'signal',
  },
  {
    id: 6,
    category: 'builders',
    label: 'BUILDERS',
    time: 'HACE 3 D',
    read: '7 MIN',
    title: 'Quién está construyendo los rieles de pago de México',
    dek: 'El mapa de empresas, protocolos y equipos que están convirtiendo remesas en producto.',
    art: 'blocks',
  },
]

const categoryLabels: Record<Category, string> = {
  all: 'Portada',
  money: 'Dinero',
  security: 'Seguridad',
  builders: 'Builders',
  blockchain: 'Blockchain',
  lab: 'Lab',
}

const countryData = [
  { code: 'BR', name: 'Brasil', status: 'REGULADO', color: '#1fb981', bars: [7, 11, 14, 13, 18, 22, 28], story: 'El banco central avanza con las reglas de tokenización de activos financieros.' },
  { code: 'AR', name: 'Argentina', status: 'REGISTRO', color: '#5d88f2', bars: [9, 12, 10, 17, 16, 21, 25], story: 'Los volúmenes minoristas de stablecoins siguen entre los más altos de la región.' },
  { code: 'MX', name: 'México', status: 'LEY FINTECH', color: '#1fb981', bars: [6, 8, 9, 13, 12, 16, 20], story: 'Remesas y rieles de pago concentran la actividad de builders.' },
  { code: 'CO', name: 'Colombia', status: 'EN DEBATE', color: '#e39a32', bars: [5, 7, 8, 6, 11, 10, 14], story: 'El Congreso retoma el marco para proveedores de servicios de activos virtuales.' },
  { code: 'CL', name: 'Chile', status: 'LEY VIGENTE', color: '#1fb981', bars: [4, 6, 7, 8, 9, 11, 13], story: 'La ley fintech define licencias para intermediarios de activos digitales.' },
]

function ArrowUpRight() {
  return <span aria-hidden="true" className="arrow-icon">↗</span>
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" className="icon" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="6.8" />
      <path d="m16.3 16.3 4.3 4.3" />
    </svg>
  )
}

function ArticleArtwork({ variant }: { variant: Article['art'] }) {
  return (
    <div className={`article-art article-art--${variant}`} aria-hidden="true">
      <div className="art-grid" />
      <span className="art-shape art-shape--one" />
      <span className="art-shape art-shape--two" />
      <span className="art-shape art-shape--three" />
      <span className="art-caption">FIG. 0{variant === 'bars' ? '1' : '2'} — SIGNAL</span>
    </div>
  )
}

function App() {
  const [language, setLanguage] = useState<Language>('es')
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [savedArticles, setSavedArticles] = useState<number[]>([])
  const [country, setCountry] = useState('BR')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const isSpanish = language === 'es'
  const releaseVersion = `v${versionMeta.version}`
  const filteredArticles = useMemo(
    () => articles.filter((article) => activeCategory === 'all' || article.category === activeCategory),
    [activeCategory],
  )
  const activeCountry = countryData.find((item) => item.code === country) ?? countryData[0]

  const copy = isSpanish
    ? {
        nav: ['Noticias', 'Videos', 'Research', 'Eventos', 'Jobs', 'Directorio'],
        heroTitle: 'Blockchain, activos digitales y la infraestructura que está transformando América Latina.',
        heroDek: 'Noticias, investigación, experimentos e inteligencia técnica para entender qué se está construyendo, cómo funciona y por qué importa.',
        explore: 'Explorar lo último',
        briefing: 'Recibir el briefing',
        credibility: 'PARA BUILDERS, INSTITUCIONES Y QUIENES INTENTAN ENTENDER LO QUE VIENE',
        signal: 'LATAM · SEÑAL EN VIVO',
        latest: 'LO ÚLTIMO',
        stories: 'HISTORIAS',
        read: 'Leer historia',
        labTitle: 'No solo lo explicamos. Lo probamos.',
        labBody: 'Desplegamos contratos, analizamos transacciones, comparamos redes y ponemos a prueba la infraestructura para mostrar cómo funcionan estos sistemas en el mundo real.',
        experiment: 'EXPERIMENTO 04',
        pulseLabel: 'ACROSS LATIN AMERICA',
        pulseTitle: 'El pulso de la región',
        pulseDek: 'Adopción, regulación y actividad de ecosistema país por país.',
        briefingTitle: 'La señal de América Latina, sin el ruido.',
        briefingBody: 'Las historias, datos y desarrollos de blockchain y activos digitales que realmente importan en LATAM, seleccionados para builders y tomadores de decisión.',
        subscribe: 'Recibir el briefing',
        subscribed: 'Estás dentro. Revisa tu correo para confirmar.',
        email: 'tu@correo.com',
        footer: 'Una iniciativa de Blockchain Foundation LATAM',
      }
    : {
        nav: ['News', 'Videos', 'Research', 'Events', 'Jobs', 'Directory'],
        heroTitle: 'Blockchain, digital assets and the infrastructure reshaping Latin America.',
        heroDek: 'Independent news, research, experiments and technical intelligence covering the technologies transforming money, ownership and digital infrastructure across Latin America.',
        explore: 'Explore the latest',
        briefing: 'Get the briefing',
        credibility: 'BUILT FOR BUILDERS, INSTITUTIONS AND EVERYONE TRYING TO UNDERSTAND WHAT COMES NEXT',
        signal: 'LATAM · LIVE SIGNAL',
        latest: 'LATEST',
        stories: 'STORIES',
        read: 'Read story',
        labTitle: 'We don’t just explain it. We test it.',
        labBody: 'We deploy contracts, inspect transactions, compare networks and test infrastructure so our audience can see how these systems behave in the real world.',
        experiment: 'EXPERIMENT 04',
        pulseLabel: 'ACROSS LATIN AMERICA',
        pulseTitle: 'The regional pulse',
        pulseDek: 'Adoption, regulation and ecosystem activity country by country.',
        briefingTitle: 'The signal from Latin America, without the noise.',
        briefingBody: 'Important blockchain, digital-asset and infrastructure developments across LATAM, curated for builders and decision-makers.',
        subscribe: 'Get the briefing',
        subscribed: 'You’re in. Check your inbox to confirm.',
        email: 'you@email.com',
        footer: 'An initiative of Blockchain Foundation LATAM',
      }

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const toggleSaved = (id: number) => {
    setSavedArticles((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
  }
  const submitBriefing = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (email.trim()) setSubscribed(true)
  }

  return (
    <div className="site-shell" id="top">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Blockchain LATAM home">
          <span>BLOCKCHAIN</span> <em>LATAM</em>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {copy.nav.map((item, index) => (
            <button key={item} type="button" onClick={() => scrollTo(['latest', 'lab', 'research', 'events', 'directory', 'briefing'][index])}>
              {item}
            </button>
          ))}
        </nav>
        <div className="header-actions">
          <button className="icon-button" type="button" aria-label="Search" onClick={() => scrollTo('latest')}>
            <SearchIcon />
          </button>
          <div className="language-toggle" aria-label="Language switcher">
            <button className={language === 'es' ? 'is-active' : ''} type="button" onClick={() => setLanguage('es')}>ES</button>
            <span>·</span>
            <button className={language === 'en' ? 'is-active' : ''} type="button" onClick={() => setLanguage('en')}>EN</button>
          </div>
          <button className="button button--cyan button--compact" type="button" onClick={() => scrollTo('briefing')}>{copy.briefing}</button>
        </div>
      </header>

      <div className="ticker" aria-label="Live signal">
        <span className="ticker-label"><i /> SEÑAL</span>
        <span className="ticker-track">Brasil publica el marco de tokenización · Las comisiones en L2 caen por debajo de US$0.01 · Nueva campaña de phishing dirigida a wallets en español · State of Blockchain LATAM 2026 en preparación ·</span>
      </div>

      <main>
        <section className="hero section-pad" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">BLOCKCHAIN LATAM · INTELLIGENCE FOR THE REGION</p>
            <h1 id="hero-title">{copy.heroTitle}</h1>
            <p className="hero-dek">{copy.heroDek}</p>
            <div className="hero-actions">
              <button className="button button--cyan" type="button" onClick={() => scrollTo('latest')}>{copy.explore} <ArrowUpRight /></button>
              <button className="button button--outline" type="button" onClick={() => scrollTo('briefing')}>{copy.briefing}</button>
            </div>
            <p className="credibility">{copy.credibility}</p>
          </div>
          <div className="signal-card">
            <div className="signal-card__top"><span>{copy.signal}</span><span>12:04 UTC-5</span></div>
            {[
              ['BR', 'Marco de tokenización de activos financieros', '+18%', '#1fb981'],
              ['AR', 'Volumen minorista de stablecoins', '+11%', '#1fb981'],
              ['MX', 'Remesas liquidadas en dólares digitales', '+7%', '#1fb981'],
              ['CO', 'Debate regulatorio para proveedores', 'En curso', '#e39a32'],
              ['SV', 'Nuevas licencias a emisores', '+3', '#5d88f2'],
            ].map(([code, text, delta, color]) => (
              <div className="signal-row" key={code}>
                <span className="signal-code">{code}</span>
                <span>{text}</span>
                <strong style={{ color }}>{delta}</strong>
              </div>
            ))}
            <div className="signal-card__foot"><span>LIVE / 2026</span><span>→</span></div>
          </div>
        </section>

        <section className="pillar-row section-pad" aria-label="Editorial pillars">
          {[
            ['money', 'Dinero', 'Stablecoins, bitcoin, pagos, remesas, CBDC, activos tokenizados y banca digital.'],
            ['security', 'Seguridad', 'Estafas, custodia, riesgos de smart contracts, exploits y seguridad operativa.'],
            ['builders', 'Builders', 'Startups, protocolos, ingenieros, herramientas, hackathons e infraestructura.'],
            ['blockchain', 'Blockchain', 'Cómo funcionan los protocolos: L1, L2, interoperabilidad, zk y consenso.'],
          ].map(([key, title, body]) => (
            <button className="pillar" key={key} type="button" onClick={() => { setActiveCategory(key as Category); scrollTo('latest') }}>
              <span className="pillar-bar" style={{ background: colors[key as Exclude<Category, 'all' | 'lab'>] }} />
              <strong>{title}</strong>
              <span>{body}</span>
            </button>
          ))}
        </section>

        <section className="latest section-pad" id="latest" aria-labelledby="latest-title">
          <div className="section-heading">
            <div><p className="eyebrow">{copy.latest}</p><h2 id="latest-title">Historias que mueven la señal</h2></div>
            <span className="section-count">0{filteredArticles.length} {copy.stories}</span>
          </div>
          <div className="category-rail" role="tablist" aria-label="Filter stories">
            {(Object.keys(categoryLabels) as Category[]).map((category) => (
              <button key={category} className={activeCategory === category ? 'is-active' : ''} type="button" role="tab" aria-selected={activeCategory === category} onClick={() => setActiveCategory(category)}>{categoryLabels[category]}</button>
            ))}
          </div>
          <div className="lead-story" onClick={() => setSelectedArticle(articles[0])} role="button" tabIndex={0} onKeyDown={(event) => event.key === 'Enter' && setSelectedArticle(articles[0])}>
            <ArticleArtwork variant="bars" />
            <div className="lead-story__copy"><p className="article-meta" style={{ color: colors.money }}>{articles[0].label} · {articles[0].time} · {articles[0].read}</p><h3>{articles[0].title}</h3><p>{articles[0].dek}</p><span className="text-link">{copy.read} <ArrowUpRight /></span></div>
          </div>
          <div className="article-grid">
            {filteredArticles.slice(1).map((article) => (
              <article className="article-card" key={article.id}>
                <button className="article-card__open" type="button" onClick={() => setSelectedArticle(article)}>
                  <ArticleArtwork variant={article.art} />
                  <span className="article-meta" style={{ color: colors[article.category] }}>{article.label} · {article.time} · {article.read}</span>
                  <h3>{article.title}</h3>
                  <span className="text-link">{copy.read} <ArrowUpRight /></span>
                </button>
                <button className={`save-button ${savedArticles.includes(article.id) ? 'is-saved' : ''}`} type="button" onClick={() => toggleSaved(article.id)} aria-label={savedArticles.includes(article.id) ? 'Remove saved article' : 'Save article'}>{savedArticles.includes(article.id) ? '●' : '＋'}</button>
              </article>
            ))}
          </div>
          <div className="sponsor-slot"><span className="eyebrow">PATROCINADO · CONTENIDO IDENTIFICADO</span><strong>Espacio disponible para socios del ecosistema</strong><span>El patrocinio nunca compra conclusiones editoriales.</span><i /></div>
        </section>

        <section className="lab section-pad" id="lab" aria-labelledby="lab-title">
          <div className="lab-intro"><p className="eyebrow cyan">BLOCKCHAIN LATAM LAB</p><h2 id="lab-title">{copy.labTitle}</h2><p>{copy.labBody}</p><button className="button button--outline" type="button" onClick={() => scrollTo('briefing')}>Ver experimentos <ArrowUpRight /></button></div>
          <div className="terminal"><div className="terminal__bar"><span /><span /><span /><small>tx-compare.sh</small></div><pre><code><b>$ send --asset USDC --amount 10 --net eth,base,sol,tron</b>{'\n'}<i>→ ethereum   fee 2.41 USD   conf 13.2s   ok</i>{'\n'}<em>→ base       fee 0.014 USD  conf 2.1s    ok</em>{'\n'}<em>→ solana     fee 0.0009 USD conf 0.8s    ok</em>{'\n'}<i>→ tron       fee 1.10 USD   conf 3.4s    ok</i>{'\n'}<strong># 4 redes · 1 transferencia · costo total 3.52 USD</strong></code></pre></div>
          <div className="experiment-card"><p className="eyebrow cyan">{copy.experiment}</p><h3>Ethereum vs Base vs Solana: una transacción, tres redes</h3><div><span><b>3</b>REDES</span><span><b>0.8s</b>MÁS RÁPIDA</span><span><b>×2670</b>DIF. COSTO</span></div></div>
        </section>

        <section className="research section-pad" id="research" aria-labelledby="research-title">
          <div className="research-cover"><div className="cover-grid" /><p className="eyebrow cyan">RESEARCH / DATASET · Q1 2026</p><h2>State of<br /><em>Blockchain</em><br />LATAM</h2><div className="cover-stamp">REPORT<br />01</div><div className="cover-axis">ADOPTION / REGULATION / INFRASTRUCTURE</div></div>
          <div className="research-copy"><p className="eyebrow">RESEARCH & INTELLIGENCE</p><h2 id="research-title">Datos propios para entender el mercado.</h2><p>Reportes con mapas de mercado, análisis de infraestructura, métricas de adopción y comparativas regulatorias en América Latina.</p><div className="research-list">{['Mapa de stablecoins en LATAM', 'Comparativa regulatoria: 9 países', 'Infraestructura de tokenización'].map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong><small>{index === 0 ? 'ABIERTO' : index === 1 ? 'PRÓXIMO' : 'PREMIUM'}</small></div>)}</div><button className="button button--cyan" type="button" onClick={() => scrollTo('briefing')}>Explorar research <ArrowUpRight /></button></div>
        </section>

        <section className="pulse section-pad" id="directory" aria-labelledby="pulse-title">
          <div className="section-heading"><div><p className="eyebrow">{copy.pulseLabel}</p><h2 id="pulse-title">{copy.pulseTitle}</h2><p className="section-description">{copy.pulseDek}</p></div><span className="section-count">05 PAÍSES</span></div>
          <div className="country-rail">{countryData.map((item) => <button className={country === item.code ? 'is-active' : ''} type="button" key={item.code} onClick={() => setCountry(item.code)}>{item.name}</button>)}</div>
          <div className="pulse-table"><div className="pulse-table__head"><span>PAÍS</span><span>ESTADO REGULATORIO</span><span>ACTIVIDAD / 90 DÍAS</span></div><div className="pulse-row"><div className="country-name"><strong>{activeCountry.code}</strong><span>{activeCountry.name}</span></div><span className="status" style={{ color: activeCountry.color, borderColor: `${activeCountry.color}55` }}>{activeCountry.status}</span><div className="spark-bars">{activeCountry.bars.map((height, index) => <i key={index} style={{ height, background: activeCountry.color }} />)}</div><p>{activeCountry.story}</p><ArrowUpRight /></div></div>
        </section>

        <section className="briefing section-pad" id="briefing" aria-labelledby="briefing-title">
          <div className="briefing-copy"><p className="eyebrow cyan">THE BLOCKCHAIN LATAM BRIEFING</p><h2 id="briefing-title">{copy.briefingTitle}</h2><p>{copy.briefingBody}</p><div className="briefing-issues">{['Brasil publica el borrador de tokenización', 'Las comisiones en L2 caen por debajo de un centavo', 'Nueva campaña de phishing dirigida a wallets en español', 'Tres rondas de financiación en fintech regional'].map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}</div></div>
          <div className="briefing-form-card"><span className="eyebrow">EDICIÓN #12 · SEMANAL</span><h3>Recibe el briefing cada semana</h3>{subscribed ? <p className="success-message">{copy.subscribed}</p> : <form onSubmit={submitBriefing}><label htmlFor="email">Email</label><div className="email-row"><input id="email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder={copy.email} /><button className="button button--cyan" type="submit">{copy.subscribe}</button></div><small>SIN SPAM. CANCELA CUANDO QUIERAS.</small></form>}<div className="sponsor-note">ESPACIO DE PATROCINIO<br /><span>Reservado para patrocinio editorialmente transparente.</span></div></div>
        </section>

        <section className="events section-pad" id="events" aria-labelledby="events-title"><div className="section-heading"><div><p className="eyebrow">ECOSYSTEM / 2026</p><h2 id="events-title">Donde se está construyendo lo próximo.</h2></div><button className="text-link" type="button" onClick={() => scrollTo('briefing')}>Explorar agenda <ArrowUpRight /></button></div><div className="event-list"><div className="event-date"><strong>04</strong><span>MAR</span></div><div><p className="eyebrow cyan">DESTACADO · CUMBRE</p><h3>Infraestructura financiera digital LATAM</h3><span>SÃO PAULO, BRASIL · 2 DÍAS</span></div><ArrowUpRight /></div><div className="event-list"><div className="event-date"><strong>19</strong><span>MAR</span></div><div><p className="eyebrow purple">HACKATHON</p><h3>Hackathon regional de pagos</h3><span>BOGOTÁ, COLOMBIA · 48 H</span></div><ArrowUpRight /></div></section>
      </main>

      <footer className="site-footer section-pad"><a className="wordmark" href="#top"><span>BLOCKCHAIN</span> <em>LATAM</em></a><p>{copy.footer} · {releaseVersion}</p><div><a href="#research">Research</a><a href="#briefing">Briefing</a><a href="#top">Volver arriba ↑</a></div></footer>

      {selectedArticle && <div className="reader-backdrop" role="presentation" onClick={() => setSelectedArticle(null)}><article className="reader" role="dialog" aria-modal="true" aria-labelledby="reader-title" onClick={(event) => event.stopPropagation()}><button className="reader-close" type="button" aria-label="Close article" onClick={() => setSelectedArticle(null)}>×</button><p className="article-meta" style={{ color: colors[selectedArticle.category] }}>{selectedArticle.label} · {selectedArticle.time} · {selectedArticle.read}</p><h2 id="reader-title">{selectedArticle.title}</h2><p className="reader-dek">{selectedArticle.dek}</p><div className="reader-byline"><span>BL</span><strong>Redacción Blockchain LATAM<small>12 AGO 2026 · BOGOTÁ</small></strong></div><p>El uso de activos digitales en América Latina no se explica solamente por especulación. Se explica por remesas, comercio exterior y la necesidad de liquidar trabajo remoto sin perder días en el sistema financiero.</p><p>Un dólar digital puede ser una infraestructura cotidiana cuando el problema no es el rendimiento, sino el acceso y el tiempo de espera. Lo que falta es la capa aburrida: rampas confiables, cumplimiento predecible y custodia que no dependa de una sola persona.</p><blockquote>«El dólar digital no compite con el peso. Compite con el tiempo de espera del banco.»</blockquote><button className="button button--dark" type="button" onClick={() => { toggleSaved(selectedArticle.id); setSelectedArticle(null) }}>{savedArticles.includes(selectedArticle.id) ? 'Quitar de guardados' : 'Guardar lectura'} <ArrowUpRight /></button></article></div>}
    </div>
  )
}

export default App
