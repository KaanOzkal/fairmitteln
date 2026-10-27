import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  ShieldCheck, Globe2, Truck, Settings, Briefcase, FileText, ArrowRight,
  ChevronDown, Users, Clock, TrendingUp, HeartPulse, Hammer, Cog,
  CheckCircle2, Eye, Zap, UserCheck
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

/* ---------- Metinler (DE / TR / EN) ---------- */
const pageTexts = {
  de: {
    badge: "Fachkräfte aus der Türkei & Usbekistan",
    heroTitle: "Die Kraft guter Beratung",
    heroDesc: "Wir begleiten qualifizierte Fachkräfte von der Suche bis zum ersten Arbeitstag in Ihrem Unternehmen: rechtssicher, schnell und persönlich.",
    heroBtn: "Anfrage starten", heroBtn2: "Unsere Leistungen",
    trust: ["Verfahren nach § 81a", "B1/B2 zertifiziert", "BKF-Anerkennung"],
    card: { title: "Ihr Kandidat unterwegs", rows: ["Zeugnisse anerkannt", "Visum genehmigt", "Sprachniveau B2", "Arbeitsvertrag unterzeichnet"] },
    cities: ["Istanbul", "Ankara", "İzmir", "Taschkent", "Samarkand", "Frankfurt", "Hamburg", "München"],
    statLabels: ["Erfolgreiche Vermittlungen", "Monate bis Arbeitsbeginn", "Visa-Erfolgsquote"],
    indTitle: "Branchen, in denen wir vermitteln",
    indDesc: "Unsere Netzwerke vor Ort sind auf die Berufe ausgerichtet, die in Deutschland am dringendsten gesucht werden.",
    industries: [
      { t: "Logistik & Transport", d: "LKW-Fahrer mit BKF-Anerkennung, Lagerlogistiker und Disponenten." },
      { t: "Pflege & Gesundheit", d: "Pflegefachkräfte und Assistenzberufe für Kliniken und Pflegeeinrichtungen." },
      { t: "Handwerk & Bau", d: "Elektriker, Schweißer, Maurer und weitere Fachhandwerker." },
      { t: "Technik & Industrie", d: "Mechatroniker, CNC-Fachkräfte und Servicetechniker." }
    ],
    routeTitle: "Vom Heimatland bis zu Ihrem Standort",
    routeDesc: "Jede Station ist ein Teil des Wegs, den wir für Sie übernehmen.",
    services: [
      { title: "Gezielte Fachkräfte-Rekrutierung", desc: "Wir finden Top-Talente in Logistik, Pflege und Handwerk über unser etabliertes Netzwerk vor Ort." },
      { title: "Visa & Behördenmanagement", desc: "Wir übernehmen das beschleunigte Fachkräfteverfahren (81a), die Anerkennung von Zeugnissen und den Visa-Prozess." },
      { title: "Intensive Sprachvorbereitung", desc: "Zertifizierte B1/B2-Sprachkurse und interkulturelles Training im Heimatland, noch vor der Einreise." },
      { title: "100% rechtliche Sicherheit", desc: "Rechtskonforme Prozesse, transparente Arbeitsverträge und Einhaltung des deutschen Arbeitsrechts." },
      { title: "Spezialisierte Branchen", desc: "Erfahrung in der Vermittlung von LKW-Fahrern (inkl. BKF-Anerkennung), Pflegekräften und technischen Berufen." },
      { title: "Onboarding & Integration", desc: "Wir helfen bei Wohnungssuche und Behördengängen und begleiten die Eingliederung in Ihr Team." }
    ],
    procTitle: "In fünf Schritten zur neuen Fachkraft",
    steps: [
      { t: "Bedarfsanalyse", d: "Wir klären Profil, Anzahl und Startzeitpunkt." },
      { t: "Kandidatenauswahl", d: "Vorauswahl und Interviews vor Ort. Sie entscheiden." },
      { t: "Anerkennung & Visum", d: "Verfahren nach § 81a, Zeugnisse und Visum." },
      { t: "Sprache & Vorbereitung", d: "B1/B2-Kurse und interkulturelles Training." },
      { t: "Ankunft & Onboarding", d: "Wohnung, Behörden und der erste Arbeitstag." }
    ],
    whyTitle: "Warum Unternehmen mit uns arbeiten",
    whyDesc: "Wir verbinden lokale Präsenz in den Herkunftsländern mit Erfahrung im deutschen Arbeits- und Aufenthaltsrecht.",
    why: [
      { t: "Rechtssicher", d: "Alle Verträge und Verfahren entsprechen dem deutschen Arbeitsrecht." },
      { t: "Transparent", d: "Feste B2B-Pakete ohne versteckte Kosten." },
      { t: "Schnell", d: "Beschleunigtes Verfahren: Arbeitsbeginn in 3 bis 5 Monaten." },
      { t: "Persönlich", d: "Ein fester Ansprechpartner von der Anfrage bis zur Integration." }
    ],
    faqTitle: "Häufig gestellte Fragen",
    faqs: [
      { q: "Wie lange dauert der gesamte Vermittlungsprozess?", a: "Dank des beschleunigten Fachkräfteverfahrens (81a) dauert der Weg von der Vertragsunterschrift bis zum Arbeitsbeginn in Deutschland in der Regel 3 bis 5 Monate." },
      { q: "Wo werden Kandidaten entsprechend Ihren Anforderungen gesucht?", a: "Je nach Bedarf und Branche des Arbeitgebers suchen wir in den passenden Regionen über unsere lokalen Netzwerke." },
      { q: "Wer trägt die Kosten für Visa und Sprachkurse?", a: "Wir bieten transparente B2B-Pakete. In der Regel übernimmt der Arbeitgeber die Vermittlungsgebühr, wir organisieren Kurse und Behördenprozesse." }
    ],
    ctaTitle: "Bereit für qualifizierte Fachkräfte?",
    ctaDesc: "Lassen Sie uns gemeinsam Ihren Personalbedarf decken.",
    ctaBtn: "Jetzt Anfrage starten"
  },
  tr: {
    badge: "Türkiye ve Özbekistan'dan nitelikli uzmanlar",
    heroTitle: "İyi danışmanlığın gücü",
    heroDesc: "Nitelikli uzmanlara arama sürecinden şirketinizdeki ilk iş gününe kadar eşlik ediyoruz: hukuka uygun, hızlı ve kişisel.",
    heroBtn: "Talep oluşturun", heroBtn2: "Hizmetlerimiz",
    trust: ["§ 81a prosedürü", "B1/B2 sertifikalı", "Mesleki yeterlilik tanıma"],
    card: { title: "Adayınız yolda", rows: ["Diploma denkliği onaylandı", "Vize onaylandı", "B2 dil seviyesi", "İş sözleşmesi imzalandı"] },
    cities: ["İstanbul", "Ankara", "İzmir", "Taşkent", "Semerkant", "Frankfurt", "Hamburg", "Münih"],
    statLabels: ["Başarılı yerleştirme", "Ayda işe başlama", "Vize başarı oranı"],
    indTitle: "Yerleştirme yaptığımız sektörler",
    indDesc: "Yerel ağlarımız, Almanya'da en çok aranan mesleklere odaklanıyor.",
    industries: [
      { t: "Lojistik ve taşımacılık", d: "Mesleki yeterliliği tanınmış TIR şoförleri, depo lojistik uzmanları ve dispeçerler." },
      { t: "Sağlık ve bakım", d: "Klinikler ve bakım kurumları için hemşireler ve yardımcı sağlık meslekleri." },
      { t: "Zanaat ve inşaat", d: "Elektrikçi, kaynakçı, duvar ustası ve diğer nitelikli ustalar." },
      { t: "Teknik ve sanayi", d: "Mekatronik teknisyenleri, CNC operatörleri ve servis teknisyenleri." }
    ],
    routeTitle: "Ülkesinden sizin lokasyonunuza",
    routeDesc: "Her durak, sizin adınıza üstlendiğimiz yolun bir parçası.",
    services: [
      { title: "Hedefli uzman işe alımı", desc: "Yerel ağımız sayesinde lojistik, sağlık ve zanaat sektörlerinde en iyi yetenekleri buluyoruz." },
      { title: "Vize ve bürokrasi yönetimi", desc: "Hızlandırılmış uzman prosedürü (81a), diploma denkliği ve vize süreçlerini baştan sona üstleniyoruz." },
      { title: "Yoğun dil hazırlığı", desc: "Almanya'ya gelmeden önce kendi ülkesinde sertifikalı B1/B2 dil kursları ve kültürlerarası eğitim." },
      { title: "%100 hukuki güvenlik", desc: "Hukuka uygun süreçler, şeffaf iş sözleşmeleri ve Alman iş hukukuna tam uyum." },
      { title: "Uzmanlaşmış sektörler", desc: "Kamyon şoförleri (mesleki yeterlilik tanınması dahil), hemşireler ve teknik meslekler için deneyim." },
      { title: "Uyum ve entegrasyon", desc: "Ev arama, resmi işlemler ve ekibinize sorunsuz uyum sürecinde destek veriyoruz." }
    ],
    procTitle: "Beş adımda yeni uzmanınız",
    steps: [
      { t: "İhtiyaç analizi", d: "Profil, sayı ve başlangıç tarihini netleştiriyoruz." },
      { t: "Aday seçimi", d: "Yerinde ön eleme ve mülakatlar. Karar sizin." },
      { t: "Denklik ve vize", d: "§ 81a prosedürü, diploma ve vize işlemleri." },
      { t: "Dil ve hazırlık", d: "B1/B2 kursları ve kültürlerarası eğitim." },
      { t: "Varış ve uyum", d: "Konut, resmi işlemler ve ilk iş günü." }
    ],
    whyTitle: "Şirketler neden bizimle çalışıyor",
    whyDesc: "Kaynak ülkelerdeki yerel varlığımızı, Alman iş ve oturum hukukundaki deneyimle birleştiriyoruz.",
    why: [
      { t: "Hukuki güvenlik", d: "Tüm sözleşme ve süreçler Alman iş hukukuna uygundur." },
      { t: "Şeffaflık", d: "Gizli maliyetsiz, sabit B2B paketleri." },
      { t: "Hız", d: "Hızlandırılmış prosedür: 3 ila 5 ayda işe başlama." },
      { t: "Kişisel ilgi", d: "Talepten entegrasyona kadar tek bir sabit muhatap." }
    ],
    faqTitle: "Sıkça sorulan sorular",
    faqs: [
      { q: "Tüm yerleştirme süreci ne kadar sürer?", a: "Hızlandırılmış uzman prosedürü (81a) sayesinde sözleşme imzasından Almanya'da işe başlamaya kadar geçen süre genellikle 3 ila 5 aydır." },
      { q: "Adaylar, kriterlerime göre nerede aranır?", a: "İşverenin ihtiyacına ve sektörüne göre belirlenen bölgelerde, yerel ağlarımız üzerinden aranır." },
      { q: "Vize ve dil kursu masraflarını kim karşılıyor?", a: "Şeffaf B2B paketleri sunuyoruz. Genellikle işveren yerleştirme ücretini karşılar; kursların ve resmi süreçlerin organizasyonunu biz yönetiriz." }
    ],
    ctaTitle: "Nitelikli uzmanlar için hazır mısınız?",
    ctaDesc: "Personel ihtiyacınızı birlikte karşılayalım.",
    ctaBtn: "Hemen talep oluşturun"
  },
  en: {
    badge: "Skilled workers from Turkey & Uzbekistan",
    heroTitle: "The power of good advice",
    heroDesc: "We guide qualified professionals from the first search to their first day at your company: legally sound, fast and personal.",
    heroBtn: "Start your request", heroBtn2: "Our services",
    trust: ["Section 81a procedure", "B1/B2 certified", "Driver qualification (BKF)"],
    card: { title: "Your candidate on the way", rows: ["Credentials recognized", "Visa approved", "Language level B2", "Employment contract signed"] },
    cities: ["Istanbul", "Ankara", "İzmir", "Tashkent", "Samarkand", "Frankfurt", "Hamburg", "Munich"],
    statLabels: ["Successful placements", "Months to start work", "Visa success rate"],
    indTitle: "Industries we place in",
    indDesc: "Our local networks focus on the professions Germany needs most.",
    industries: [
      { t: "Logistics & transport", d: "Truck drivers with BKF recognition, warehouse logisticians and dispatchers." },
      { t: "Healthcare & nursing", d: "Qualified nurses and assistant roles for clinics and care facilities." },
      { t: "Trades & construction", d: "Electricians, welders, masons and other skilled tradespeople." },
      { t: "Technical & industrial", d: "Mechatronics engineers, CNC specialists and service technicians." }
    ],
    routeTitle: "From their home country to your site",
    routeDesc: "Every stop is a part of the journey we handle for you.",
    services: [
      { title: "Targeted skilled recruitment", desc: "We find top talent in logistics, healthcare and crafts through our established local networks." },
      { title: "Visa & authority management", desc: "We handle the fast-track skilled worker procedure (81a), credential recognition and the visa process." },
      { title: "Intensive language prep", desc: "Certified B1/B2 language courses and intercultural training in the home country, before arrival." },
      { title: "100% legal security", desc: "Compliant processes, transparent employment contracts and adherence to German labor law." },
      { title: "Specialized industries", desc: "Experience placing truck drivers (incl. professional driver recognition), nurses and technical professionals." },
      { title: "Onboarding & integration", desc: "We help with housing and paperwork, and support their integration into your team." }
    ],
    procTitle: "Your new professional in five steps",
    steps: [
      { t: "Needs analysis", d: "We define the profile, headcount and start date." },
      { t: "Candidate selection", d: "Pre-screening and interviews on site. You decide." },
      { t: "Recognition & visa", d: "Section 81a procedure, credentials and visa." },
      { t: "Language & preparation", d: "B1/B2 courses and intercultural training." },
      { t: "Arrival & onboarding", d: "Housing, authorities and the first working day." }
    ],
    whyTitle: "Why companies work with us",
    whyDesc: "We combine a local presence in the home countries with experience in German employment and residency law.",
    why: [
      { t: "Legally sound", d: "All contracts and procedures comply with German labor law." },
      { t: "Transparent", d: "Fixed B2B packages without hidden costs." },
      { t: "Fast", d: "Fast-track procedure: start work in 3 to 5 months." },
      { t: "Personal", d: "One dedicated contact from request to integration." }
    ],
    faqTitle: "Frequently asked questions",
    faqs: [
      { q: "How long does the entire placement process take?", a: "Thanks to the fast-track skilled worker procedure (81a), the way from contract signature to starting work in Germany usually takes 3 to 5 months." },
      { q: "Where are candidates searched for according to your criteria?", a: "Depending on the employer's needs and industry, we search the matching regions through our local networks." },
      { q: "Who covers the costs for visas and language courses?", a: "We offer transparent B2B packages. Typically the employer covers the placement fee, while we organize courses and official procedures." }
    ],
    ctaTitle: "Ready for qualified professionals?",
    ctaDesc: "Let's meet your personnel needs together.",
    ctaBtn: "Start your request"
  }
};

const SERVICE_ICONS = [Briefcase, FileText, Globe2, ShieldCheck, Truck, Settings];
const STAT_ICONS = [Users, Clock, TrendingUp];
const STATS = [{ to: 350, suffix: '+' }, { text: '3–5' }, { to: 98, suffix: '%' }];
const IND_ICONS = [Truck, HeartPulse, Hammer, Cog];
const WHY_ICONS = [ShieldCheck, Eye, Zap, UserCheck];

const clamp = (n, a = 0, b = 1) => Math.min(b, Math.max(a, n));

/* ---------- Kamyon (SVG) ---------- */
const TruckArt = ({ className = '' }) => (
  <svg viewBox="0 0 220 90" className={className} fill="none" aria-hidden="true">
    <rect x="0" y="8" width="140" height="56" rx="4" fill="#043873" />
    <rect x="0" y="40" width="140" height="8" fill="#FFE492" />
    <rect x="14" y="20" width="44" height="6" rx="3" fill="#ffffff" opacity=".35" />
    <path d="M146 24h34l22 22v18h-56z" fill="#FFE492" />
    <path d="M160 31h17l13 14h-30z" fill="#0f1b2d" opacity=".85" />
    <rect x="0" y="64" width="202" height="6" fill="#0f1b2d" />
    {[34, 62, 168].map((cx) => (
      <g key={cx} className="wheel" style={{ transformOrigin: `${cx}px 72px` }}>
        <circle cx={cx} cy="72" r="13" fill="#0f1b2d" />
        <circle cx={cx} cy="72" r="5" fill="#cbd5e1" />
        <rect x={cx - 1.5} y="60" width="3" height="8" fill="#cbd5e1" />
      </g>
    ))}
  </svg>
);

/* ---------- Ekrana girince beliren blok ---------- */
const Reveal = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setOn(true); io.disconnect(); }
    }, { threshold: 0.15 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${on ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* ---------- Sayaç ---------- */
const Counter = ({ to, suffix = '', run }) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf, start;
    const tick = (t) => {
      start = start ?? t;
      const p = clamp((t - start) / 1800);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return <>{n}{suffix}</>;
};

const Leistungen = () => {
  const { i18n } = useTranslation();
  const lang = (i18n.language || 'de').slice(0, 2);
  const t = pageTexts[lang] || pageTexts.de;

  const heroRef = useRef(null);
  const routeRef = useRef(null);
  const stopRefs = useRef([]);
  const procRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);
  const [reached, setReached] = useState(-1);
  const [statsOn, setStatsOn] = useState(false);
  const [procOn, setProcOn] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      if (heroRef.current) {
        const r = heroRef.current.getBoundingClientRect();
        heroRef.current.style.setProperty('--hp', clamp(-r.top / r.height).toFixed(4));
      }
      if (routeRef.current) {
        const r = routeRef.current.getBoundingClientRect();
        const p = clamp((vh * 0.55 - r.top) / r.height);
        routeRef.current.style.setProperty('--rp', p.toFixed(4));
        const truckY = r.top + p * r.height;
        let count = -1;
        stopRefs.current.forEach((el, i) => {
          if (!el) return;
          const b = el.getBoundingClientRect();
          if (b.top + b.height / 2 <= truckY) count = i;
        });
        setReached((prev) => (prev === count ? prev : count));
      }
      if (ctaRef.current) {
        const r = ctaRef.current.getBoundingClientRect();
        ctaRef.current.style.setProperty('--cp', clamp((vh - r.top) / (vh * 0.9)).toFixed(4));
      }
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const mk = (ref, set, th) => {
      const io = new IntersectionObserver(([e]) => e.isIntersecting && set(true), { threshold: th });
      if (ref.current) io.observe(ref.current);
      return io;
    };
    const a = mk(statsRef, setStatsOn, 0.35);
    const b = mk(procRef, setProcOn, 0.3);
    return () => { a.disconnect(); b.disconnect(); };
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f6f9] flex flex-col overflow-x-clip leistungen-page">
      <Navbar />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&display=swap');
        .leistungen-page { font-family: 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif; }
        .wheel { transform-box: view-box; }
        .hero-truck .wheel { transform: rotate(calc(var(--hp, 0) * 2400deg)); }
        .cta-truck .wheel { transform: rotate(calc(var(--cp, 0) * 1800deg)); }
        .road-dash {
          background-image: repeating-linear-gradient(90deg, #FFE492 0 36px, transparent 36px 72px);
          background-position-x: calc(var(--hp, 0) * -900px);
        }
        .route-dash { background-image: repeating-linear-gradient(180deg, #FFE492 0 14px, transparent 14px 28px); }
        @keyframes marquee { to { transform: translateX(-50%); } }
        .marquee { animation: marquee 38s linear infinite; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: none; } }
        .in { opacity: 0; animation: fadeUp .8s cubic-bezier(.16,1,.3,1) forwards; }
        @keyframes floaty { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .floaty { animation: floaty 5s ease-in-out infinite; }
        .floaty-b { animation: floaty 6s ease-in-out -2s infinite; }
        @keyframes tick { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: none; } }
        .tick { opacity: 0; animation: tick .5s ease-out forwards; }
        @keyframes travel { 0% { left: 0; } 100% { left: calc(100% - 14px); } }
        .travel { animation: travel 4.5s ease-in-out infinite alternate; }
        @keyframes ring { 0% { box-shadow: 0 0 0 0 rgba(255,228,146,.7); } 100% { box-shadow: 0 0 0 14px rgba(255,228,146,0); } }
        .ring { animation: ring 1.8s ease-out infinite; }
        @keyframes grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .btn-shine { position: relative; overflow: hidden; }
        .btn-shine::after { content: ''; position: absolute; inset: 0; transform: translateX(-120%) skewX(-20deg);
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.35), transparent); transition: transform .8s; }
        .btn-shine:hover::after { transform: translateX(120%) skewX(-20deg); }
        @media (prefers-reduced-motion: reduce) {
          .marquee, .floaty, .floaty-b, .travel, .ring { animation: none; }
          .in, .tick { animation-duration: .01ms; }
          .leistungen-page * { transition-duration: .01ms !important; }
        }
      `}</style>

      <main className="flex-grow pt-20">

        {/* ============ HERO ============ */}
        <section ref={heroRef} className="relative min-h-[720px] bg-[#f4f6f9] overflow-hidden" style={{ '--hp': 0 }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: 'linear-gradient(rgba(4,56,115,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(4,56,115,.05) 1px, transparent 1px)', backgroundSize: '56px 56px' }} />

          {/* uzak katman: konteyner yığınları */}
          <div className="absolute bottom-[110px] left-0 flex items-end gap-3 will-change-transform opacity-80"
            style={{ transform: 'translateX(calc(var(--hp) * -320px))' }} aria-hidden="true">
            {[...Array(16)].map((_, i) => {
              const colors = ['#043873', '#4F9CF9', '#0f1b2d', '#FFE492', '#6b7f99'];
              return (
                <div key={i} className="flex flex-col gap-1">
                  {[...Array(1 + (i * 7) % 3)].map((__, j) => (
                    <div key={j} className="h-10 w-24 rounded-[3px]"
                      style={{ background: colors[(i * 3 + j) % colors.length], backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,.14) 0 2px, transparent 2px 9px)' }} />
                  ))}
                </div>
              );
            })}
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 md:pt-20 pb-[250px] grid lg:grid-cols-[1.15fr_.85fr] gap-12 items-center">
            <div>
              <div className="in inline-flex items-center gap-2 rounded-full border border-[#043873]/15 bg-white px-4 py-2 text-sm font-semibold text-[#043873]" style={{ animationDelay: '.05s' }}>
                <span className="h-2 w-2 rounded-full bg-[#FFE492] ring" /> {t.badge}
              </div>
              <h1 className="in mt-6 text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#0f1b2d] leading-[1.03] tracking-tight" style={{ animationDelay: '.15s' }}>
                {t.heroTitle}
              </h1>
              <p className="in mt-6 text-lg md:text-xl text-[#0f1b2d]/65 max-w-xl leading-relaxed" style={{ animationDelay: '.3s' }}>
                {t.heroDesc}
              </p>
              <div className="in mt-9 flex flex-wrap gap-4" style={{ animationDelay: '.45s' }}>
                <Link to="/anfrage" className="btn-shine inline-flex items-center rounded-full bg-[#043873] px-8 py-4 font-semibold text-white transition-all hover:bg-[#0a4a94] hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F9CF9]">
                  {t.heroBtn} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <a href="#leistungen" className="inline-flex items-center rounded-full border border-[#043873]/25 bg-white px-8 py-4 font-semibold text-[#043873] transition-all hover:border-[#043873] hover:-translate-y-0.5">
                  {t.heroBtn2}
                </a>
              </div>
              <ul className="in mt-10 flex flex-wrap gap-x-7 gap-y-3" style={{ animationDelay: '.6s' }}>
                {t.trust.map((x) => (
                  <li key={x} className="flex items-center gap-2 text-sm font-semibold text-[#0f1b2d]/75">
                    <CheckCircle2 className="h-5 w-5 text-[#043873]" /> {x}
                  </li>
                ))}
              </ul>
            </div>

            {/* Sağ: canlı süreç kartı */}
            <div className="relative hidden lg:block in" style={{ animationDelay: '.5s' }}>
              <div className="floaty rounded-2xl border border-[#0f1b2d]/10 bg-white p-7 shadow-[0_24px_60px_rgba(4,56,115,.14)]">
                <div className="flex items-center justify-between text-sm font-semibold text-[#0f1b2d]">
                  <span>{t.card.title}</span>
                  <span className="rounded-full bg-[#FFE492] px-3 py-1 text-xs text-[#0f1b2d]">81a</span>
                </div>
                <div className="mt-6 flex items-center gap-3 text-sm font-semibold text-[#043873]">
                  <span>{t.cities[0]}</span>
                  <div className="relative h-[3px] flex-1 rounded bg-[#0f1b2d]/10">
                    <span className="travel absolute -top-[5px] h-[13px] w-[14px] rounded-full bg-[#043873]" />
                  </div>
                  <span>{t.cities[5]}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {t.card.rows.map((r, i) => (
                    <li key={r} className="tick flex items-center gap-3 rounded-lg bg-[#f4f6f9] px-4 py-3 text-sm font-medium text-[#0f1b2d]" style={{ animationDelay: `${0.9 + i * 0.35}s` }}>
                      <CheckCircle2 className="h-5 w-5 text-[#043873]" /> {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="floaty-b absolute -bottom-10 -left-10 rounded-xl bg-[#043873] px-6 py-4 text-white shadow-[0_18px_40px_rgba(4,56,115,.35)]">
                <div className="text-3xl font-extrabold leading-none">98%</div>
                <div className="mt-1 text-xs text-blue-100/80">{t.statLabels[2]}</div>
              </div>
            </div>
          </div>

          {/* yol */}
          <div className="absolute bottom-0 inset-x-0 h-[110px] bg-[#0f1b2d]">
            <div className="road-dash absolute top-1/2 inset-x-0 h-[5px] -translate-y-1/2" />
          </div>
          <div className="hero-truck absolute bottom-[78px] left-0 w-[210px] md:w-[300px] will-change-transform"
            style={{ transform: 'translateX(calc(-30vw + var(--hp) * 150vw))' }}>
            <TruckArt className="w-full h-auto drop-shadow-[0_10px_8px_rgba(15,27,45,.25)]" />
          </div>
        </section>

        {/* ============ İSTATİSTİK + ŞEHİRLER ============ */}
        <section ref={statsRef} className="bg-[#043873] text-white">
          <div className="border-b border-white/10 overflow-hidden py-4" aria-hidden="true">
            <div className="marquee flex w-max gap-4">
              {[...t.cities, ...t.cities, ...t.cities, ...t.cities].map((c, i) => (
                <span key={i} className="flex items-center gap-3 rounded-[3px] border border-white/20 bg-white/5 px-5 py-2 text-sm font-semibold whitespace-nowrap">
                  <span className="h-2 w-2 rounded-full bg-[#FFE492]" /> {c}
                </span>
              ))}
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid gap-10 md:grid-cols-3 md:divide-x md:divide-white/10">
            {STATS.map((s, i) => {
              const Icon = STAT_ICONS[i];
              return (
                <div key={i} className="flex items-center gap-5 md:justify-center">
                  <Icon className="h-10 w-10 shrink-0 text-[#FFE492]" strokeWidth={1.5} />
                  <div>
                    <div className="text-5xl font-extrabold leading-none tabular-nums">
                      {s.text ? s.text : <Counter to={s.to} suffix={s.suffix} run={statsOn} />}
                    </div>
                    <div className="mt-2 text-blue-100/80">{t.statLabels[i]}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============ BRANŞLAR ============ */}
        <section id="leistungen" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <Reveal className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0f1b2d] tracking-tight leading-tight">{t.indTitle}</h2>
            <p className="mt-4 text-lg text-[#0f1b2d]/65">{t.indDesc}</p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.industries.map((x, i) => {
              const Icon = IND_ICONS[i];
              return (
                <Reveal key={i} delay={i * 100}>
                  <div className="group h-full rounded-xl border border-[#0f1b2d]/10 bg-white p-7 border-t-4 border-t-[#043873] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(4,56,115,.12)]">
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#eef3fa] text-[#043873] transition-colors duration-300 group-hover:bg-[#043873] group-hover:text-[#FFE492]">
                      <Icon className="h-7 w-7" strokeWidth={1.6} />
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-[#0f1b2d]">{x.t}</h3>
                    <p className="mt-3 text-[#0f1b2d]/65 leading-relaxed">{x.d}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ============ ROTA (SCROLL) ============ */}
        <section className="bg-white border-y border-[#0f1b2d]/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-28">
            <Reveal className="max-w-2xl mb-16 md:mb-20">
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#0f1b2d] leading-tight tracking-tight">{t.routeTitle}</h2>
              <p className="mt-4 text-lg text-[#0f1b2d]/65">{t.routeDesc}</p>
            </Reveal>

            <div ref={routeRef} className="relative" style={{ '--rp': 0 }}>
              <div className="absolute top-0 bottom-0 left-5 md:left-1/2 w-3 -translate-x-1/2 rounded-full bg-[#0f1b2d]">
                <div className="route-dash absolute left-1/2 top-2 bottom-2 w-[3px] -translate-x-1/2 opacity-30" />
                <div className="absolute left-1/2 top-2 w-[3px] -translate-x-1/2 bg-[#FFE492]"
                  style={{ height: 'calc(var(--rp) * 100%)', maxHeight: 'calc(100% - 16px)' }} />
              </div>
              <div className="absolute left-5 md:left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 will-change-transform"
                style={{ top: 'calc(var(--rp) * 100%)' }}>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFE492] shadow-[0_6px_16px_rgba(4,56,115,.35)]">
                  <Truck className="h-6 w-6 text-[#043873] rotate-90" />
                </div>
              </div>

              <div className="space-y-12 md:space-y-16">
                {t.services.map((s, i) => {
                  const Icon = SERVICE_ICONS[i];
                  const on = i <= reached;
                  const right = i % 2 === 0;
                  return (
                    <div key={i} ref={(el) => (stopRefs.current[i] = el)} className="relative grid md:grid-cols-2">
                      <div className={`absolute left-5 md:left-1/2 top-1/2 z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 transition-all duration-500 ${on ? 'border-[#FFE492] bg-[#043873] scale-125' : 'border-[#0f1b2d] bg-white'}`} />
                      <article className={`ml-14 md:ml-0 rounded-xl border p-7 transition-all duration-700 ease-out ${right ? 'md:col-start-2 md:ml-16' : 'md:col-start-1 md:mr-16'} ${on ? 'opacity-100 translate-x-0 border-[#043873]/20 bg-[#f4f6f9] shadow-[0_12px_30px_rgba(4,56,115,.08)]' : `opacity-25 border-transparent translate-x-6 ${right ? 'md:translate-x-10' : 'md:-translate-x-10'}`}`}>
                        <div className="flex items-start gap-5">
                          <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-lg transition-colors duration-500 ${on ? 'bg-[#043873] text-[#FFE492]' : 'bg-[#dfe5ee] text-[#043873]'}`}>
                            <Icon className="h-7 w-7" strokeWidth={1.6} />
                          </div>
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-[#0f1b2d] leading-snug">{s.title}</h3>
                            <p className="mt-2 text-[#0f1b2d]/65 leading-relaxed">{s.desc}</p>
                          </div>
                        </div>
                      </article>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ============ SÜREÇ: 5 ADIM ============ */}
        <section ref={procRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <Reveal className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0f1b2d] tracking-tight leading-tight">{t.procTitle}</h2>
          </Reveal>
          <div className="relative mt-16 grid gap-10 lg:grid-cols-5 lg:gap-6">
            <div className="absolute left-0 right-0 top-6 hidden h-[3px] bg-[#0f1b2d]/10 lg:block">
              <div className="h-full origin-left bg-[#043873]" style={{ animation: procOn ? 'grow 2.2s ease-out forwards' : 'none', transform: procOn ? undefined : 'scaleX(0)' }} />
            </div>
            {t.steps.map((s, i) => (
              <div key={i} className={`relative transition-all duration-700 ${procOn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: `${i * 350}ms` }}>
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#043873] text-lg font-extrabold text-[#FFE492] ring-8 ring-[#f4f6f9]">{i + 1}</div>
                <h3 className="mt-5 text-lg font-bold text-[#0f1b2d]">{s.t}</h3>
                <p className="mt-2 text-[#0f1b2d]/65 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============ NEDEN BİZ ============ */}
        <section className="bg-[#043873] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid gap-14 lg:grid-cols-[.9fr_1.1fr] items-center">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">{t.whyTitle}</h2>
              <p className="mt-5 text-lg text-blue-100/80 max-w-md leading-relaxed">{t.whyDesc}</p>
              <Link to="/anfrage" className="btn-shine mt-9 inline-flex items-center rounded-full bg-[#FFE492] px-8 py-4 font-bold text-[#0f1b2d] transition-transform hover:-translate-y-0.5">
                {t.heroBtn} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2">
              {t.why.map((w, i) => {
                const Icon = WHY_ICONS[i];
                return (
                  <Reveal key={i} delay={i * 120}>
                    <div className="h-full rounded-xl border border-white/15 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10">
                      <Icon className="h-8 w-8 text-[#FFE492]" strokeWidth={1.6} />
                      <h3 className="mt-5 text-xl font-bold">{w.t}</h3>
                      <p className="mt-2 text-blue-100/80 leading-relaxed">{w.d}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============ SSS ============ */}
        <section className="bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <Reveal><h2 className="text-3xl md:text-4xl font-extrabold text-[#0f1b2d] mb-10 tracking-tight">{t.faqTitle}</h2></Reveal>
            <div className="divide-y divide-[#0f1b2d]/10 border-y border-[#0f1b2d]/10">
              {t.faqs.map((f, i) => {
                const open = openFaq === i;
                return (
                  <div key={i}>
                    <button onClick={() => setOpenFaq(open ? null : i)} aria-expanded={open}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4F9CF9]">
                      <span className="text-lg font-semibold text-[#0f1b2d]">{f.q}</span>
                      <ChevronDown className={`h-5 w-5 shrink-0 text-[#043873] transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`grid transition-all duration-300 ease-out ${open ? 'grid-rows-[1fr] pb-6' : 'grid-rows-[0fr]'}`}>
                      <p className="overflow-hidden text-[#0f1b2d]/65 leading-relaxed">{f.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============ CTA ============ */}
        <section ref={ctaRef} className="relative bg-[#0f1b2d] text-white overflow-hidden" style={{ '--cp': 0 }}>
          <div className="max-w-4xl mx-auto px-4 pt-24 pb-52 text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">{t.ctaTitle}</h2>
            <p className="mt-5 text-lg md:text-xl text-white/70 max-w-xl mx-auto">{t.ctaDesc}</p>
            <Link to="/anfrage" className="btn-shine group mt-10 inline-flex items-center rounded-full bg-[#FFE492] px-9 py-4 text-lg font-bold text-[#0f1b2d] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              {t.ctaBtn}
              <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="absolute bottom-0 inset-x-0 h-16 bg-black/30">
            <div className="absolute top-1/2 inset-x-0 h-[3px] -translate-y-1/2 opacity-40"
              style={{ backgroundImage: 'repeating-linear-gradient(90deg, #FFE492 0 30px, transparent 30px 60px)' }} />
          </div>
          <div className="cta-truck absolute bottom-10 left-0 w-[170px] md:w-[240px] will-change-transform"
            style={{ transform: 'translateX(calc(-25vw + var(--cp) * (50vw + 120px)))' }}>
            <TruckArt className="w-full h-auto" />
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default Leistungen;