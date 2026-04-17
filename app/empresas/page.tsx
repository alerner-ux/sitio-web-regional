"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroWireframe from "@/components/ui/HeroWireframe";
import ResultCard from "@/components/ui/ResultCard";
import ServiceCard from "@/components/ui/ServiceCard";
import type { ServiceIcon } from "@/components/ui/ServiceCard";
import styles from "./empresas.module.css";

gsap.registerPlugin(ScrollTrigger);

/* ── DATA ─────────────────────────────────────── */

const RESULTS = [
  { value: "98%", label: "SLA diario", icon: "gauge" as const },
  { value: "3hs", label: "Procesamiento por pieza", icon: "clock" as const },
  { value: "99%", label: "Efectividad Same Day", icon: "bolt" as const },
  { value: "98%", label: "Efectividad Tradicional", icon: "truck" as const },
  { value: "1%", label: "Reclamos por siniestros", icon: "shield" as const },
];

const SERVICES: { title: string; description: string; icon: ServiceIcon }[] = [
  { title: "Envío a punto", description: "Realizamos recorridos más eficientes que permiten reducir costos y aumentar la efectividad de entrega. Hacemos 2 intentos de entrega y si no encontramos al comprador, lo dejamos en el punto más cercano para que lo retire cuando quiera.", icon: "envio-punto" },
  { title: "Retiro en punto", description: "Ofrece mayor flexibilidad con nuestra red. Tus compradores eligen el punto más cercano y retiran cuando quieran.", icon: "retiro-punto" },
  { title: "Devoluciones", description: "Potencia tu experiencia de compra ofreciendo devolver tus productos en puntos Pickit. Te brindamos completa visibilidad del trayecto.", icon: "devoluciones" },
  { title: "Puntos de despacho", description: "Optimizá costos en la primera milla. Contamos con una red estratégicamente distribuida para que tus vendedores puedan acercar sus productos a nuestros puntos.", icon: "despacho" },
  { title: "Same Day", description: "Tus clientes reciben sus paquetes en el domicilio en máximo 4 horas. Almacenamos tus productos en nuestros puntos o los retiramos de tu tienda más cercana al domicilio.", icon: "same-day" },
  { title: "Envío a domicilio", description: "Para más comodidad, llevamos tus productos a domicilio, con un servicio logístico rápido y sencillo.", icon: "domicilio" },
];

const INTEGRATIONS = [
  { name: "VTEX", letter: "V" },
  { name: "Shopify", letter: "S" },
  { name: "WooCommerce", letter: "W" },
  { name: "TiendaNube", letter: "T" },
];

const BENEFITS_ITEMS = [
  { text: "Nos encargamos de tu logística de principio a fin." },
  { text: "Adaptamos tu integración acorde a las necesidades de tu negocio." },
  { text: "Gestioná tus envíos y devoluciones, visualizando el seguimiento de tu paquete en tiempo real." },
  { text: "Brindale visibilidad completa a tus clientes: notificaciones por correo, mensajes y tracking live." },
];

const BRAND_LOGOS = [
  "Mercado Libre", "Falabella", "Farmacity", "Garbarino",
  "Frávega", "Rappi", "Coppel", "Movistar",
  "Samsung", "Adidas", "Nike", "Zara",
];

const WHY_CHOOSE = [
  { title: "Reducimos costos aumentando eficiencia", description: "Nuestro modelo permite ahorrar hasta un 30% en costos de envío.", accent: "30%", illustration: "savings" as const },
  { title: "Entrega flexible", description: "Tus compradores eligen dónde y cuándo recibir su compra.", accent: "Flexible", illustration: "flexible" as const },
  { title: "Pensamos en las personas", description: "Atención personalizada para vos y tus compradores. Resolvemos eventualidades en menos de 48 horas.", accent: "48hs", illustration: "people" as const },
  { title: "Te acompañamos en cada paso", description: "Tenemos 99% de efectividad de entrega y brindamos completa visibilidad del proceso.", accent: "99%", illustration: "tracking" as const },
];

const TESTIMONIALS = [
  {
    name: "Valentina Ruiz",
    role: "eCommerce Manager",
    company: "Moda Express",
    industry: "Fashion & Apparel",
    quote: "Desde que integramos Pickit, nuestras devoluciones bajaron un 40%. Los compradores eligen su punto más cercano y la satisfacción se disparó. Es un game changer para cualquier tienda de moda online.",
    metric: "40%",
    metricLabel: "menos devoluciones",
    avatar: "VR",
  },
  {
    name: "Tomás Delgado",
    role: "Head of Operations",
    company: "TechStore AR",
    industry: "Electronics",
    quote: "Procesamos más de 8.000 envíos mensuales con Pickit. La visibilidad en tiempo real y el soporte 24hs nos dan una tranquilidad que no encontramos con ningún otro operador logístico.",
    metric: "8K+",
    metricLabel: "envíos/mes",
    avatar: "TD",
  },
  {
    name: "Camila Herrera",
    role: "Directora de Logística",
    company: "NatuVida",
    industry: "Wellness & Food",
    quote: "Necesitábamos same day para productos frescos. Pickit lo resolvió con una red que cubre todo AMBA en menos de 4 horas. Nuestro NPS subió 22 puntos en tres meses.",
    metric: "+22",
    metricLabel: "puntos NPS",
    avatar: "CH",
  },
];

const MAP_POINTS = [
  { cx: 340, cy: 60, name: "Punto Pickit Recoleta", address: "Av. Santa Fe 1234, CABA", phrase: "Tu paquete siempre cerca" },
  { cx: 360, cy: 75, name: "Punto Pickit Belgrano", address: "Cabildo 2345, CABA", phrase: "Retirá cuando quieras" },
  { cx: 330, cy: 95, name: "Punto Pickit Salta", address: "Caseros 456, Salta", phrase: "Cobertura en todo el norte" },
  { cx: 370, cy: 90, name: "Punto Pickit Jujuy", address: "Alvear 789, San Salvador", phrase: "Llegamos a cada rincón" },
  { cx: 350, cy: 110, name: "Punto Pickit Tucumán", address: "San Martín 321, SMT", phrase: "El jardín de la república" },
  { cx: 325, cy: 130, name: "Punto Pickit Catamarca", address: "Rivadavia 567, Catamarca", phrase: "Conectados con el NOA" },
  { cx: 375, cy: 125, name: "Punto Pickit Santiago", address: "Belgrano 890, Santiago del Estero", phrase: "Siempre disponibles" },
  { cx: 345, cy: 145, name: "Punto Pickit Córdoba Centro", address: "Colón 123, Córdoba Capital", phrase: "El corazón del país" },
  { cx: 365, cy: 150, name: "Punto Pickit Villa María", address: "San Martín 456, Villa María", phrase: "Envíos rápidos y seguros" },
  { cx: 335, cy: 165, name: "Punto Pickit Córdoba Norte", address: "Duarte Quirós 789, Córdoba", phrase: "Cada vez más cerca" },
  { cx: 355, cy: 170, name: "Punto Pickit Río Cuarto", address: "Constitución 101, Río Cuarto", phrase: "Cobertura total" },
  { cx: 310, cy: 180, name: "Punto Pickit San Luis", address: "Rivadavia 234, San Luis", phrase: "Puerta del Cuyo" },
  { cx: 390, cy: 175, name: "Punto Pickit Santa Fe", address: "San Martín 567, Santa Fe", phrase: "La ciudad litoraleña" },
  { cx: 340, cy: 195, name: "Punto Pickit Rosario Centro", address: "Córdoba 890, Rosario", phrase: "La cuna de la bandera" },
  { cx: 360, cy: 200, name: "Punto Pickit Rosario Sur", address: "Pellegrini 123, Rosario", phrase: "Envíos same day" },
  { cx: 330, cy: 215, name: "Punto Pickit Mendoza", address: "San Martín 456, Mendoza", phrase: "Tierra del buen sol" },
  { cx: 380, cy: 210, name: "Punto Pickit Paraná", address: "25 de Mayo 789, Paraná", phrase: "Capital entrerriana" },
  { cx: 350, cy: 235, name: "Punto Pickit San Rafael", address: "Day 101, San Rafael", phrase: "Oasis del sur mendocino" },
  { cx: 370, cy: 240, name: "Punto Pickit La Plata", address: "7 y 50, La Plata", phrase: "La ciudad de las diagonales" },
  { cx: 345, cy: 265, name: "Punto Pickit Neuquén", address: "Av. Argentina 234, Neuquén", phrase: "Patagonia conectada" },
  { cx: 365, cy: 270, name: "Punto Pickit Bahía Blanca", address: "Alsina 567, Bahía Blanca", phrase: "El sur bonaerense" },
  { cx: 340, cy: 290, name: "Punto Pickit Cipolletti", address: "Roca 890, Cipolletti", phrase: "Valle del Río Negro" },
  { cx: 355, cy: 295, name: "Punto Pickit Viedma", address: "Zatti 123, Viedma", phrase: "Capital rionegrina" },
  { cx: 350, cy: 325, name: "Punto Pickit Trelew", address: "25 de Mayo 456, Trelew", phrase: "Centro del Chubut" },
  { cx: 340, cy: 345, name: "Punto Pickit Comodoro", address: "San Martín 789, Comodoro Rivadavia", phrase: "Capital del petróleo" },
  { cx: 350, cy: 385, name: "Punto Pickit Río Gallegos", address: "Roca 101, Río Gallegos", phrase: "La puerta del sur" },
  { cx: 350, cy: 435, name: "Punto Pickit Ushuaia", address: "San Martín 234, Ushuaia", phrase: "Fin del mundo" },
  /* CABA cluster */
  { cx: 395, cy: 195, name: "Punto Pickit Palermo", address: "Honduras 4800, CABA", phrase: "El barrio más cool" },
  { cx: 400, cy: 200, name: "Punto Pickit Microcentro", address: "Florida 456, CABA", phrase: "Centro de todo" },
  { cx: 405, cy: 195, name: "Punto Pickit Caballito", address: "Rivadavia 5200, CABA", phrase: "El corazón de CABA" },
  { cx: 398, cy: 205, name: "Punto Pickit Once", address: "Pueyrredón 345, CABA", phrase: "Siempre en movimiento" },
  { cx: 392, cy: 210, name: "Punto Pickit Flores", address: "Rivadavia 6700, CABA", phrase: "Tradición y barrio" },
  { cx: 408, cy: 208, name: "Punto Pickit Avellaneda", address: "Mitre 567, Avellaneda", phrase: "Zona sur conectada" },
  { cx: 395, cy: 215, name: "Punto Pickit Lanús", address: "9 de Julio 890, Lanús", phrase: "Corazón del conurbano" },
  { cx: 402, cy: 212, name: "Punto Pickit Quilmes", address: "Rivadavia 123, Quilmes", phrase: "Cervecera y cercana" },
  { cx: 388, cy: 200, name: "Punto Pickit San Isidro", address: "9 de Julio 456, San Isidro", phrase: "Zona norte premium" },
];

/* ── UTILITIES ────────────────────────────────── */

function SplitText({ text, className, as: Tag = "p" }: { text: string; className?: string; as?: "h1" | "h2" | "p" }) {
  const words = text.split(" ");
  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={i} className={styles.wordWrap}>
          <span className={styles.word}>{word}{i < words.length - 1 ? "\u00A0" : ""}</span>
        </span>
      ))}
    </Tag>
  );
}

function useScrollReveal(ref: React.RefObject<HTMLElement | null>, buildTl: (section: HTMLElement, tl: gsap.core.Timeline) => void, start = "top 80%") {
  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tl = gsap.timeline({ scrollTrigger: { trigger: section, start, once: true } });
    buildTl(section, tl);
    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/* ── COMPONENT ────────────────────────────────── */

export default function EmpresasPage() {
  const heroRef = useRef<HTMLElement>(null);
  const resultsRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const integrationsRef = useRef<HTMLElement>(null);
  const benefitsRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLElement>(null);
  const brandsRef = useRef<HTMLElement>(null);
  const whyRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);

  const [activePoint, setActivePoint] = useState<number | null>(null);

  const handlePointClick = useCallback((i: number) => {
    setActivePoint(prev => prev === i ? null : i);
  }, []);

  /* ── Hero ────────────────────────────────────── */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const heroWords = heroRef.current?.querySelectorAll(`.${styles.word}`);
      if (heroWords?.length) gsap.from(heroWords, { y: "100%", opacity: 0, duration: 1.1, stagger: 0.06, ease: "power4.out", delay: 0.2 });
      const heroTag = heroRef.current?.querySelector(`.${styles.heroTag}`);
      const heroCtas = heroRef.current?.querySelector(`.${styles.heroCtas}`);
      const heroWireframe = heroRef.current?.querySelector(`.${styles.heroWireframeWrap}`);
      gsap.from([heroTag, heroCtas].filter(Boolean), { y: 40, opacity: 0, duration: 0.9, stagger: 0.15, ease: "power4.out", delay: 0.6 });
      if (heroWireframe) gsap.from(heroWireframe, { x: 60, opacity: 0, duration: 1.2, ease: "power4.out", delay: 0.4 });
    });
    return () => ctx.revert();
  }, []);

  /* ── Results ─────────────────────────────────── */
  useScrollReveal(resultsRef, (s, tl) => {
    const w = s.querySelectorAll(`.${styles.word}`), tag = s.querySelector(`.${styles.resultsTag}`), lead = s.querySelector(`.${styles.resultsLead}`), cards = s.querySelectorAll(`.${styles.resultsGrid} > *`);
    if (tag) tl.from(tag, { y: 30, opacity: 0, duration: 0.7, ease: "power4.out" }, 0);
    if (w.length) tl.from(w, { y: "100%", opacity: 0, duration: 1, stagger: 0.08, ease: "power4.out" }, 0.1);
    if (lead) tl.from(lead, { y: 30, opacity: 0, duration: 0.8, ease: "power4.out" }, 0.4);
    if (cards.length) tl.from(cards, { y: 80, opacity: 0, duration: 0.8, stagger: 0.12, ease: "power4.out" }, 0.5);
  }, "top 75%");

  /* ── Services ────────────────────────────────── */
  useScrollReveal(servicesRef, (s, tl) => {
    const w = s.querySelectorAll(`.${styles.word}`), tag = s.querySelector(`.${styles.servicesTag}`), lead = s.querySelector(`.${styles.servicesLead}`), cards = s.querySelectorAll(`.${styles.servicesGrid} > *`);
    if (tag) tl.from(tag, { y: 30, opacity: 0, duration: 0.7, ease: "power4.out" }, 0);
    if (w.length) tl.from(w, { y: "100%", opacity: 0, duration: 1, stagger: 0.08, ease: "power4.out" }, 0.1);
    if (lead) tl.from(lead, { y: 30, opacity: 0, duration: 0.8, ease: "power4.out" }, 0.4);
    if (cards.length) tl.from(cards, { y: 100, opacity: 0, duration: 0.9, stagger: 0.15, ease: "back.out(1.7)" }, 0.5);
  });

  /* ── Integrations ────────────────────────────── */
  useScrollReveal(integrationsRef, (s, tl) => {
    const banner = s.querySelector(`.${styles.intBanner}`);
    const logos = s.querySelectorAll(`.${styles.intLogo}`);
    const photos = s.querySelectorAll(`.${styles.intPhoto}`);
    if (banner) tl.from(banner, { scale: 0.95, opacity: 0, duration: 1, ease: "power4.out" }, 0);
    if (photos.length) tl.from(photos, { scale: 0.8, opacity: 0, rotation: -5, duration: 0.8, stagger: 0.1, ease: "back.out(1.5)" }, 0.3);
    if (logos.length) tl.from(logos, { y: 40, opacity: 0, duration: 0.6, stagger: 0.1, ease: "back.out(2)" }, 0.5);
  });

  /* ── Benefits ────────────────────────────────── */
  useScrollReveal(benefitsRef, (s, tl) => {
    const w = s.querySelectorAll(`.${styles.word}`), highlights = s.querySelectorAll(`.${styles.benefitHighlight}`), items = s.querySelectorAll(`.${styles.benefitItem}`), tagline = s.querySelector(`.${styles.benefitTagline}`);
    if (tagline) tl.from(tagline, { y: 30, opacity: 0, duration: 0.7, ease: "power4.out" }, 0);
    if (w.length) tl.from(w, { y: "100%", opacity: 0, duration: 1, stagger: 0.08, ease: "power4.out" }, 0.1);
    if (highlights.length) tl.from(highlights, { x: -40, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power4.out" }, 0.4);
    if (items.length) tl.from(items, { y: 60, opacity: 0, duration: 0.8, stagger: 0.12, ease: "power4.out" }, 0.6);
  });

  /* ── Map ──────────────────────────────────────── */
  useScrollReveal(mapRef, (s, tl) => {
    const w = s.querySelectorAll(`.${styles.word}`), mapEl = s.querySelector(`.${styles.mapContainer}`), search = s.querySelector(`.${styles.mapSearch}`), dots = s.querySelectorAll(`.${styles.mapDot}`);
    if (w.length) tl.from(w, { y: "100%", opacity: 0, duration: 1, stagger: 0.08, ease: "power4.out" }, 0);
    if (search) tl.from(search, { y: 30, opacity: 0, duration: 0.8, ease: "power4.out" }, 0.3);
    if (mapEl) tl.from(mapEl, { scale: 0.9, opacity: 0, duration: 1, ease: "power4.out" }, 0.4);
    if (dots.length) tl.from(dots, { scale: 0, opacity: 0, duration: 0.4, stagger: 0.03, ease: "back.out(3)" }, 0.8);
  });

  /* ── Brands ──────────────────────────────────── */
  useScrollReveal(brandsRef, (s, tl) => {
    const w = s.querySelectorAll(`.${styles.word}`);
    const logos = s.querySelectorAll(`.${styles.brandLogo}`);
    if (w.length) tl.from(w, { y: "100%", opacity: 0, duration: 1, stagger: 0.08, ease: "power4.out" }, 0);
    if (logos.length) tl.from(logos, { y: 30, opacity: 0, duration: 0.6, stagger: 0.06, ease: "power4.out" }, 0.3);
  });

  /* ── Why choose us ───────────────────────────── */
  useScrollReveal(whyRef, (s, tl) => {
    const w = s.querySelectorAll(`.${styles.word}`);
    const cards = s.querySelectorAll(`.${styles.whyCard}`);
    if (w.length) tl.from(w, { y: "100%", opacity: 0, duration: 1, stagger: 0.08, ease: "power4.out" }, 0);
    if (cards.length) tl.from(cards, { y: 80, opacity: 0, duration: 0.9, stagger: 0.15, ease: "back.out(1.4)" }, 0.3);
  });

  /* ── Testimonials ──────────────────────────── */
  useScrollReveal(testimonialsRef, (s, tl) => {
    const w = s.querySelectorAll(`.${styles.word}`);
    const cards = s.querySelectorAll(`.${styles.testimonialCard}`);
    const tag = s.querySelector(`.${styles.testimonialTag}`);
    if (tag) tl.from(tag, { y: 30, opacity: 0, duration: 0.7, ease: "power4.out" }, 0);
    if (w.length) tl.from(w, { y: "100%", opacity: 0, duration: 1, stagger: 0.08, ease: "power4.out" }, 0.1);
    if (cards.length) tl.from(cards, { y: 100, opacity: 0, rotation: 2, duration: 1, stagger: 0.2, ease: "power4.out" }, 0.3);
  });

  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section ref={heroRef} className={styles.hero}>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <p className={styles.heroTag}>Ecosistema logístico integral</p>
              <SplitText as="h1" className={styles.heroTitle} text="Eficiencia del 99% impulsada por la mayor Red de Puntos." />
              <SplitText as="p" className={styles.heroLead} text="Pickit es el ecosistema integral que transforma tu logística desde el fulfillment hasta la distribución de última milla." />
              <div className={styles.heroCtas}>
                <a href="#contacto" className="btn-primary">Hablar con un especialista</a>
                <a href="#servicios" className="btn-secondary">Ver soluciones</a>
              </div>
            </div>
            <div className={styles.heroWireframeWrap}><HeroWireframe /></div>
          </div>
        </div>
        <div className={styles.scrollHint} aria-hidden="true"><div className={styles.scrollLine} /></div>
      </section>

      {/* ── NUESTROS RESULTADOS ──────────────────────── */}
      <section ref={resultsRef} className={styles.results} data-nav-dark>
        <div className="container">
          <div className={styles.resultsHeader}>
            <p className={styles.resultsTag}>Resultados que hablan</p>
            <SplitText as="h2" className={styles.resultsTitle} text="Nuestros resultados" />
            <p className={styles.resultsLead}>Métricas reales de operación que respaldan la confianza de más de 5.000 marcas en toda la región.</p>
          </div>
          <div className={styles.resultsGrid}>
            {RESULTS.map(({ value, label, icon }, i) => (
              <ResultCard key={label} value={value} label={label} icon={icon} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICIOS ────────────────────────────────── */}
      <section id="servicios" ref={servicesRef} className={styles.services}>
        <div className="container">
          <div className={styles.servicesHeader}>
            <p className={styles.servicesTag}>Soluciones logísticas</p>
            <SplitText as="h2" className={styles.servicesTitle} text="Servicios" />
            <p className={styles.servicesLead}>Cada modalidad diseñada para maximizar la eficiencia de tu operación y la satisfacción de tus compradores.</p>
          </div>
          <div className={styles.servicesGrid}>
            {SERVICES.map(({ title, description, icon }, i) => (
              <ServiceCard key={title} title={title} description={description} icon={icon} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── INTEGRACIONES — banner promocional ────────── */}
      <section ref={integrationsRef} className={styles.integrations}>
        <div className="container">
          <div className={styles.intBanner}>
            {/* Decorative floating photos */}
            <div className={`${styles.intPhoto} ${styles.intPhoto1}`} aria-hidden="true">
              <div className={styles.intPhotoInner}>
                <svg viewBox="0 0 80 80" fill="none"><rect width="80" height="80" rx="12" fill="oklch(0.85 0.08 55)" /><circle cx="40" cy="32" r="12" fill="oklch(0.95 0.04 55)" /><path d="M20 70 C20 54 60 54 60 70" fill="oklch(0.95 0.04 55)" /></svg>
              </div>
            </div>
            <div className={`${styles.intPhoto} ${styles.intPhoto2}`} aria-hidden="true">
              <div className={styles.intPhotoInner}>
                <svg viewBox="0 0 80 80" fill="none"><rect width="80" height="80" rx="12" fill="oklch(0.75 0.12 300)" /><circle cx="40" cy="32" r="12" fill="oklch(0.9 0.06 300)" /><path d="M20 70 C20 54 60 54 60 70" fill="oklch(0.9 0.06 300)" /></svg>
              </div>
            </div>
            <div className={`${styles.intPhoto} ${styles.intPhoto3}`} aria-hidden="true">
              <div className={styles.intPhotoInner}>
                <svg viewBox="0 0 80 80" fill="none"><rect width="80" height="80" rx="12" fill="oklch(0.8 0.1 170)" /><circle cx="40" cy="32" r="12" fill="oklch(0.92 0.05 170)" /><path d="M20 70 C20 54 60 54 60 70" fill="oklch(0.92 0.05 170)" /></svg>
              </div>
            </div>

            {/* Content */}
            <div className={styles.intBannerContent}>
              <span className={styles.intBadge}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                Conectá en minutos
              </span>
              <h2 className={styles.intBannerTitle}>Integraciones en un clic</h2>
              <p className={styles.intBannerLead}>Podés integrar tu e-commerce a través de nuestra API o en las principales plataformas.</p>

              <div className={styles.intLogos}>
                {INTEGRATIONS.map(({ name, letter }) => (
                  <div key={name} className={styles.intLogo}>
                    <span className={styles.intLogoLetter}>{letter}</span>
                    <span className={styles.intLogoName}>{name}</span>
                  </div>
                ))}
                <div className={styles.intLogo}>
                  <span className={styles.intLogoLetter}>&lt;/&gt;</span>
                  <span className={styles.intLogoName}>API</span>
                </div>
              </div>
            </div>

            {/* Decorative shapes */}
            <div className={styles.intShape1} aria-hidden="true" />
            <div className={styles.intShape2} aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* ── BENEFICIOS ───────────────────────────────── */}
      <section ref={benefitsRef} className={styles.benefits} data-nav-dark>
        <div className="container">
          <div className={styles.benefitsInner}>
            <div className={styles.benefitsLeft}>
              <p className={styles.benefitTagline}>Lo que nos diferencia</p>
              <SplitText as="h2" className={styles.benefitsTitle} text="Con Pickit es fácil" />
              <div className={styles.benefitHighlights}>
                <div className={styles.benefitHighlight}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-orange)" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                  <div><strong>Soporte 24hs</strong><p>Estamos siempre disponibles para resolver cualquier incidencia.</p></div>
                </div>
                <div className={styles.benefitHighlight}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-orange)" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                  <div><strong>Red de puntos más grande del país</strong><p>Miles de puntos estratégicamente ubicados para máxima cobertura.</p></div>
                </div>
              </div>
            </div>
            <div className={styles.benefitsRight}>
              {BENEFITS_ITEMS.map(({ text }, i) => (
                <div key={i} className={styles.benefitItem}>
                  <div className={styles.benefitNumber}>{String(i + 1).padStart(2, "0")}</div>
                  <p className={styles.benefitText}>{text}</p>
                  <div className={styles.benefitBar} aria-hidden="true"><div className={styles.benefitBarFill} style={{ animationDelay: `${i * 0.5}s` }} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONOCÉ NUESTRA RED ───────────────────────── */}
      <section ref={mapRef} className={styles.mapSection}>
        <div className="container">
          <div className={styles.mapHeader}>
            <p className={styles.mapTag}>Cobertura nacional</p>
            <SplitText as="h2" className={styles.mapTitle} text="Conocé nuestra red de puntos" />
          </div>
          <div className={styles.mapSearch}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input type="text" placeholder="Buscá por dirección, zona o ciudad..." className={styles.mapInput} readOnly />
          </div>

          <div className={styles.mapScroll}>
            <div className={styles.mapContainer}>
              <svg viewBox="0 0 800 550" fill="none" className={styles.mapSvg}>
                {/* Argentina outline */}
                <path d="M350 30 C320 40, 300 60, 290 90 C275 130, 280 160, 290 200 C295 230, 285 260, 280 290 C275 320, 270 350, 280 380 C290 410, 300 430, 310 450 C320 465, 330 475, 340 480 L360 480 C370 475, 380 465, 390 450 C400 430, 410 410, 420 380 C430 350, 425 320, 420 290 C415 260, 405 230, 410 200 C420 160, 425 130, 410 90 C400 60, 380 40, 350 30Z" stroke="var(--color-grey-light)" strokeWidth="1.5" fill="var(--color-grey-subtle)" opacity="0.4" />
                <path d="M290 140 L410 140" stroke="var(--color-grey-light)" strokeWidth="0.5" opacity="0.5" />
                <path d="M285 220 L415 220" stroke="var(--color-grey-light)" strokeWidth="0.5" opacity="0.5" />
                <path d="M280 300 L420 300" stroke="var(--color-grey-light)" strokeWidth="0.5" opacity="0.5" />
                <path d="M285 380 L415 380" stroke="var(--color-grey-light)" strokeWidth="0.5" opacity="0.5" />

                {/* Points */}
                {MAP_POINTS.map((pt, i) => (
                  <g key={i} onClick={() => handlePointClick(i)} style={{ cursor: "pointer" }}>
                    <circle cx={pt.cx} cy={pt.cy} r={i >= 27 ? 5 : 4} fill="var(--color-orange)" opacity={activePoint === i ? 1 : (i >= 27 ? 0.85 : 0.55)} className={styles.mapDot} />
                    {activePoint === i && (
                      <circle cx={pt.cx} cy={pt.cy} r="10" fill="none" stroke="var(--color-orange)" strokeWidth="1.5" opacity="0.5" className={styles.mapDotRing} />
                    )}
                  </g>
                ))}

                {/* City labels */}
                <text x="420" y="205" className={styles.mapLabel}>Buenos Aires</text>
                <text x="355" y="160" className={styles.mapLabel}>Córdoba</text>
                <text x="260" y="225" className={styles.mapLabel}>Mendoza</text>
                <text x="370" y="105" className={styles.mapLabel}>Tucumán</text>

                {/* Counter */}
                <rect x="570" y="180" width="180" height="90" rx="12" fill="var(--color-white)" stroke="var(--color-grey-subtle)" strokeWidth="1" />
                <text x="660" y="215" textAnchor="middle" className={styles.mapCounterValue}>+3.000</text>
                <text x="660" y="240" textAnchor="middle" className={styles.mapCounterLabel}>puntos activos</text>
                <text x="660" y="258" textAnchor="middle" className={styles.mapCounterSub}>en todo el país</text>
              </svg>

              {/* Tooltip */}
              {activePoint !== null && (
                <div
                  className={styles.mapTooltip}
                  style={{
                    left: `${(MAP_POINTS[activePoint].cx / 800) * 100}%`,
                    top: `${(MAP_POINTS[activePoint].cy / 550) * 100}%`,
                  }}
                >
                  <button className={styles.mapTooltipClose} onClick={() => setActivePoint(null)} aria-label="Cerrar">&times;</button>
                  <div className={styles.mapTooltipPhoto}>
                    <svg viewBox="0 0 120 70" fill="none"><rect width="120" height="70" rx="6" fill="var(--color-grey-subtle)" /><rect x="10" y="10" width="24" height="20" rx="3" fill="var(--color-orange)" opacity="0.2" /><rect x="40" y="15" width="60" height="4" rx="2" fill="var(--color-grey-light)" /><rect x="40" y="25" width="45" height="4" rx="2" fill="var(--color-grey-light)" opacity="0.5" /><rect x="10" y="42" width="100" height="4" rx="2" fill="var(--color-grey-light)" opacity="0.3" /><rect x="10" y="52" width="80" height="4" rx="2" fill="var(--color-grey-light)" opacity="0.2" /></svg>
                  </div>
                  <strong className={styles.mapTooltipName}>{MAP_POINTS[activePoint].name}</strong>
                  <p className={styles.mapTooltipAddress}>{MAP_POINTS[activePoint].address}</p>
                  <p className={styles.mapTooltipPhrase}>{MAP_POINTS[activePoint].phrase}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── MARCAS QUE NOS ACOMPAÑAN ─────────────────── */}
      <section ref={brandsRef} className={styles.brandsSection}>
        <div className="container">
          <div className={styles.brandsHeader}>
            <p className={styles.brandsTag}>Confían en nosotros</p>
            <SplitText as="h2" className={styles.brandsTitle} text="Marcas que nos acompañan" />
          </div>
          <div className={styles.brandsGrid}>
            {BRAND_LOGOS.map((name) => (
              <div key={name} className={styles.brandLogo}>
                <span className={styles.brandLogoText}>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ¿POR QUÉ NOS ELIGEN? ────────────────────── */}
      <section ref={whyRef} className={styles.whySection} data-nav-dark>
        <div className="container">
          <div className={styles.whyHeader}>
            <p className={styles.whyTag}>La diferencia Pickit</p>
            <SplitText as="h2" className={styles.whyTitle} text="¿Por qué nos eligen?" />
          </div>
          <div className={styles.whyGrid}>
            {WHY_CHOOSE.map(({ title, description, accent, illustration }, i) => (
              <div key={i} className={styles.whyCard}>
                <div className={styles.whyCardIllustration}>
                  <WhyIllustration type={illustration} />
                </div>
                <div className={styles.whyCardContent}>
                  <span className={styles.whyAccent}>{accent}</span>
                  <h3 className={styles.whyCardTitle}>{title}</h3>
                  <p className={styles.whyCardDesc}>{description}</p>
                </div>
                <div className={styles.whyCardNumber}>{String(i + 1).padStart(2, "0")}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS — Prueba Social ──────────────── */}
      <section ref={testimonialsRef} className={styles.testimonials}>
        <div className="container">
          <div className={styles.testimonialHeader}>
            <p className={styles.testimonialTag}>Prueba social</p>
            <SplitText as="h2" className={styles.testimonialTitle} text="Casos de éxito que hablan por sí solos" />
            <p className={styles.testimonialLead}>eCommerce Managers en Argentina que ya transformaron su logística con Pickit.</p>
          </div>
          <div className={styles.testimonialGrid}>
            {TESTIMONIALS.map(({ name, role, company, industry, quote, metric, metricLabel, avatar }, i) => (
              <article key={i} className={styles.testimonialCard}>
                <div className={styles.testimonialMetricBadge}>
                  <span className={styles.testimonialMetricValue}>{metric}</span>
                  <span className={styles.testimonialMetricLabel}>{metricLabel}</span>
                </div>
                <blockquote className={styles.testimonialQuote}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={styles.testimonialQuoteIcon}>
                    <path d="M4 12.5C4 9.5 5.5 7 8.5 5.5L9.5 7C7.5 8 6.5 9.5 6.5 11H9V16.5H4V12.5ZM14 12.5C14 9.5 15.5 7 18.5 5.5L19.5 7C17.5 8 16.5 9.5 16.5 11H19V16.5H14V12.5Z" fill="currentColor" />
                  </svg>
                  <p>{quote}</p>
                </blockquote>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.testimonialAvatar}>
                    <span>{avatar}</span>
                  </div>
                  <div className={styles.testimonialInfo}>
                    <strong className={styles.testimonialName}>{name}</strong>
                    <span className={styles.testimonialRole}>{role} — {company}</span>
                    <span className={styles.testimonialIndustry}>{industry}</span>
                  </div>
                </div>
                <div className={styles.testimonialCardLine} aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ── WHY ILLUSTRATIONS ─────────────────────────── */

function WhyIllustration({ type }: { type: "savings" | "flexible" | "people" | "tracking" }) {
  switch (type) {
    case "savings":
      return (
        <svg viewBox="0 0 200 120" fill="none" className={styles.whyIllSvg}>
          {/* Coins stack */}
          <ellipse cx="60" cy="90" rx="30" ry="8" fill="oklch(0.85 0.12 60)" opacity="0.3" />
          <rect x="42" y="60" width="36" height="30" rx="4" fill="oklch(0.75 0.14 60)" />
          <rect x="42" y="56" width="36" height="8" rx="4" fill="oklch(0.8 0.12 60)" />
          <rect x="48" y="42" width="24" height="8" rx="4" fill="oklch(0.82 0.1 60)" />
          <rect x="48" y="38" width="24" height="8" rx="4" fill="oklch(0.85 0.08 60)" />
          {/* Down arrow - savings */}
          <path d="M140 35 L140 80" stroke="oklch(0.7 0.15 145)" strokeWidth="3" strokeLinecap="round" className={styles.whyIllPulse} />
          <path d="M130 70 L140 82 L150 70" stroke="oklch(0.7 0.15 145)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={styles.whyIllPulse} />
          <text x="140" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="oklch(0.7 0.15 145)" fontFamily="var(--font-bricolage), system-ui">-30%</text>
        </svg>
      );
    case "flexible":
      return (
        <svg viewBox="0 0 200 120" fill="none" className={styles.whyIllSvg}>
          {/* Location pins with paths */}
          <circle cx="50" cy="70" r="6" fill="var(--color-orange)" opacity="0.8" />
          <circle cx="50" cy="70" r="12" fill="none" stroke="var(--color-orange)" strokeWidth="1" opacity="0.3" className={styles.whyIllRipple} />
          <path d="M62 68 Q100 40 138 68" stroke="oklch(0.7 0 0)" strokeWidth="1.5" strokeDasharray="4 3" className={styles.whyIllDash} />
          <circle cx="150" cy="70" r="6" fill="oklch(0.7 0.15 200)" opacity="0.8" />
          {/* Clock */}
          <circle cx="100" cy="40" r="16" fill="none" stroke="oklch(0.6 0 0)" strokeWidth="1.5" />
          <line x1="100" y1="40" x2="100" y2="30" stroke="oklch(0.5 0 0)" strokeWidth="2" strokeLinecap="round" />
          <line x1="100" y1="40" x2="108" y2="44" stroke="oklch(0.5 0 0)" strokeWidth="2" strokeLinecap="round" className={styles.whyIllClockHand} />
          <text x="100" y="108" textAnchor="middle" fontSize="9" fontWeight="600" fill="oklch(0.5 0 0)" fontFamily="var(--font-bricolage), system-ui">Cuando quieras</text>
        </svg>
      );
    case "people":
      return (
        <svg viewBox="0 0 200 120" fill="none" className={styles.whyIllSvg}>
          {/* Person 1 */}
          <circle cx="70" cy="42" r="14" fill="oklch(0.88 0.08 55)" />
          <circle cx="70" cy="38" r="6" fill="oklch(0.95 0.03 55)" />
          <path d="M58 55 C58 48 82 48 82 55" fill="oklch(0.95 0.03 55)" />
          {/* Person 2 */}
          <circle cx="130" cy="42" r="14" fill="oklch(0.78 0.1 200)" />
          <circle cx="130" cy="38" r="6" fill="oklch(0.92 0.04 200)" />
          <path d="M118 55 C118 48 142 48 142 55" fill="oklch(0.92 0.04 200)" />
          {/* Handshake / connection */}
          <path d="M84 50 Q100 35 116 50" stroke="var(--color-orange)" strokeWidth="2" fill="none" strokeLinecap="round" className={styles.whyIllPulse} />
          {/* Heart */}
          <path d="M96 42 C96 38 100 36 100 40 C100 36 104 38 104 42 C104 46 100 50 100 50 C100 50 96 46 96 42Z" fill="var(--color-orange)" opacity="0.6" className={styles.whyIllBeat} />
          <text x="100" y="90" textAnchor="middle" fontSize="9" fontWeight="600" fill="oklch(0.5 0 0)" fontFamily="var(--font-bricolage), system-ui">Soporte 24/7</text>
          <circle cx="100" cy="106" r="4" fill="oklch(0.7 0.15 145)" className={styles.whyIllPulse} />
        </svg>
      );
    case "tracking":
      return (
        <svg viewBox="0 0 200 120" fill="none" className={styles.whyIllSvg}>
          {/* Progress bar background */}
          <rect x="30" y="50" width="140" height="8" rx="4" fill="oklch(0.9 0 0)" />
          {/* Progress bar fill */}
          <rect x="30" y="50" width="138" height="8" rx="4" fill="var(--color-orange)" opacity="0.8" className={styles.whyIllTrack} />
          {/* Checkpoints */}
          <circle cx="50" cy="54" r="10" fill="oklch(0.7 0.15 145)" />
          <path d="M46 54 L49 57 L55 51" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="100" cy="54" r="10" fill="oklch(0.7 0.15 145)" />
          <path d="M96 54 L99 57 L105 51" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="150" cy="54" r="10" fill="var(--color-orange)" className={styles.whyIllPulse} />
          <path d="M146 54 L149 57 L155 51" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          {/* Labels */}
          <text x="50" y="80" textAnchor="middle" fontSize="7" fontWeight="600" fill="oklch(0.5 0 0)" fontFamily="var(--font-bricolage), system-ui">Recibido</text>
          <text x="100" y="80" textAnchor="middle" fontSize="7" fontWeight="600" fill="oklch(0.5 0 0)" fontFamily="var(--font-bricolage), system-ui">En camino</text>
          <text x="150" y="80" textAnchor="middle" fontSize="7" fontWeight="600" fill="oklch(0.5 0 0)" fontFamily="var(--font-bricolage), system-ui">Entregado</text>
          {/* Package icon */}
          <rect x="86" y="18" width="28" height="22" rx="3" fill="none" stroke="oklch(0.6 0 0)" strokeWidth="1.5" />
          <line x1="100" y1="18" x2="100" y2="40" stroke="oklch(0.6 0 0)" strokeWidth="1" />
          <line x1="86" y1="28" x2="114" y2="28" stroke="oklch(0.6 0 0)" strokeWidth="1" />
        </svg>
      );
  }
}
