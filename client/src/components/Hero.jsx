import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ShieldCheck, Globe2, Users, CheckCircle2, ChevronRight, MapPin, Truck, Package, Wrench, Warehouse, Settings, Plane, FileText, BadgeCheck, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FlightOverlay, FLY_MS, Journey, ScrollTicker, FX_CSS, FX_COPY, TruckProgress, RoadDivider, Receipt } from './ScrollFx';

/*
  BİLET KOPARMA + GEÇİŞ ANİMASYONLARI
  1) Sayfanın sonundaki büyük bilet (TicketCta) ve ihtiyaç kontrolündeki bilet butonu (NeedCheck):
     butona tıklayınca koçan perforaj çizgisinden KOPAR.
  2) Ardından tam ekran geçiş: 'plane' (alttan uçak), 'truck' (soldan TIR), 'stamp' (vize damgası).
  3) Animasyon bitince /anfrage formuna gidilir.
  Yeni scroll efektleri: ScrollTicker, Journey (rota), meslek şeridinde skew.
  Hareketi azalt ayarı açıksa animasyonlar atlanır, doğrudan forma gidilir.
*/

// =====================================================================
//  ÇEVİRİLER
// =====================================================================
const COPY = {
  de: {
    'hero.tag': 'Personalvermittlung für Logistik & Technik',
    'hero.t1': 'Geprüfte Fahrer',
    'hero.t2': '& Techniker aus der Türkei',
    'hero.t3': 'für Ihren Betrieb.',
    'hero.t4': 'Visum inklusive.',
    'hero.desc': 'Wir finden, prüfen und bringen qualifizierte Berufskraftfahrer, Kuriere und Techniker zu Ihnen. Rechtssicher, mit Visum und Begleitung bis zum ersten Arbeitstag.',
    'cta.request': 'Fachkräfte anfragen',
    'cta.how': "So funktioniert's",
    'badge.1': '100% Legal & Sicher',
    'badge.2': 'Direktes Netzwerk',
    'badge.3': 'Nachhaltige Integration',
    'visa': 'Visum genehmigt',
    'card.line': '{n} Jahre Erfahrung · Deutsch {lang}',
    'card.alt': 'Geprüfte Fachkraft',
    'r.cdriver': 'Berufskraftfahrer CE',
    'r.truck': 'LKW-Fahrer',
    'r.courier': 'Kurierfahrer',
    'r.tech': 'Industrietechniker',
    'r.warehouse': 'Lagermitarbeiter',
    'r.mech': 'Mechaniker',
    'f.city': 'Einsatzort (Stadt / PLZ)',
    'f.job': 'Berufsprofil',
    'f.qty': 'Anzahl Fachkräfte',
    'f.go': 'Anfrage starten',
    'stats.1': 'vermittelte Fachkräfte',
    'stats.2': 'Visumsquote',
    'stats.3': 'Partnerunternehmen',
    'stats.4': 'bis zum Arbeitsbeginn',
    'u.weeks': ' Wochen',
    'manifesto': 'Der Fachkräftemangel bremst Ihre Flotte aus. Wir finden geprüfte Fahrer und Techniker, regeln Visum und Papiere und begleiten sie bis zum ersten Arbeitstag. Rechtssicher und ohne Verwaltungsaufwand für Sie.',
    'process.title': 'Vom Bedarf zum ersten Arbeitstag in vier Schritten.',
    'process.sub': 'Sie wissen in jeder Phase, was als Nächstes passiert und was es für Sie bedeutet.',
    'process.1t': 'Bedarf melden',
    'process.1d': 'Sie schildern uns Profil, Anzahl und Einsatzort. Wir klären offene Fragen in einem kurzen Gespräch.',
    'process.2t': 'Vorauswahl erhalten',
    'process.2d': 'Innerhalb von 48 Stunden erhalten Sie geprüfte Profile. Sie wählen aus und führen Ihre Gespräche.',
    'process.3t': 'Visum & Papiere',
    'process.3d': 'Wir übernehmen Behördengänge, Unterlagen und Termine. Ihr Verwaltungsaufwand bleibt minimal.',
    'process.4t': 'Arbeitsbeginn',
    'process.4d': 'Anreise, Empfang und die ersten Wochen begleiten wir, damit Ihre neue Fachkraft sicher startet.',
    'process.done': 'Startklar',
    'vet.title': 'Das prüfen wir, bevor wir Ihnen jemanden vorstellen.',
    'vet.1t': 'Führerschein & Qualifikation',
    'vet.1d': 'Klasse C/CE und Berufskraftfahrer-Qualifikation werden anhand der Dokumente geprüft.',
    'vet.2t': 'Berufserfahrung',
    'vet.2d': 'Nachweise und Referenzen früherer Arbeitgeber werden eingeholt und abgeglichen.',
    'vet.3t': 'Deutschkenntnisse',
    'vet.3d': 'Wir schätzen das Sprachniveau im Gespräch ein und nennen es Ihnen offen im Profil.',
    'vet.4t': 'Persönliche Eignung',
    'vet.4d': 'Zuverlässigkeit und Führungszeugnis gehören zur Vorprüfung, bevor wir Ihnen jemanden vorstellen.',
    'vet.5t': 'Rechtliche Voraussetzungen',
    'vet.5d': 'Wir prüfen vorab, ob Anerkennung und Visum realistisch sind. Sie planen nur mit machbaren Kandidaten.',
    'vet.6t': 'Fachgespräch',
    'vet.6d': 'Praxisnahe Fragen zu Fahrzeug, Ladung beziehungsweise Technik zeigen, was jemand wirklich kann.',
    'check.title': 'Ihr Bedarf in 30 Sekunden eingeordnet.',
    'check.q1': 'Wen suchen Sie?',
    'check.q2': 'Wie viele Fachkräfte?',
    'check.q3': 'Wann sollen sie starten?',
    'q.over10': 'über 10',
    'st.1': 'So früh wie möglich',
    'st.2': 'In 3 Monaten',
    'st.3': 'Flexibel',
    'check.badge': 'Machbar',
    'check.res': 'Für Ihren Bedarf planen wir etwa {weeks} Wochen bis zum Arbeitsbeginn.',
    'check.first': 'Erste Profile innerhalb von 48 Stunden.',
    'check.asap': 'Wir prüfen vorab, ob ein früherer Start möglich ist.',
    'check.empty': 'Beantworten Sie die drei Fragen, dann sehen Sie hier Ihre grobe Zeitplanung.',
    'check.note': 'Unverbindliche Einschätzung. Den genauen Zeitplan nennen wir nach Ihrer Anfrage.',
    'flight.sr': 'Sie werden zum Anfrageformular weitergeleitet.',
    'faq.title': 'Häufige Fragen von Arbeitgebern',
    'faq.q1': 'Ist das Verfahren rechtssicher?',
    'faq.a1': 'Ja. Wir arbeiten ausschließlich über offizielle Wege und mit dem vorgesehenen Visumverfahren. Alle Schritte sind für Sie nachvollziehbar dokumentiert.',
    'faq.q2': 'Welche Kosten entstehen für uns?',
    'faq.a2': 'Die Anfrage und die erste Einschätzung sind kostenlos. Welche Leistungen was kosten, legen wir Ihnen vor Beginn schriftlich dar.',
    'faq.q3': 'Was übernehmen Sie, was bleibt bei uns?',
    'faq.a3': 'Suche, Vorprüfung, Visum und Begleitung der Anreise übernehmen wir. Bei Ihnen bleiben Vorstellungsgespräch, Arbeitsvertrag und die fachliche Einarbeitung.',
    'faq.q4': 'Wie lange dauert es bis zum Arbeitsbeginn?',
    'faq.a4': 'Im Durchschnitt etwa 12 Wochen. Vollständige Unterlagen und Behördentermine können den Zeitraum verkürzen oder verlängern.',
    'faq.q5': 'Was passiert, wenn es nicht passt?',
    'faq.a5': 'Das besprechen wir vorab transparent, damit Sie wissen, wie wir in diesem Fall vorgehen.',
    'end.p1': 'Unverbindliche Anfrage',
    'end.p2': 'Erste Rückmeldung in 48 Stunden',
    'end.p3': 'Rechtssichere Abwicklung',
    'end.title': 'Ihre nächste Fachkraft kann schon in wenigen Wochen starten.',
    'end.sub': 'Schildern Sie uns Ihren Bedarf, wir melden uns zeitnah.',
  },

  tr: {
    'hero.tag': 'Lojistik ve teknik alanda personel temini',
    'hero.t1': 'Doğrulanmış sürücüler',
    'hero.t2': "ve teknisyenler Türkiye'den",
    'hero.t3': 'işletmeniz için.',
    'hero.t4': 'Vize dahil.',
    'hero.desc': 'Nitelikli tır şoförü, kurye ve teknik personeli sizin için buluyor, doğruluyor ve getiriyoruz. Yasal yoldan, vize dahil ve ilk iş gününe kadar yanınızda.',
    'cta.request': 'Personel talep edin',
    'cta.how': 'Nasıl işliyor?',
    'badge.1': '%100 yasal ve güvenli',
    'badge.2': 'Doğrudan ağ',
    'badge.3': 'Kalıcı entegrasyon',
    'visa': 'Vize onaylı',
    'card.line': '{n} yıl deneyim · Almanca {lang}',
    'card.alt': 'Doğrulanmış personel',
    'r.cdriver': 'Profesyonel Tır Şoförü (CE)',
    'r.truck': 'Kamyon Şoförü',
    'r.courier': 'Kurye',
    'r.tech': 'Sanayi Teknisyeni',
    'r.warehouse': 'Depo Görevlisi',
    'r.mech': 'Mekanik Teknisyeni',
    'f.city': 'Çalışma yeri (şehir / posta kodu)',
    'f.job': 'Meslek profili',
    'f.qty': 'Personel sayısı',
    'f.go': 'Talebi başlat',
    'stats.1': 'yerleştirilen personel',
    'stats.2': 'vize onay oranı',
    'stats.3': 'iş ortağı şirket',
    'stats.4': 'işe başlamaya kadar',
    'u.weeks': ' hafta',
    'manifesto': 'Personel eksikliği filonuzu yavaşlatıyor. Biz doğrulanmış sürücü ve teknisyenleri buluyor, vize ve evrak işlerini hallediyor, ilk iş gününe kadar onlara eşlik ediyoruz. Yasal yoldan ve size idari yük bırakmadan.',
    'process.title': 'İhtiyaçtan ilk iş gününe dört adımda.',
    'process.sub': 'Her aşamada sırada ne olduğunu ve sizin için ne anlama geldiğini bilirsiniz.',
    'process.1t': 'İhtiyacı bildirin',
    'process.1d': 'Profili, sayıyı ve çalışma yerini bize anlatırsınız. Açık noktaları kısa bir görüşmede netleştiririz.',
    'process.2t': 'Ön seçimi alın',
    'process.2d': '48 saat içinde doğrulanmış profilleri alırsınız. Seçimi ve mülakatları siz yaparsınız.',
    'process.3t': 'Vize ve evrak',
    'process.3d': 'Resmi işlemleri, belgeleri ve randevuları biz yürütürüz. İdari yükünüz minimumda kalır.',
    'process.4t': 'İşe başlangıç',
    'process.4d': 'Yolculuğu, karşılamayı ve ilk haftaları biz takip ederiz; yeni personeliniz güvenle başlar.',
    'process.done': 'Hazır',
    'vet.title': 'Size birini sunmadan önce bunları kontrol ediyoruz.',
    'vet.1t': 'Ehliyet ve yeterlilik',
    'vet.1d': 'C/CE sınıfı ve mesleki sürücü yeterliliği belgelerle doğrulanır.',
    'vet.2t': 'Mesleki deneyim',
    'vet.2d': 'Önceki işverenlerden belge ve referanslar alınır, birbiriyle karşılaştırılır.',
    'vet.3t': 'Almanca seviyesi',
    'vet.3d': 'Dil seviyesini görüşmede değerlendirir ve profilde size açıkça belirtiriz.',
    'vet.4t': 'Kişisel uygunluk',
    'vet.4d': 'Güvenilirlik ve sabıka kaydı, size birini sunmadan önceki ön kontrolün parçasıdır.',
    'vet.5t': 'Yasal şartlar',
    'vet.5d': 'Denklik ve vizenin gerçekçi olup olmadığını baştan kontrol ederiz. Yalnızca uygulanabilir adaylarla plan yaparsınız.',
    'vet.6t': 'Teknik görüşme',
    'vet.6d': 'Araç, yük veya teknik konulardaki pratik sorular kişinin gerçekte neyi bildiğini gösterir.',
    'check.title': 'İhtiyacınız 30 saniyede netleşsin.',
    'check.q1': 'Kimi arıyorsunuz?',
    'check.q2': 'Kaç personel?',
    'check.q3': 'Ne zaman başlamalı?',
    'q.over10': '10 üzeri',
    'st.1': 'En kısa sürede',
    'st.2': '3 ay içinde',
    'st.3': 'Esnek',
    'check.badge': 'Uygun',
    'check.res': 'İhtiyacınız için işe başlamaya kadar yaklaşık {weeks} hafta planlıyoruz.',
    'check.first': 'İlk profiller 48 saat içinde.',
    'check.asap': 'Daha erken başlangıcın mümkün olup olmadığını baştan kontrol ederiz.',
    'check.empty': 'Üç soruyu yanıtlayın, kabaca zaman planınız burada görünsün.',
    'check.note': 'Bağlayıcı olmayan bir tahmindir. Kesin takvimi talebinizden sonra bildiririz.',
    'flight.sr': 'Talep formuna yönlendiriliyorsunuz.',
    'faq.title': 'İşverenlerden sık gelen sorular',
    'faq.q1': 'Süreç yasal mı?',
    'faq.a1': 'Evet. Yalnızca resmi yollarla ve öngörülen vize prosedürüyle çalışırız. Tüm adımlar sizin için izlenebilir şekilde belgelenir.',
    'faq.q2': 'Bize maliyeti ne olur?',
    'faq.a2': 'Talep ve ilk değerlendirme ücretsizdir. Hangi hizmetin ne kadar olduğunu başlamadan önce yazılı olarak paylaşırız.',
    'faq.q3': 'Siz neleri üstleniyorsunuz, bizde neler kalıyor?',
    'faq.a3': 'Arama, ön kontrol, vize ve yolculuğun takibini biz üstleniriz. Mülakat, iş sözleşmesi ve mesleki uyum eğitimi sizde kalır.',
    'faq.q4': 'İşe başlamaya kadar ne kadar sürer?',
    'faq.a4': 'Ortalama yaklaşık 12 hafta. Eksiksiz evrak ve resmi randevular bu süreyi kısaltabilir ya da uzatabilir.',
    'faq.q5': 'Uyum sağlanmazsa ne olur?',
    'faq.a5': 'Bu durumda nasıl ilerleyeceğimizi baştan şeffaf biçimde konuşuruz.',
    'end.p1': 'Bağlayıcı olmayan talep',
    'end.p2': '48 saat içinde ilk geri dönüş',
    'end.p3': 'Yasal süreç yönetimi',
    'end.title': 'Bir sonraki personeliniz birkaç hafta içinde başlayabilir.',
    'end.sub': 'İhtiyacınızı bize anlatın, kısa sürede dönelim.',
  },

  en: {
    'hero.tag': 'Staffing for logistics & technical trades',
    'hero.t1': 'Vetted drivers',
    'hero.t2': '& technicians from Turkey',
    'hero.t3': 'for your business.',
    'hero.t4': 'Visa included.',
    'hero.desc': 'We find, vet and bring qualified professional drivers, couriers and technicians to you. Legally compliant, visa included, with support up to their first day of work.',
    'cta.request': 'Request staff',
    'cta.how': 'How it works',
    'badge.1': '100% Legal & Safe',
    'badge.2': 'Direct network',
    'badge.3': 'Lasting integration',
    'visa': 'Visa approved',
    'card.line': '{n} years experience · German {lang}',
    'card.alt': 'Vetted professional',
    'r.cdriver': 'Professional Driver (CE)',
    'r.truck': 'Truck Driver',
    'r.courier': 'Courier Driver',
    'r.tech': 'Industrial Technician',
    'r.warehouse': 'Warehouse Operative',
    'r.mech': 'Mechanic',
    'f.city': 'Work location (city / postcode)',
    'f.job': 'Job profile',
    'f.qty': 'Number of staff',
    'f.go': 'Start request',
    'stats.1': 'professionals placed',
    'stats.2': 'visa success rate',
    'stats.3': 'partner companies',
    'stats.4': 'until start of work',
    'u.weeks': ' weeks',
    'manifesto': 'The skills shortage is slowing your fleet down. We find vetted drivers and technicians, handle visas and paperwork, and support them until their first day of work. Legally compliant and without administrative burden for you.',
    'process.title': 'From your need to the first day of work in four steps.',
    'process.sub': 'In every phase you know what happens next and what it means for you.',
    'process.1t': 'Report your need',
    'process.1d': 'You tell us the profile, number and work location. We clarify open questions in a short call.',
    'process.2t': 'Receive a shortlist',
    'process.2d': 'Within 48 hours you receive vetted profiles. You choose and hold your own interviews.',
    'process.3t': 'Visa & paperwork',
    'process.3d': 'We take care of authority visits, documents and appointments. Your administrative effort stays minimal.',
    'process.4t': 'Start of work',
    'process.4d': 'We support the journey, the welcome and the first weeks so your new team member starts safely.',
    'process.done': 'Ready',
    'vet.title': 'This is what we check before we introduce anyone to you.',
    'vet.1t': "Driver's licence & qualification",
    'vet.1d': 'Category C/CE and professional driver qualification are verified against documents.',
    'vet.2t': 'Work experience',
    'vet.2d': 'Proof and references from previous employers are collected and cross-checked.',
    'vet.3t': 'German language skills',
    'vet.3d': 'We assess the language level in an interview and state it openly in the profile.',
    'vet.4t': 'Personal suitability',
    'vet.4d': 'Reliability and a police clearance certificate are part of our pre-screening before we introduce anyone.',
    'vet.5t': 'Legal requirements',
    'vet.5d': 'We check upfront whether recognition and visa are realistic, so you only plan with feasible candidates.',
    'vet.6t': 'Technical interview',
    'vet.6d': 'Practical questions on vehicles, cargo or technical work show what someone can really do.',
    'check.title': 'Your need, sized up in 30 seconds.',
    'check.q1': 'Who are you looking for?',
    'check.q2': 'How many professionals?',
    'check.q3': 'When should they start?',
    'q.over10': 'over 10',
    'st.1': 'As soon as possible',
    'st.2': 'In 3 months',
    'st.3': 'Flexible',
    'check.badge': 'Feasible',
    'check.res': 'For your need we plan roughly {weeks} weeks until start of work.',
    'check.first': 'First profiles within 48 hours.',
    'check.asap': 'We will check upfront whether an earlier start is possible.',
    'check.empty': 'Answer the three questions and your rough timeline will appear here.',
    'check.note': 'Non-binding estimate. We give the exact schedule after your request.',
    'flight.sr': 'You are being taken to the request form.',
    'faq.title': 'Frequently asked questions from employers',
    'faq.q1': 'Is the process legally compliant?',
    'faq.a1': 'Yes. We work exclusively through official channels and the prescribed visa procedure. Every step is documented transparently for you.',
    'faq.q2': 'What costs will we incur?',
    'faq.a2': 'The request and first assessment are free of charge. We set out in writing what each service costs before we begin.',
    'faq.q3': 'What do you take care of, and what stays with us?',
    'faq.a3': 'We handle sourcing, pre-screening, visa and travel support. Interviews, the employment contract and on-the-job training stay with you.',
    'faq.q4': 'How long until work begins?',
    'faq.a4': 'About 12 weeks on average. Complete documents and authority appointments can shorten or extend the time.',
    'faq.q5': "What happens if it isn't a good fit?",
    'faq.a5': 'We discuss this transparently upfront so you know how we proceed in that case.',
    'end.p1': 'Non-binding request',
    'end.p2': 'First reply within 48 hours',
    'end.p3': 'Legally compliant handling',
    'end.title': 'Your next team member could start in just a few weeks.',
    'end.sub': 'Tell us what you need and we will get back to you promptly.',
  },
};

// Yeni bölümlerin (Journey vb.) çevirilerini birleştir
Object.keys(FX_COPY).forEach((l) => Object.assign(COPY[l], FX_COPY[l]));

const SUPPORTED = ['tr', 'de', 'en'];
const NUMBER_LOCALE = { tr: 'tr-TR', de: 'de-DE', en: 'en-US' };

const useCopy = () => {
  const { i18n } = useTranslation();
  const raw = (i18n.resolvedLanguage || i18n.language || 'de').toLowerCase().slice(0, 2);
  const lng = SUPPORTED.includes(raw) ? raw : 'de';
  const t = (key, vars) => {
    let s = COPY[lng][key] ?? COPY.de[key] ?? key;
    if (vars) Object.keys(vars).forEach((k) => { s = s.split(`{${k}}`).join(vars[k]); });
    return s;
  };
  return { t, lng };
};

const clamp = (n, a = 0, b = 1) => Math.min(b, Math.max(a, n));
const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const useScrollFrame = (cb) => {
  const saved = useRef(cb);
  saved.current = cb;
  useEffect(() => {
    let raf = 0;
    const run = () => { raf = 0; saved.current(); };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(run); };
    run();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
};

const useInView = (threshold = 0.25) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { setInView(true); return; }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
};

const MaskTitle = ({ children, className = '' }) => {
  const [ref, inView] = useInView(0.5);
  return (
    <h2 ref={ref} className={className}>
      <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
        <span className={`mask-line block ${inView ? 'translate-y-0 opacity-100' : 'translate-y-[110%] opacity-0'}`}>{children}</span>
      </span>
    </h2>
  );
};

const CountUp = ({ to, prefix = '', suffix = '' }) => {
  const { lng } = useCopy();
  const [ref, inView] = useInView(0.5);
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (prefersReduced()) { setV(to); return; }
    let raf;
    const start = performance.now();
    const dur = 1800;
    const tick = (now) => {
      const p = clamp((now - start) / dur);
      setV(Math.round(to * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{prefix}{v.toLocaleString(NUMBER_LOCALE[lng])}{suffix}</span>;
};

const Stamp = ({ children, className = '' }) => (
  <span
    className={`inline-block border-2 border-[#ff4d3d] text-[#ff4d3d] rounded-md px-3 py-1 font-extrabold uppercase tracking-wide -rotate-[8deg] select-none ${className}`}
    style={{ boxShadow: 'inset 0 0 0 2px rgba(255,77,61,0.18)' }}
  >
    {children}
  </span>
);

const AnimatedBackground = ({ videoRef }) => (
  <div className="absolute inset-0 z-0 overflow-hidden bg-[#0a1224]">
    <div className="absolute inset-0 bg-[#0a1224]/30 z-10 pointer-events-none"></div>
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-[120%] object-cover z-0 opacity-[0.25] mix-blend-luminosity pointer-events-none will-change-transform"
      style={{ transformOrigin: 'center top' }}
      src="/videos/81asurec.mp4"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-[#0a1224]/30 via-transparent to-[#0a1224] z-10 pointer-events-none"></div>
    <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[90vw] h-[60vw] rounded-full bg-[#2a4a9e]/20 blur-[180px] pointer-events-none"></div>
    <div className="absolute inset-0 z-10 bg-[linear-gradient(rgba(233,237,245,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(233,237,245,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_35%,#000_20%,transparent_100%)] pointer-events-none"></div>
  </div>
);

// FlightOverlay artık ./scrollFx.jsx içinde (plane / truck / stamp varyantları)

const Numbers = () => {
  const { t } = useCopy();
  const items = [
    { to: 1200, suffix: '+', l: t('stats.1') },
    { to: 98, suffix: ' %', l: t('stats.2') },
    { to: 45, l: t('stats.3') },
    { to: 12, suffix: t('u.weeks'), l: t('stats.4') },
  ];
  return (
    <section className="vz relative z-40 w-full bg-[#0a1224] px-4 sm:px-6 pt-10 pb-20 md:pb-28">
      <dl className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 border-t border-b border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)]">
        {items.map((s, i) => (
          <div
            key={i}
            className={`group py-10 md:py-12 px-4 md:px-8 border-white/10 transition-colors hover:bg-white/[0.02] ${i % 2 === 1 ? 'border-l' : ''} lg:border-l ${i === 0 ? 'lg:border-l-0' : ''} ${i > 1 ? 'border-t lg:border-t-0' : ''}`}
          >
            <dd className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#e9edf5] tabular-nums group-hover:scale-105 group-hover:text-white transition-all duration-500 origin-left">
              <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} />
            </dd>
            <dt className="mt-3 text-sm md:text-base text-[#93a0ba] font-medium group-hover:text-[#b6c0d4] transition-colors">{s.l}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
};

const Manifesto = () => {
  const { t } = useCopy();
  const ref = useRef(null);
  const wordRefs = useRef([]);
  const words = t('manifesto').split(' ');

  useScrollFrame(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const p = prefersReduced() ? 1 : clamp((vh * 0.85 - r.top) / (r.height * 0.8));
    const n = words.length;
    wordRefs.current.forEach((w, i) => {
      if (!w) return;
      const lit = clamp(p * (n + 6) - i);
      const intensity = clamp(lit, 0, 1);

      const opacity = (0.15 + 0.85 * intensity).toFixed(3);
      const y = ((1 - intensity) * 12).toFixed(1);
      const blur = ((1 - intensity) * 6).toFixed(1);

      w.style.opacity = opacity;
      w.style.transform = `translateY(${y}px)`;
      w.style.filter = `blur(${blur}px)`;
    });
  });

  return (
    <section className="vz relative z-40 w-full bg-[#0a1224] px-4 sm:px-6 py-16 md:py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[40vw] bg-[#ff4d3d]/5 blur-[200px] pointer-events-none"></div>
      <p ref={ref} className="font-display max-w-5xl mx-auto text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] font-bold leading-[1.2] tracking-tight text-[#e9edf5]">
        {words.map((w, i) => (
          <span key={`${i}-${w}`} ref={(el) => { wordRefs.current[i] = el; }} className="inline-block mr-[0.25em] will-change-[opacity,transform,filter]" style={{ opacity: 0.15, transform: 'translateY(12px)', filter: 'blur(6px)' }}>
            {w}
          </span>
        ))}
      </p>
    </section>
  );
};

const Process = () => {
  const { t } = useCopy();
  const listRef = useRef(null);
  const fillRef = useRef(null);
  const rowRefs = useRef([]);
  const [active, setActive] = useState(0);

  const steps = [
    { icon: FileText, title: t('process.1t'), desc: t('process.1d') },
    { icon: Users, title: t('process.2t'), desc: t('process.2d') },
    { icon: BadgeCheck, title: t('process.3t'), desc: t('process.3d') },
    { icon: Plane, title: t('process.4t'), desc: t('process.4d') },
  ];

  useScrollFrame(() => {
    const list = listRef.current;
    if (!list) return;
    const vh = window.innerHeight;
    const reduce = prefersReduced();
    const r = list.getBoundingClientRect();
    const p = reduce ? 1 : clamp((vh * 0.65 - r.top) / r.height);
    if (fillRef.current) fillRef.current.style.transform = `scaleY(${p})`;

    let count = 0;
    rowRefs.current.forEach((row) => {
      if (!row) return;
      const rr = row.getBoundingClientRect();
      if (reduce || rr.top + rr.height / 2 < vh * 0.65) count += 1;
    });
    setActive(count);
  });

  return (
    <section id="ablauf" className="vz relative z-40 w-full bg-[#0a1224] px-4 sm:px-6 py-20 md:py-32 scroll-mt-24">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-24">

        <div className="lg:sticky lg:top-32 self-start">
          <MaskTitle key={t('process.title')} className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-[#e9edf5] max-w-md">
            {t('process.title')}
          </MaskTitle>
          <p className="mt-6 text-[#93a0ba] text-lg md:text-xl leading-relaxed max-w-md">
            {t('process.sub')}
          </p>
        </div>

        <ol ref={listRef} className="relative pl-9 md:pl-16">
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/10 rounded-full"></div>
          <div ref={fillRef} className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#ff4d3d] shadow-[0_0_15px_rgba(255,77,61,0.8)] origin-top rounded-full will-change-transform" style={{ transform: 'scaleY(0)' }}></div>

          {steps.map((s, i) => {
            const on = i < active;
            const last = i === steps.length - 1;
            return (
              <li
                key={i}
                ref={(el) => { rowRefs.current[i] = el; }}
                className="relative grid grid-cols-[auto_1fr_auto] gap-x-5 md:gap-x-8 items-start py-10 md:py-12 border-b border-white/10 first:pt-4 last:border-b-0"
              >
                <span
                  className={`absolute -left-9 md:-left-16 top-12 -translate-x-[5px] w-3 h-3 rounded-full border-2 transition-all duration-700 ease-out ${on ? 'bg-[#ff4d3d] border-[#ff4d3d] scale-150 shadow-[0_0_20px_rgba(255,77,61,1)]' : 'bg-[#0a1224] border-white/20'}`}
                ></span>

                <span className={`font-display text-4xl md:text-5xl font-extrabold tabular-nums w-10 md:w-12 transition-all duration-700 ease-out ${on ? 'text-[#ff4d3d] scale-110 origin-left' : 'text-[#93a0ba]/30 scale-100'}`}>{i + 1}</span>
                <div className={`transition-all duration-700 ease-out ${on ? 'opacity-100 blur-0 translate-x-2' : 'opacity-30 blur-[2px] translate-x-0'}`}>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-[#e9edf5]">{s.title}</h3>
                  <p className="mt-3 text-[#93a0ba] text-lg leading-relaxed max-w-lg">{s.desc}</p>
                </div>
                {last && active >= steps.length ? (
                  <Stamp className="stamp-slam text-sm md:text-base mt-2">{t('process.done')}</Stamp>
                ) : (
                  <s.icon className={`w-8 h-8 mt-2 transition-all duration-700 ease-out ${on ? 'text-[#e9edf5] scale-110' : 'text-[#93a0ba]/30 scale-90'}`} />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

const Vetting = () => {
  const { t } = useCopy();
  const listRef = useRef(null);
  const scanRef = useRef(null);
  const rowRefs = useRef([]);
  const [done, setDone] = useState(0);
  const items = [1, 2, 3, 4, 5, 6].map((n) => ({ title: t(`vet.${n}t`), desc: t(`vet.${n}d`) }));

  // Belge tarayıcı gibi: çizgi listede aşağı iner, geçtiği madde "kontrol edildi" olur
  useScrollFrame(() => {
    const list = listRef.current;
    if (!list) return;
    const reduce = prefersReduced();
    const line = window.innerHeight * 0.6;
    const r = list.getBoundingClientRect();
    const y = clamp(line - r.top, 0, r.height);
    if (scanRef.current) {
      scanRef.current.style.transform = `translateY(${y}px)`;
      scanRef.current.style.opacity = !reduce && line - r.top > 0 && line - r.top < r.height ? '1' : '0';
    }
    let c = 0;
    rowRefs.current.forEach((row) => {
      if (!row) return;
      const rr = row.getBoundingClientRect();
      if (reduce || rr.top + rr.height * 0.5 < line) c += 1;
    });
    setDone(c);
  });

  return (
    <section className="vz relative z-40 w-full bg-[#0a1224] px-4 sm:px-6 py-16 md:py-28 bg-[radial-gradient(ellipse_at_top_right,rgba(42,74,158,0.15),transparent_50%)]">
      <div className="max-w-6xl mx-auto">
        <MaskTitle className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-[#e9edf5] max-w-3xl">
          {t('vet.title')}
        </MaskTitle>

        <ul ref={listRef} className="relative mt-16 grid md:grid-cols-2 gap-x-12 border-t border-white/10">
          <div ref={scanRef} aria-hidden="true" className="absolute left-0 right-0 top-0 z-10 pointer-events-none transition-opacity duration-300" style={{ opacity: 0 }}>
            <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#ff4d3d]/15 to-transparent"></div>
            <div className="h-[2px] bg-[#ff4d3d] shadow-[0_0_18px_rgba(255,77,61,0.9)]"></div>
          </div>
          {items.map((it, i) => {
            const on = i < done;
            return (
              <li
                key={i}
                ref={(el) => { rowRefs.current[i] = el; }}
                className={`flex gap-6 py-8 md:py-10 border-b border-white/10 ${i % 2 === 0 ? 'md:pr-10' : 'md:pl-10 md:border-l'}`}
              >
                <span
                  className="check-pop mt-1 shrink-0 bg-white/[0.03] p-3 rounded-2xl border border-white/5"
                  style={{ color: on ? '#ff4d3d' : '#93a0ba', opacity: on ? 1 : 0.4, transform: on ? 'scale(1)' : 'scale(0.85)', borderColor: on ? 'rgba(255,77,61,0.5)' : undefined }}
                >
                  <CheckCircle2 className="w-7 h-7" />
                </span>
                <div className={`transition-opacity duration-500 ${on ? 'opacity-100' : 'opacity-40'}`}>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-[#e9edf5]">{it.title}</h3>
                  <p className="mt-2 text-[#93a0ba] text-lg leading-relaxed">{it.desc}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

const Chip = ({ selected, onClick, children }) => (
  <button
    type="button"
    aria-pressed={selected}
    onClick={onClick}
    className={`px-5 py-3 rounded-xl text-[15px] font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff4d3d] ${
      selected
        ? 'bg-[#e9edf5] text-[#0a1224] shadow-[0_0_20px_rgba(233,237,245,0.2)] scale-105'
        : 'bg-white/[0.03] text-[#b6c0d4] border border-white/10 hover:bg-white/10 hover:border-white/30 hover:text-white'
    }`}
  >
    {children}
  </button>
);

// ==========================================
// 5. İHTİYAÇ KONTROLÜ: bilet butonu (koçan kopar) + geçiş
// ==========================================
const NeedCheck = ({ onFly, variant = 'plane' }) => {
  const { t } = useCopy();
  const [job, setJob] = useState(null);
  const [qty, setQty] = useState(null);
  const [start, setStart] = useState(null);
  const [isTearing, setIsTearing] = useState(false);
  const tearTimer = useRef(null);

  useEffect(() => () => { if (tearTimer.current) clearTimeout(tearTimer.current); }, []);

  const jobs = [
    { id: 'cdriver', label: t('r.cdriver') },
    { id: 'truck', label: t('r.truck') },
    { id: 'courier', label: t('r.courier') },
    { id: 'tech', label: t('r.tech') },
    { id: 'warehouse', label: t('r.warehouse') },
  ];
  const qtys = [
    { id: '1-2', label: '1–2', weeks: '10–12' },
    { id: '3-5', label: '3–5', weeks: '12–14' },
    { id: '6-10', label: '6–10', weeks: '14–18' },
    { id: '10+', label: t('q.over10'), weeks: '18–24' },
  ];
  const starts = [
    { id: 'asap', label: t('st.1'), asap: true },
    { id: '3m', label: t('st.2'), asap: false },
    { id: 'flex', label: t('st.3'), asap: false },
  ];

  const complete = job !== null && qty !== null && start !== null;
  const href = complete
    ? `/anfrage?beruf=${jobs[job].id}&anzahl=${encodeURIComponent(qtys[qty].id)}&start=${starts[start].id}`
    : '/anfrage';

  // 1) koçan kopar  2) geçiş animasyonu  3) forma gidilir
  const handleTicketClick = () => {
    if (!complete || isTearing) return;
    if (prefersReduced()) { onFly?.(href, variant); return; }
    setIsTearing(true);
    tearTimer.current = setTimeout(() => onFly?.(href, variant), 650);
  };

  const stubColors = complete
    ? 'bg-[#ff4d3d] text-white group-hover:bg-[#e8402f] border-white/60'
    : 'bg-white/[0.04] text-[#93a0ba] border-white/10';

  return (
    <section className="vz relative z-40 w-full bg-[#0a1224] px-4 sm:px-6 py-20 md:py-32">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-12 lg:gap-20">

        <div>
          <MaskTitle className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-[#e9edf5] max-w-xl">
            {t('check.title')}
          </MaskTitle>

          <div className="mt-12 space-y-10">
            <fieldset>
              <legend className="text-base font-semibold text-[#93a0ba] mb-4 uppercase tracking-wider">{t('check.q1')}</legend>
              <div className="flex flex-wrap gap-3">
                {jobs.map((j, i) => <Chip key={j.id} selected={job === i} onClick={() => setJob(i)}>{j.label}</Chip>)}
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-base font-semibold text-[#93a0ba] mb-4 uppercase tracking-wider">{t('check.q2')}</legend>
              <div className="flex flex-wrap gap-3">
                {qtys.map((q, i) => <Chip key={q.id} selected={qty === i} onClick={() => setQty(i)}>{q.label}</Chip>)}
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-base font-semibold text-[#93a0ba] mb-4 uppercase tracking-wider">{t('check.q3')}</legend>
              <div className="flex flex-wrap gap-3">
                {starts.map((s, i) => <Chip key={s.id} selected={start === i} onClick={() => setStart(i)}>{s.label}</Chip>)}
              </div>
            </fieldset>
          </div>
        </div>

        {/* Sonuç fişi */}
        <div className="lg:sticky lg:top-32 self-start">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#111b33] to-[#0a1224] shadow-[0_30px_60px_rgba(0,0,0,0.4)] p-8 md:p-10 min-h-[340px] flex flex-col justify-between relative overflow-hidden">

            <div className={`absolute -top-20 -right-20 w-64 h-64 bg-[#ff4d3d]/10 rounded-full blur-[80px] transition-opacity duration-700 ${complete ? 'opacity-100' : 'opacity-0'}`}></div>

            <div aria-live="polite" className="relative z-10">
              {complete ? (
                <div key={`${job}-${qty}-${start}`} className="slip-in">
                  <Stamp className="text-sm md:text-base bg-[#0a1224]/50 backdrop-blur-md">{t('check.badge')}</Stamp>
                  <p className="mt-8 font-display text-2xl md:text-3xl font-extrabold leading-snug text-[#e9edf5]">
                    {t('check.res', { weeks: qtys[qty].weeks })}
                  </p>
                  <ul className="mt-6 space-y-2.5 text-base text-[#b6c0d4] font-medium">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-[#ff4d3d]" /> {jobs[job].label} · {qtys[qty].label} · {starts[start].label}</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-[#ff4d3d]" /> {t('check.first')}</li>
                    {starts[start].asap && <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-[#ff4d3d]" /> {t('check.asap')}</li>}
                  </ul>
                </div>
              ) : (
                <div className="flex flex-col justify-center h-full pt-10">
                  <p className="font-display text-2xl md:text-3xl font-bold leading-snug text-[#93a0ba]/50 text-center">
                    {t('check.empty')}
                  </p>
                </div>
              )}
            </div>

            {/* BİLET BUTONU: ana parça + koçan (perforajla ayrılır, tıklayınca kopar) */}
            <div className="mt-10 relative z-10">
              <button
                type="button"
                onClick={handleTicketClick}
                disabled={!complete || isTearing}
                className={`group flex w-full items-stretch font-bold text-lg transition-transform duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e9edf5] ${complete && !isTearing ? 'hover:-translate-y-0.5' : ''} ${complete ? '' : 'cursor-not-allowed'}`}
              >
                <span
                  className={`nc-main flex-1 flex items-center justify-center gap-3 px-6 py-5 rounded-l-2xl transition-colors ${isTearing ? 'nc-shake' : ''} ${
                    complete ? 'bg-[#ff4d3d] text-white group-hover:bg-[#e8402f]' : 'bg-white/[0.04] text-[#93a0ba]'
                  }`}
                >
                  {t('cta.request')}
                </span>
                <span
                  className={`nc-stub w-20 sm:w-24 flex items-center justify-center rounded-r-2xl border-l-2 border-dashed transition-colors ${stubColors} ${isTearing ? 'nc-tear' : ''}`}
                >
                  <Plane className="w-7 h-7" />
                </span>
              </button>

              <p className={`mt-4 text-sm text-[#93a0ba] text-center font-medium transition-opacity duration-300 ${isTearing ? 'opacity-0' : 'opacity-100'}`}>{t('check.note')}</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

const Faq = () => {
  const { t } = useCopy();
  const [open, setOpen] = useState(0);
  const items = [1, 2, 3, 4, 5].map((n) => ({ q: t(`faq.q${n}`), a: t(`faq.a${n}`) }));
  return (
    <section className="vz relative z-40 w-full bg-[#0a1224] px-4 sm:px-6 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <MaskTitle className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-[#e9edf5]">
          {t('faq.title')}
        </MaskTitle>

        <div className="mt-12 border-t border-white/10">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <Receipt key={i} className="border-b border-white/10">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-8 text-left transition-colors hover:bg-white/[0.02] px-4 -mx-4 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ff4d3d]"
                >
                  <span className={`font-display text-xl md:text-2xl font-bold transition-colors ${isOpen ? 'text-[#ff4d3d]' : 'text-[#e9edf5]'}`}>{it.q}</span>
                  <div className={`p-2 rounded-full border transition-all duration-300 ${isOpen ? 'border-[#ff4d3d] bg-[#ff4d3d]/10' : 'border-white/10 bg-white/5'}`}>
                    <Plus className={`w-5 h-5 shrink-0 transition-transform duration-500 ${isOpen ? 'rotate-45 text-[#ff4d3d]' : 'text-[#93a0ba]'}`} />
                  </div>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <p className="pb-8 px-4 text-[#b6c0d4] text-lg leading-relaxed">{it.a}</p>
                  </div>
                </div>
              </Receipt>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// KAPANIŞ: büyük bilet. Butona basınca koçan koparılır, geçiş oynar, forma gidilir.
// ==========================================
const TicketCta = ({ onFly, variant = 'plane' }) => {
  const { t } = useCopy();
  const [ref, inView] = useInView(0.25);
  const [tearing, setTearing] = useState(false);
  const timer = useRef(null);
  const perks = [t('end.p1'), t('end.p2'), t('end.p3')];

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const handleClick = (e) => {
    // Ctrl/Cmd+tık, orta tık vb. normal link davranışını korur
    if (!onFly || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (tearing) return;
    if (prefersReduced()) { onFly('/anfrage', variant); return; }
    setTearing(true);
    timer.current = setTimeout(() => onFly('/anfrage', variant), 700);
  };

  return (
    <section className="vz relative z-40 w-full bg-[#0a1224] px-4 sm:px-6 pt-10 pb-28 md:pb-40">
      {/* Gölge wrapper'da (drop-shadow), çünkü parçalar maske ile kesiliyor */}
      <div
        ref={ref}
        className={`settle relative max-w-5xl mx-auto ${tearing ? 'pointer-events-none' : ''} ${inView ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-24 rotate-[4deg]'}`}
        style={{ filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.55))' }}
      >
        <div className="flex flex-col md:flex-row">

          {/* ANA PARÇA */}
          <div className={`tk-main flex-1 p-8 sm:p-12 md:p-16 bg-[#e9edf5] text-[#0a1224] rounded-t-[2.5rem] md:rounded-tr-none md:rounded-l-[2.5rem] ${tearing ? 'tk-shake' : ''}`}>
            <div className="flex items-end gap-5 sm:gap-8 font-display font-black tracking-tighter leading-none text-[#0a1224]/10">
              <span className="text-6xl sm:text-8xl md:text-9xl">TR</span>
              <Plane className="w-10 h-10 sm:w-16 sm:h-16 mb-2 sm:mb-4 md:mb-6 text-[#ff4d3d]" />
              <span className="text-6xl sm:text-8xl md:text-9xl">DE</span>
            </div>
            <h2 className="font-display mt-10 text-3xl sm:text-4xl font-extrabold tracking-tight max-w-lg leading-[1.15]">
              {t('end.title')}
            </h2>
            <ul className="mt-8 space-y-3.5">
              {perks.map((p, i) => (
                <li key={i} className="flex items-center gap-3 text-lg font-bold text-[#0a1224]/80">
                  <CheckCircle2 className="w-6 h-6 text-[#ff4d3d] shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* KOÇAN: perforajdan kopar */}
          <div className={`tk-stub relative flex flex-col justify-center items-start md:items-center gap-6 p-8 sm:p-12 md:w-[360px] bg-[#dbe2ef] text-[#0a1224] border-t-2 md:border-t-0 md:border-l-2 border-dashed border-[#0a1224]/25 rounded-b-[2.5rem] md:rounded-bl-none md:rounded-r-[2.5rem] ${tearing ? 'tk-tear' : ''}`}>
            <p className="font-display text-xl font-extrabold leading-snug md:text-center text-[#0a1224]">
              {t('end.sub')}
            </p>
            <Link
              to="/anfrage"
              onClick={handleClick}
              className="group inline-flex items-center justify-center gap-3 w-full md:w-auto px-8 py-5 rounded-2xl bg-[#ff4d3d] text-white font-bold text-lg hover:bg-[#e8402f] transition-all hover:shadow-[0_10px_30px_rgba(255,77,61,0.3)] hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0a1224]"
            >
              {t('cta.request')}
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

// ==========================================
// ANA BİLEŞEN
// ==========================================
const Hero = () => {
  const { t, lng } = useCopy();
  const navigate = useNavigate();
  const cardRefs = useRef([]);
  const videoRef = useRef(null);
  const heroTextRef = useRef(null);
  const marqueeRef = useRef(null);
  const lastY = useRef(0);
  const skewTimer = useRef(null);
  const screenWidth = useRef(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const totalItems = 25;
  const [mounted, setMounted] = useState(false);
  const [showBar, setShowBar] = useState(false);

  // Geçiş animasyonu (plane / truck / stamp)
  const [isFlying, setIsFlying] = useState(false);
  const [flyVariant, setFlyVariant] = useState('plane');
  const flyingRef = useRef(false);
  const flyTimer = useRef(null);

  useEffect(() => () => {
    if (flyTimer.current) clearTimeout(flyTimer.current);
    if (skewTimer.current) clearTimeout(skewTimer.current);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lng;
  }, [lng]);

  const [request, setRequest] = useState({ city: '', job: '', qty: '' });

  const handleRequest = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (request.city) params.set('ort', request.city);
    if (request.job) params.set('beruf', request.job);
    if (request.qty) params.set('anzahl', request.qty);
    const q = params.toString();
    navigate(q ? `/anfrage?${q}` : '/anfrage');
  };

  // Seçilen varyant oynar, ardından forma gidilir
  const handleFlyTransition = (href, variant = 'plane') => {
    if (flyingRef.current) return; // çift tıklamayı engelle
    flyingRef.current = true;
    if (prefersReduced()) { navigate(href); return; }
    setFlyVariant(variant);
    setIsFlying(true);
    flyTimer.current = setTimeout(() => navigate(href), FLY_MS[variant] || 1150);
  };

  // Normal <Link> tıklamalarını geçişe çevirir (Ctrl/Cmd+tık normal kalır)
  const flyLink = (variant) => (e) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    handleFlyTransition('/anfrage', variant);
  };

  const professions = [
    { name: t('r.cdriver'), icon: <Truck className="w-5 h-5" /> },
    { name: t('r.truck'), icon: <Truck className="w-5 h-5" /> },
    { name: t('r.courier'), icon: <Package className="w-5 h-5" /> },
    { name: t('r.tech'), icon: <Wrench className="w-5 h-5" /> },
    { name: t('r.warehouse'), icon: <Warehouse className="w-5 h-5" /> },
    { name: t('r.mech'), icon: <Settings className="w-5 h-5" /> },
  ];

  useEffect(() => { setMounted(true); }, []);

  const allImages = [
    { src: '/images/mehmetvize.jpg', role: 'r.cdriver', years: 8, lang: 'B1' },
    { src: '/images/mustafavize.jpg', role: 'r.truck', years: 6, lang: 'A2' },
    { src: '/images/osmanvize.jpg', role: 'r.courier', years: 4, lang: 'B1' },
    { src: '/images/celalvize.png', role: 'r.tech', years: 9, lang: 'B2' },
    { src: '/images/emrevize.png', role: 'r.warehouse', years: 5, lang: 'A2' },
    { src: '/images/kerimvize.png', role: 'r.mech', years: 7, lang: 'B1' },
    { src: '/images/enusvize.png', role: 'r.cdriver', years: 11, lang: 'B1' },
  ];

  useEffect(() => {
    const handleResize = () => { screenWidth.current = window.innerWidth; };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useScrollFrame(() => {
    const y = window.scrollY;

    // Scroll hızına göre meslek şeridinin eğilmesi
    if (marqueeRef.current && !prefersReduced()) {
      const dy = y - lastY.current;
      lastY.current = y;
      marqueeRef.current.style.setProperty('--sk', `${clamp(dy * -0.25, -10, 10).toFixed(1)}deg`);
      clearTimeout(skewTimer.current);
      skewTimer.current = setTimeout(() => marqueeRef.current?.style.setProperty('--sk', '0deg'), 120);
    }

    if (!prefersReduced()) {
      if (videoRef.current && y < window.innerHeight * 1.5) {
        videoRef.current.style.transform = `translate3d(0, ${(y * 0.15).toFixed(1)}px, 0)`;
      }
      if (heroTextRef.current && y < window.innerHeight) {
        const textOpacity = (1 - y / (window.innerHeight * 0.7)).toFixed(2);
        const textY = (y * 0.35).toFixed(1);
        heroTextRef.current.style.transform = `translate3d(0, ${textY}px, 0)`;
        heroTextRef.current.style.opacity = Math.max(0, textOpacity);
      }
    }
    setShowBar(y > window.innerHeight * 0.9);
  });

  const getCardStyle = (distance, sign, width) => {
    const isMobile = width < 768;
    const txSpread = isMobile ? 50 : 75;
    const tyDrop = isMobile ? 6 : 14;
    const scaleDrop = isMobile ? 0.05 : 0.07;
    const rotateStep = isMobile ? 6 : 8;
    const opacityDrop = isMobile ? 0.12 : 0.15;

    const tx = sign * distance * txSpread;
    const baseYOffset = isMobile ? -20 : -10;
    const ty = baseYOffset + (distance * distance) * tyDrop;

    const scale = Math.max(0, (isMobile ? 1.05 : 1.15) - (distance * scaleDrop));
    const rotate = sign * distance * rotateStep;
    const opacity = Math.max(0, 1 - (distance * opacityDrop));
    const zIndex = 100 - Math.round(distance * 10);

    return {
      transform: `translate(-50%, -100%) translateX(${tx}px) translateY(${ty}px) scale(${scale}) rotate(${rotate}deg)`,
      opacity: opacity.toFixed(3),
      zIndex,
      display: opacity > 0 ? 'block' : 'none',
    };
  };

  useEffect(() => {
    let animationId;
    let centerIndex = 12;
    const speed = prefersReduced() ? 0.002 : 0.015;

    const updateAllCards = () => {
      centerIndex += speed;
      if (centerIndex > totalItems) centerIndex -= totalItems;
      const currentWidth = screenWidth.current;

      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        let rawDist = i - centerIndex;
        if (rawDist > totalItems / 2) rawDist -= totalItems;
        if (rawDist < -totalItems / 2) rawDist += totalItems;

        const distance = Math.abs(rawDist);
        const sign = Math.sign(rawDist) || 0;
        const style = getCardStyle(distance, sign, currentWidth);

        el.style.transform = style.transform;
        el.style.opacity = style.opacity;
        el.style.zIndex = style.zIndex.toString();
        el.style.display = style.display;
      });

      animationId = requestAnimationFrame(updateAllCards);
    };

    animationId = requestAnimationFrame(updateAllCards);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const initialCards = Array.from({ length: totalItems }, (_, i) => ({
    id: i,
    ...allImages[i % allImages.length],
  }));

  return (
    <>
    <TruckProgress />

    {/* GEÇİŞ KATMANI: uçak / TIR / damga */}
    {isFlying && <FlightOverlay variant={flyVariant} t={t} />}

    <div className="vz relative min-h-[100svh] w-full flex flex-col justify-between items-center overflow-hidden bg-[#0a1224] pt-24 md:pt-32 text-[#e9edf5]">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&display=swap');

        .vz, .vz input, .vz button { font-family: 'Bricolage Grotesque', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif; }
        .font-display { font-family: 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif; font-variation-settings: 'opsz' 96; }
        html { scroll-behavior: smooth; }

        @keyframes revealUp {
          from { opacity: 0; transform: translateY(30px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .reveal { opacity: 0; animation: revealUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }

        .mask-line { transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.9s ease; }
        .settle { transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease; }
        .check-pop { transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease, color 0.5s ease; }

        @keyframes slam {
          0% { opacity: 0; transform: scale(2.5) rotate(-16deg); filter: blur(4px); }
          60% { opacity: 1; transform: scale(0.9) rotate(-8deg); filter: blur(0); }
          100% { opacity: 1; transform: scale(1) rotate(-8deg); }
        }
        .stamp-slam { animation: slam 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        @keyframes slipIn {
          from { opacity: 0; transform: translateY(15px); filter: blur(2px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .slip-in { animation: slipIn 0.5s ease-out both; }

        .card-inner-hover {
          transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.5s ease;
        }
        .visa-wrapper:hover .card-inner-hover {
          transform: translateY(-50px) scale(1.25) rotate(0deg) !important;
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.7);
        }
        .visa-wrapper:hover { z-index: 9999 !important; }

        .stamp-in {
          opacity: 0;
          transform: scale(2) rotate(-8deg);
          transition: opacity 0.25s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1.2);
        }
        .visa-wrapper:hover .stamp-in { opacity: 1; transform: scale(1) rotate(-8deg); }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-marquee {
          display: flex;
          width: max-content;
          animation: scroll 40s linear infinite;
        }
        .animate-scroll-marquee:hover { animation-play-state: paused; }

        .search-field:focus-within { background: rgba(255, 255, 255, 0.1); box-shadow: inset 0 0 0 2px #ff4d3d; }

        /* ================= İHTİYAÇ KONTROLÜ: küçük bilet butonu ================= */
        .nc-main {
          -webkit-mask:
            radial-gradient(circle 9px at 100% 0, #0000 98%, #000) top / 100% 51% no-repeat,
            radial-gradient(circle 9px at 100% 100%, #0000 98%, #000) bottom / 100% 51% no-repeat;
                  mask:
            radial-gradient(circle 9px at 100% 0, #0000 98%, #000) top / 100% 51% no-repeat,
            radial-gradient(circle 9px at 100% 100%, #0000 98%, #000) bottom / 100% 51% no-repeat;
        }
        .nc-stub {
          -webkit-mask:
            radial-gradient(circle 9px at 0 0, #0000 98%, #000) top / 100% 51% no-repeat,
            radial-gradient(circle 9px at 0 100%, #0000 98%, #000) bottom / 100% 51% no-repeat;
                  mask:
            radial-gradient(circle 9px at 0 0, #0000 98%, #000) top / 100% 51% no-repeat,
            radial-gradient(circle 9px at 0 100%, #0000 98%, #000) bottom / 100% 51% no-repeat;
        }
        @keyframes ncTear {
          0%   { transform: translate(0, 0) rotate(0); opacity: 1; }
          18%  { transform: translate(2px, -5px) rotate(3deg); opacity: 1; }
          100% { transform: translate(80px, 170px) rotate(34deg); opacity: 0; }
        }
        .nc-tear { transform-origin: 0% 100%; animation: ncTear 0.65s cubic-bezier(0.5, 0, 0.8, 0.4) forwards; }
        @keyframes ncShake {
          0%   { transform: translateX(0); }
          20%  { transform: translateX(-6px); }
          40%  { transform: translateX(4px); }
          60%  { transform: translateX(-3px); }
          100% { transform: translateX(0); }
        }
        .nc-shake { animation: ncShake 0.45s ease-out; }

        /* ================= KAPANIŞ: büyük bilet (yarım daire çentikler) ================= */
        /* Mobil: parçalar alt alta, çentikler yatay kenarda */
        .tk-main {
          -webkit-mask:
            radial-gradient(circle 16px at 0 100%, #0000 98%, #000) left / 51% 100% no-repeat,
            radial-gradient(circle 16px at 100% 100%, #0000 98%, #000) right / 51% 100% no-repeat;
                  mask:
            radial-gradient(circle 16px at 0 100%, #0000 98%, #000) left / 51% 100% no-repeat,
            radial-gradient(circle 16px at 100% 100%, #0000 98%, #000) right / 51% 100% no-repeat;
        }
        .tk-stub {
          -webkit-mask:
            radial-gradient(circle 16px at 0 0, #0000 98%, #000) left / 51% 100% no-repeat,
            radial-gradient(circle 16px at 100% 0, #0000 98%, #000) right / 51% 100% no-repeat;
                  mask:
            radial-gradient(circle 16px at 0 0, #0000 98%, #000) left / 51% 100% no-repeat,
            radial-gradient(circle 16px at 100% 0, #0000 98%, #000) right / 51% 100% no-repeat;
        }
        /* Masaüstü: parçalar yan yana, çentikler dikey kenarda */
        @media (min-width: 768px) {
          .tk-main {
            -webkit-mask:
              radial-gradient(circle 16px at 100% 0, #0000 98%, #000) top / 100% 51% no-repeat,
              radial-gradient(circle 16px at 100% 100%, #0000 98%, #000) bottom / 100% 51% no-repeat;
                    mask:
              radial-gradient(circle 16px at 100% 0, #0000 98%, #000) top / 100% 51% no-repeat,
              radial-gradient(circle 16px at 100% 100%, #0000 98%, #000) bottom / 100% 51% no-repeat;
          }
          .tk-stub {
            -webkit-mask:
              radial-gradient(circle 16px at 0 0, #0000 98%, #000) top / 100% 51% no-repeat,
              radial-gradient(circle 16px at 0 100%, #0000 98%, #000) bottom / 100% 51% no-repeat;
                    mask:
              radial-gradient(circle 16px at 0 0, #0000 98%, #000) top / 100% 51% no-repeat,
              radial-gradient(circle 16px at 0 100%, #0000 98%, #000) bottom / 100% 51% no-repeat;
          }
        }
        @keyframes tkTear {
          0%   { transform: translate(0, 0) rotate(0); opacity: 1; }
          20%  { transform: translate(3px, -7px) rotate(2deg); opacity: 1; }
          100% { transform: translate(140px, 420px) rotate(26deg); opacity: 0; }
        }
        .tk-tear { transform-origin: 0% 0%; animation: tkTear 0.7s cubic-bezier(0.5, 0, 0.8, 0.4) forwards; }
        @keyframes tkShake {
          0%   { transform: translateX(0); }
          20%  { transform: translateX(-8px) rotate(-0.4deg); }
          40%  { transform: translateX(5px) rotate(0.3deg); }
          60%  { transform: translateX(-3px); }
          100% { transform: translateX(0); }
        }
        .tk-shake { animation: tkShake 0.5s ease-out; }

        /* ================= UÇAK + KIRMIZI EKRAN GEÇİŞİ ================= */
        @keyframes wipeUp {
          0%   { transform: translateY(100%); border-top-left-radius: 50%; border-top-right-radius: 50%; }
          30%  { border-top-left-radius: 10%; border-top-right-radius: 10%; }
          100% { transform: translateY(0); border-radius: 0; }
        }
        .screen-wipe-anim {
          transform: translateY(100%);
          box-shadow: 0 -30px 50px rgba(255, 77, 61, 0.5);
          animation: wipeUp 0.85s cubic-bezier(0.7, 0, 0.2, 1) 0.12s forwards;
        }

        @keyframes planeFlyUp {
          0%   { transform: translate(-50%, 100vh) scale(0.8); opacity: 0; }
          10%  { opacity: 1; }
          100% { transform: translate(-50%, -140vh) scale(2.2); opacity: 1; }
        }
        .plane-fly-anim {
          position: absolute;
          left: 50%;
          bottom: 0;
          animation: planeFlyUp 1.1s cubic-bezier(0.5, 0, 0.2, 1) forwards;
          will-change: transform;
        }

        ${FX_CSS}

        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .reveal { animation-duration: 0.01ms; opacity: 1; filter: none; }
          .animate-scroll-marquee { animation: none; }
          .mask-line { transform: none !important; opacity: 1 !important; transition: none; }
          .settle { transform: none !important; opacity: 1 !important; transition: none; }
          .check-pop { transition: none; }
          .stamp-slam, .slip-in { animation: none; opacity: 1; filter: none; }
          .nc-tear, .nc-shake, .tk-tear, .tk-shake { animation: none; }
          .screen-wipe-anim { animation: none; transform: translateY(0); }
          .plane-fly-anim { animation: none; }
        }
      `}</style>

      {/* 1. ARKA PLAN */}
      <AnimatedBackground videoRef={videoRef} />

      {/* 2. ANA İÇERİK */}
      <div ref={heroTextRef} className="relative z-20 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 sm:px-6 mt-4 md:mt-8 will-change-[transform,opacity]">

        <div className="reveal delay-100 inline-flex items-center gap-3 border border-white/20 bg-white/[0.03] backdrop-blur-xl px-5 py-2.5 rounded-full mb-10 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
          <span className="relative flex w-2.5 h-2.5">
            <span className="absolute inline-flex w-full h-full rounded-full bg-[#ff4d3d] opacity-70 animate-ping"></span>
            <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-[#ff4d3d]"></span>
          </span>
          <span className="text-xs sm:text-sm font-bold text-[#e9edf5] tracking-wide uppercase">
            {t('hero.tag')}
          </span>
        </div>

        <h1 className="font-display text-[2.8rem] sm:text-6xl md:text-7xl lg:text-[7rem] font-extrabold leading-[1.05] tracking-tight mb-8 text-center max-w-6xl drop-shadow-2xl">
          <span className="block reveal delay-200">
            {t('hero.t1')}
          </span>
          <span className="block mt-2 sm:mt-3 reveal delay-300">
            {t('hero.t2')}
          </span>
          <h2>
                      <span className="block sm:inline reveal delay-400">
            {' '}{t('hero.t3')} <span className="font-large">{t('hero.t4')}</span>
          </span>
          </h2>
        </h1>

        <p className="reveal delay-400 text-lg sm:text-xl md:text-2xl text-[#b6c0d4] mb-14 text-center max-w-3xl leading-relaxed font-medium">
          {t('hero.desc')}
        </p>

        <div className="reveal delay-500 flex flex-col sm:flex-row gap-5 mb-16 items-center w-full justify-center">
          <Link to="/anfrage" onClick={flyLink('truck')} className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-[#ff4d3d] text-white text-lg font-bold hover:bg-[#e8402f] hover:shadow-[0_10px_30px_rgba(255,77,61,0.3)] hover:-translate-y-1 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e9edf5]">
            {t('cta.request')}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </Link>

          <a href="#ablauf" className="group w-full sm:w-auto inline-flex justify-center items-center px-10 py-5 border border-white/20 text-lg font-bold rounded-2xl text-[#e9edf5] bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.06] hover:border-white/40 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e9edf5]">
            {t('cta.how')}
            <ChevronRight className="ml-2 w-5 h-5 text-[#93a0ba] group-hover:text-white group-hover:translate-x-1 transition-all" />
          </a>
        </div>

        <ul className="reveal delay-500 flex flex-wrap justify-center gap-x-10 gap-y-4 w-full max-w-4xl px-2">
          {[
            { icon: ShieldCheck, text: t('badge.1') },
            { icon: Globe2, text: t('badge.2') },
            { icon: Users, text: t('badge.3') }
          ].map((badge, idx) => (
            <li key={idx} className="flex items-center gap-3 text-base font-bold text-[#b6c0d4] bg-white/[0.03] px-4 py-2 rounded-xl border border-white/5">
              <badge.icon className="w-5 h-5 text-[#ff4d3d]" />
              {badge.text}
            </li>
          ))}
        </ul>
      </div>

      {/* 3. DOĞRULANMIŞ PROFİLLER */}
      <div className="relative z-30 w-full h-[320px] sm:h-[400px] md:h-[500px] mt-10 md:mt-12 pointer-events-none">

        <div className="absolute inset-0 z-40 pointer-events-none" style={{ background: 'linear-gradient(90deg, #0a1224 0%, transparent 20%, transparent 80%, #0a1224 100%)' }}></div>
        <div className="absolute bottom-0 w-full h-1/2 z-40 pointer-events-none bg-gradient-to-t from-[#0a1224] via-[#0a1224]/80 to-transparent"></div>

        <div className="relative w-full max-w-[100vw] h-full mx-auto flex justify-center items-end pointer-events-auto perspective-[1000px]">
          {initialCards.map((card) => (
            <div
              key={card.id}
              ref={(el) => { cardRefs.current[card.id] = el; }}
              className="visa-wrapper absolute top-full left-1/2 will-change-transform"
              style={{ transformOrigin: '50% 100%' }}
            >
              <div className="card-inner-hover relative w-[130px] h-[180px] sm:w-[170px] sm:h-[240px] md:w-[240px] md:h-[340px] rounded-[18px] md:rounded-[22px] p-[6px] md:p-[8px] bg-[#e9edf5] cursor-pointer group shadow-[0_20px_50px_rgba(0,0,0,0.5)]">

                <div className="relative w-full h-full rounded-[13px] md:rounded-[15px] overflow-hidden bg-[#111b33]">
                  <img
                    src={card.src}
                    alt={`${t('card.alt')}: ${t(card.role)}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1224]/90 via-[#0a1224]/10 to-transparent"></div>

                  <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
                    <p className="font-display font-extrabold text-xs sm:text-sm md:text-lg text-white leading-tight">{t(card.role)}</p>
                    <p className="hidden sm:block mt-1 text-[11px] md:text-sm font-medium text-[#b6c0d4]">
                      {t('card.line', { n: card.years, lang: card.lang })}
                    </p>
                  </div>
                </div>

                <div className="stamp-in absolute inset-x-0 top-6 md:top-10 flex justify-center pointer-events-none">
                  <Stamp className="bg-[#0a1224]/80 backdrop-blur-md text-[10px] md:text-sm border-[3px] md:border-4">{t('visa')}</Stamp>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. HIZLI TALEP ÇUBUĞU */}
      <form onSubmit={handleRequest} className="relative w-full max-w-[1050px] px-6 lg:px-4 z-40 mb-10 -mt-10 md:-mt-20">
        <div className="bg-[#111b33]/70 backdrop-blur-2xl rounded-[2rem] p-3 flex flex-col md:flex-row gap-2 md:gap-0 items-stretch shadow-[0_30px_80px_rgba(0,0,0,0.6)] border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-[#ff4d3d]/5 to-transparent pointer-events-none"></div>

          <label className="search-field flex-1 rounded-2xl flex items-center px-6 py-5 w-full cursor-text hover:bg-white/[0.04] transition-colors relative z-10">
            <input
              type="text"
              value={request.city}
              onChange={(e) => setRequest({ ...request, city: e.target.value })}
              placeholder={t('f.city')}
              aria-label={t('f.city')}
              className="bg-transparent outline-none w-full text-[#e9edf5] text-lg font-semibold placeholder-[#93a0ba]"
            />
            <MapPin className="w-6 h-6 text-[#ff4d3d] ml-2 shrink-0" />
          </label>
          <div className="hidden md:block w-px my-4 bg-white/10 relative z-10"></div>

          <label className="search-field flex-1 rounded-2xl flex items-center px-6 py-5 w-full cursor-text hover:bg-white/[0.04] transition-colors relative z-10">
            <input
              type="text"
              value={request.job}
              onChange={(e) => setRequest({ ...request, job: e.target.value })}
              placeholder={t('f.job')}
              aria-label={t('f.job')}
              className="bg-transparent outline-none w-full text-[#e9edf5] text-lg font-semibold placeholder-[#93a0ba]"
            />
            <Truck className="w-6 h-6 text-[#ff4d3d] ml-2 shrink-0" />
          </label>
          <div className="hidden md:block w-px my-4 bg-white/10 relative z-10"></div>

          <label className="search-field flex-1 rounded-2xl flex items-center px-6 py-5 w-full cursor-text hover:bg-white/[0.04] transition-colors relative z-10">
            <input
              type="text"
              inputMode="numeric"
              value={request.qty}
              onChange={(e) => setRequest({ ...request, qty: e.target.value })}
              placeholder={t('f.qty')}
              aria-label={t('f.qty')}
              className="bg-transparent outline-none w-full text-[#e9edf5] text-lg font-semibold placeholder-[#93a0ba]"
            />
            <Users className="w-6 h-6 text-[#ff4d3d] ml-2 shrink-0" />
          </label>
          <button
            type="submit"
            className="relative z-10 flex items-center justify-center gap-2 bg-[#ff4d3d] text-white px-10 py-5 rounded-[1.5rem] font-bold text-lg w-full md:w-auto md:ml-2 hover:bg-[#e8402f] transition-all hover:shadow-[0_0_20px_rgba(255,77,61,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e9edf5]"
          >
            {t('f.go')}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>

      {/* 5. SONSUZ KAYAN PROFİL ŞERİDİ (scroll hızına göre eğilir) */}
      <div ref={marqueeRef} className="relative w-full overflow-hidden border-y border-white/10 py-8 bg-[#0a1224]/80 backdrop-blur-md z-40 mb-10">
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-[#0a1224] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-[#0a1224] to-transparent z-10 pointer-events-none"></div>

        <div className="animate-scroll-marquee flex items-center pl-6">
          {[1, 2, 3].map((setIndex) => (
            <React.Fragment key={setIndex}>
              {professions.map((prof, index) => (
                <div
                  key={`${setIndex}-${index}`}
                  className="marquee-item flex items-center gap-3 px-10 whitespace-nowrap text-[#e9edf5] font-bold text-xl border-r border-white/10 cursor-default hover:text-[#ff4d3d] transition-colors"
                >
                  <span className="text-[#ff4d3d] bg-[#ff4d3d]/10 p-2 rounded-xl">{prof.icon}</span>
                  {prof.name}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

    </div>

    {/* 6. RAKAMLAR */}
    <Numbers />

    {/* 6b. SCROLL'A BAĞLI DEV YAZI */}
    <ScrollTicker />

    {/* 7. MANİFESTO */}
    <Manifesto />

    {/* 8. SÜREÇ (#ablauf) */}
    <RoadDivider icon="truck" />
    <Process />

    {/* 8b. ROTA: scroll ile çizilir, uçak yolu izler */}
    <Journey t={t} />

    {/* 9. KONTROL KATALOĞU */}
    <Vetting />

    {/* 10. İHTİYAÇ KONTROLÜ: bilet butonu → koçan kopar → uçak → form */}
    <RoadDivider icon="package" />
    <NeedCheck onFly={handleFlyTransition} variant="plane" />

    {/* 11. SSS */}
    <Faq />

    {/* 12. KAPANIŞ: büyük bilet → koçan kopar → uçak → form */}
    <TicketCta onFly={handleFlyTransition} variant="plane" />

    {/* 13. MOBİL YAPIŞKAN CTA ÇUBUĞU */}
    <div
      className={`vz md:hidden fixed bottom-0 inset-x-0 z-[90] px-4 pt-3 bg-[#0a1224]/90 backdrop-blur-xl border-t border-white/10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${showBar ? 'translate-y-0' : 'translate-y-full'}`}
      style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}
      aria-hidden={!showBar}
    >
      <Link to="/anfrage" onClick={flyLink('truck')} tabIndex={showBar ? 0 : -1} className="group flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-[#ff4d3d] text-white font-bold text-lg hover:bg-[#e8402f] transition-colors shadow-[0_0_20px_rgba(255,77,61,0.3)]">
        {t('cta.request')}
        <ArrowRight className="w-5 h-5" />
      </Link>
    </div>
    </>
  );
};

export default Hero;