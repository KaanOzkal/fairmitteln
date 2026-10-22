import React, { useEffect, useRef, useState } from 'react';
import { Plane, Truck, Package, BadgeCheck } from 'lucide-react';

/*
  scrollFx.jsx  -  Hero.jsx ile birlikte kullanılan yeni efektler
  1) FlightOverlay variant: 'plane' (alttan uçak) | 'truck' (soldan TIR) | 'stamp' (vize damgası)
  2) Journey      : scroll ile çizilen rota, uçak yolu takip eder
  3) ScrollTicker : scroll'a bağlı ters yönlü kayan dev yazı
  4) FX_CSS       : bu efektlerin CSS'i  (Hero içindeki <style> a eklenir)
  5) FX_COPY      : yeni çeviriler (de / tr / en)
*/

const clamp = (n, a = 0, b = 1) => Math.min(b, Math.max(a, n));
const reduced = () =>
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

// Geçiş süreleri (ms): navigate bu süre sonra çağrılır
export const FLY_MS = { plane: 1150, truck: 1100, stamp: 1200 };

// =====================================================================
//  GEÇİŞ KATMANI
// =====================================================================
export const FlightOverlay = ({ variant = 'plane', t }) => (
  <div className="fixed inset-0 z-[100000] overflow-hidden pointer-events-auto" role="status" aria-live="polite">
    <span className="sr-only">{t('flight.sr')}</span>

    {variant === 'plane' && (
      <>
        <div className="absolute inset-0 bg-[#ff4d3d] screen-wipe-anim"></div>
        <div className="plane-fly-anim w-32 h-32 md:w-48 md:h-48">
          <Plane className="w-full h-full text-white -rotate-45 drop-shadow-[0_0_30px_rgba(255,255,255,0.6)]" strokeWidth={1.5} />
          <div
            className="absolute left-1/2 -translate-x-1/2 top-[78%] w-[6px] md:w-[8px] h-[70vh] rounded-full pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.4) 35%, transparent)' }}
          ></div>
        </div>
      </>
    )}

    {variant === 'truck' && (
      // Kırmızı perde soldan sağa gelir, TIR perdenin ön kenarında sürer
      <div className="absolute inset-0 bg-[#ff4d3d] truck-wipe-anim">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="absolute h-[4px] rounded-full"
            style={{
              right: `${7 + i * 1.5}rem`,
              top: `${42 + i * 8}%`,
              width: `${30 - i * 7}vw`,
              background: 'linear-gradient(to left, rgba(255,255,255,0.9), transparent)',
            }}
          />
        ))}
        <Truck
          className="truck-bob absolute right-4 md:right-12 top-1/2 w-24 h-24 md:w-44 md:h-44 text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]"
          strokeWidth={1.5}
        />
      </div>
    )}

    {variant === 'stamp' && (
      // Kırmızı daire ortadan açılır, dev vize damgası çarpar
      <div className="absolute inset-0 bg-[#ff4d3d] stamp-wipe-anim grid place-items-center">
        <span
          className="stamp-big inline-flex items-center gap-3 md:gap-5 border-[6px] md:border-[10px] border-white text-white rounded-2xl px-6 py-3 md:px-12 md:py-6 font-display font-extrabold uppercase tracking-wide text-3xl md:text-7xl"
          style={{ boxShadow: 'inset 0 0 0 3px rgba(255,255,255,0.25)' }}
        >
          <BadgeCheck className="w-8 h-8 md:w-16 md:h-16" strokeWidth={2.5} />
          {t('visa')}
        </span>
      </div>
    )}
  </div>
);

// =====================================================================
//  SCROLL İLE ÇİZİLEN ROTA + UÇAK
// =====================================================================
const ROUTE = 'M60 320 C250 320 250 100 450 130 S700 340 860 200 S940 90 940 70';
const FR = [0, 0.34, 0.67, 1];

export const Journey = ({ t }) => {
  const secRef = useRef(null);
  const pathRef = useRef(null);
  const planeRef = useRef(null);
  const [pts, setPts] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const L = path.getTotalLength();
    setPts(FR.map((f) => path.getPointAtLength(L * f)));
  }, []);

  useScrollFrame(() => {
    const path = pathRef.current;
    const sec = secRef.current;
    if (!path || !sec) return;
    const L = path.getTotalLength();
    const r = sec.getBoundingClientRect();
    const p = reduced() ? 1 : clamp((window.innerHeight * 0.8 - r.top) / (r.height * 0.9));

    path.style.strokeDasharray = `${L}`;
    path.style.strokeDashoffset = `${L * (1 - p)}`;

    const a = path.getPointAtLength(Math.max(0, L * p - 1));
    const b = path.getPointAtLength(Math.min(L, L * p + 1));
    const c = path.getPointAtLength(L * p);
    const ang = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
    if (planeRef.current) {
      planeRef.current.style.left = `${c.x / 10}%`;
      planeRef.current.style.top = `${c.y / 4}%`;
      planeRef.current.style.transform = `translate(-50%, -50%) rotate(${ang + 45}deg)`;
    }
    setActive(FR.filter((f) => p >= f - 0.01).length);
  });

  return (
    <section ref={secRef} className="vz relative z-40 w-full bg-[#0a1224] px-4 sm:px-6 py-20 md:py-32">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-[#e9edf5] max-w-3xl">
          {t('journey.title')}
        </h2>
        <p className="mt-6 text-[#93a0ba] text-lg md:text-xl leading-relaxed max-w-xl">{t('journey.sub')}</p>

        <div className="relative mt-20 mb-10 w-full aspect-[5/2]">
          <svg viewBox="0 0 1000 400" className="absolute inset-0 w-full h-full overflow-visible" aria-hidden="true">
            <path d={ROUTE} fill="none" stroke="rgba(233,237,245,0.12)" strokeWidth="3" strokeDasharray="4 10" strokeLinecap="round" />
            <path
              ref={pathRef}
              d={ROUTE}
              fill="none"
              stroke="#ff4d3d"
              strokeWidth="4"
              strokeLinecap="round"
              style={{ filter: 'drop-shadow(0 0 8px rgba(255,77,61,0.8))' }}
            />
          </svg>

          {pts.map((pt, i) => {
            const on = i < active;
            const above = pt.y > 200;
            return (
              <div key={i} className="absolute" style={{ left: `${pt.x / 10}%`, top: `${pt.y / 4}%` }}>
                <span
                  className={`block w-3.5 h-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-500 ${
                    on ? 'bg-[#ff4d3d] border-[#ff4d3d] scale-150 shadow-[0_0_20px_rgba(255,77,61,1)]' : 'bg-[#0a1224] border-white/30'
                  }`}
                ></span>
                <span
                  className={`absolute left-0 -translate-x-1/2 w-20 sm:w-32 text-center text-[11px] sm:text-base font-bold leading-tight transition-colors duration-500 ${
                    above ? 'bottom-full mb-4' : 'top-full mt-4'
                  } ${on ? 'text-[#e9edf5]' : 'text-[#93a0ba]/50'}`}
                >
                  {t(`journey.s${i + 1}`)}
                </span>
              </div>
            );
          })}

          <div ref={planeRef} className="absolute left-[6%] top-[80%] will-change-transform pointer-events-none" style={{ transform: 'translate(-50%,-50%)' }}>
            <Plane className="w-9 h-9 sm:w-12 sm:h-12 text-white drop-shadow-[0_0_14px_rgba(255,255,255,0.7)]" strokeWidth={1.6} />
          </div>
        </div>
      </div>
    </section>
  );
};

// =====================================================================
//  SCROLL'A BAĞLI TERS YÖNLÜ DEV YAZI
// =====================================================================
export const ScrollTicker = () => {
  const ref = useRef(null);
  const a = useRef(null);
  const b = useRef(null);
  const line = 'TÜRKİYE ✈ DEUTSCHLAND ✈ '.repeat(4);

  useScrollFrame(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const p = reduced() ? 0.5 : clamp((vh - r.top) / (vh + r.height));
    if (a.current) a.current.style.transform = `translate3d(${(-p * 35).toFixed(1)}%,0,0)`;
    if (b.current) b.current.style.transform = `translate3d(${(-35 + p * 35).toFixed(1)}%,0,0)`;
  });

  return (
    <div ref={ref} aria-hidden="true" className="vz relative z-40 w-full bg-[#0a1224] overflow-hidden py-6 md:py-10 select-none">
      <div ref={a} className="whitespace-nowrap font-display font-black leading-none tracking-tighter text-[16vw] will-change-transform"
        style={{ color: 'transparent', WebkitTextStroke: '2px rgba(233,237,245,0.22)' }}>
        {line}
      </div>
      <div ref={b} className="whitespace-nowrap font-display font-black leading-none tracking-tighter text-[16vw] will-change-transform"
        style={{ color: 'rgba(255,77,61,0.9)', transform: 'translate3d(-35%,0,0)' }}>
        {line}
      </div>
    </div>
  );
};

// =====================================================================
//  CSS  (Hero içindeki <style> şablonuna  ${FX_CSS}  olarak eklenir)
// =====================================================================
export const FX_CSS = `
  @keyframes wipeRight { from { transform: translateX(-100%); } to { transform: translateX(0); } }
  .truck-wipe-anim {
    transform: translateX(-100%);
    box-shadow: 30px 0 50px rgba(255, 77, 61, 0.5);
    animation: wipeRight 0.95s cubic-bezier(0.65, 0, 0.25, 1) 0.05s forwards;
  }
  @keyframes truckBob {
    0%, 100% { transform: translateY(-50%); }
    50% { transform: translateY(calc(-50% - 6px)); }
  }
  .truck-bob { animation: truckBob 0.18s ease-in-out infinite; }

  @keyframes circleOpen {
    from { clip-path: circle(0% at 50% 50%); }
    to   { clip-path: circle(150% at 50% 50%); }
  }
  .stamp-wipe-anim { clip-path: circle(0% at 50% 50%); animation: circleOpen 0.8s cubic-bezier(0.7, 0, 0.2, 1) 0.05s forwards; }
  @keyframes stampBig {
    0%   { opacity: 0; transform: scale(4) rotate(-20deg); }
    70%  { opacity: 1; transform: scale(0.92) rotate(-8deg); }
    100% { opacity: 1; transform: scale(1) rotate(-8deg); }
  }
  .stamp-big { opacity: 0; animation: stampBig 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards; }

  /* Scroll hızına göre eğilen profil şeridi (CSS değişkeni --sk Hero'dan gelir) */
  .marquee-item { transform: skewX(var(--sk, 0deg)); transition: transform 0.25s ease-out; }

  @media (prefers-reduced-motion: reduce) {
    .truck-wipe-anim { animation: none; transform: translateX(0); }
    .truck-bob, .stamp-big { animation: none; opacity: 1; }
    .stamp-wipe-anim { animation: none; clip-path: none; }
    .marquee-item { transform: none; }
  }
`;

// =====================================================================
//  ÇEVİRİLER  (Hero'da COPY'ye birleştirilir)
// =====================================================================
export const FX_COPY = {
  de: {
    'journey.title': 'Die Reise Ihrer Fachkraft.',
    'journey.sub': 'Von der Türkei bis zu Ihrem Betrieb. Jeder Meilenstein auf einen Blick.',
    'journey.s1': 'Auswahl in der Türkei',
    'journey.s2': 'Visum genehmigt',
    'journey.s3': 'Flug nach Deutschland',
    'journey.s4': 'Erster Arbeitstag',
  },
  tr: {
    'journey.title': 'Personelinizin yolculuğu.',
    'journey.sub': "Türkiye'den işletmenize kadar her aşama tek bakışta.",
    'journey.s1': "Türkiye'de seçim",
    'journey.s2': 'Vize onaylandı',
    'journey.s3': "Almanya'ya uçuş",
    'journey.s4': 'İlk iş günü',
  },
  en: {
    'journey.title': "Your professional's journey.",
    'journey.sub': 'From Turkey to your business. Every milestone at a glance.',
    'journey.s1': 'Selection in Turkey',
    'journey.s2': 'Visa approved',
    'journey.s3': 'Flight to Germany',
    'journey.s4': 'First day of work',
  },
};


// =====================================================================
//  SAYFA İLERLEME ÇUBUĞU: ilerlemenin ucunda giden bir TIR
// =====================================================================
export const TruckProgress = () => {
  const bar = useRef(null);
  const truck = useRef(null);
  useScrollFrame(() => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const p = h > 0 ? clamp(window.scrollY / h) : 0;
    if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    if (truck.current) truck.current.style.left = `${p * 100}%`;
  });
  return (
    <div className="fixed top-0 inset-x-0 h-[4px] z-[100] pointer-events-none">
      <div ref={bar} className="h-full w-full bg-gradient-to-r from-[#0a1224] via-[#ff4d3d] to-[#ff4d3d] shadow-[0_0_10px_rgba(255,77,61,0.8)] origin-left" style={{ transform: 'scaleX(0)' }}></div>
      <div ref={truck} className="absolute top-[3px] -translate-x-full will-change-transform" style={{ left: 0 }}>
        <Truck className="w-6 h-6 text-[#ff4d3d] drop-shadow-[0_0_6px_rgba(255,77,61,0.9)]" strokeWidth={2} />
      </div>
    </div>
  );
};

// =====================================================================
//  YOL AYRACI: scroll ettikçe araç yolda ilerler, arkasında kırmızı iz kalır
// =====================================================================
export const RoadDivider = ({ icon = 'truck' }) => {
  const ref = useRef(null);
  const road = useRef(null);
  const trail = useRef(null);
  const vehicle = useRef(null);
  const Icon = icon === 'package' ? Package : Truck;
  useScrollFrame(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const p = reduced() ? 0.5 : clamp((vh - r.top) / (vh + r.height));
    if (road.current) road.current.style.backgroundPositionX = `${(-p * 700).toFixed(0)}px`;
    if (trail.current) trail.current.style.width = `${(p * 100).toFixed(1)}%`;
    if (vehicle.current) vehicle.current.style.left = `${(p * 100).toFixed(1)}%`;
  });
  return (
    <div ref={ref} aria-hidden="true" className="vz relative z-40 w-full bg-[#0a1224] px-4 sm:px-6 py-8 overflow-hidden">
      <div className="relative max-w-6xl mx-auto h-12">
        <div ref={road} className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2"
          style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(233,237,245,0.25) 0 22px, transparent 22px 44px)' }}></div>
        <div ref={trail} className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 bg-[#ff4d3d] shadow-[0_0_12px_rgba(255,77,61,0.8)]" style={{ width: '0%' }}></div>
        <div ref={vehicle} className="absolute top-1/2 -translate-x-1/2 -translate-y-[60%] text-[#ff4d3d] will-change-transform" style={{ left: '0%' }}>
          <Icon className="w-9 h-9 md:w-11 md:h-11" strokeWidth={1.8} />
        </div>
      </div>
    </div>
  );
};

// =====================================================================
//  FİŞ BASMA: içerik scroll ile yukarıdan aşağı "basılır" (yazıcı fişi gibi)
// =====================================================================
export const Receipt = ({ children, className = '' }) => {
  const ref = useRef(null);
  useScrollFrame(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const p = reduced() ? 1 : clamp((vh * 0.96 - r.top) / (vh * 0.22));
    el.style.clipPath = p >= 1 ? 'none' : `inset(0 0 ${((1 - p) * 100).toFixed(1)}% 0)`;
    el.style.transform = p >= 1 ? 'none' : `translateY(${((1 - p) * -22).toFixed(1)}px)`;
  });
  return <div ref={ref} className={className} style={{ clipPath: 'inset(0 0 100% 0)' }}>{children}</div>;
};