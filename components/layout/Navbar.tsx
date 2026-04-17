"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Navbar.module.css";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "Empresas", href: "/empresas" },
  { label: "Emprendedores", href: "/emprendedores" },
  { label: "Puntos Pickit", href: "/puntos-pickit" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const darkSections = document.querySelectorAll("[data-nav-dark]");
    if (!darkSections.length) return;

    const triggers: ScrollTrigger[] = [];

    darkSections.forEach((section) => {
      const links = header.querySelectorAll(`.${styles.link}:not(.${styles.active})`);
      const activeLinks = header.querySelectorAll(`.${styles.link}.${styles.active}`);
      const trackLink = header.querySelector(`.${styles.trackLink}`);

      const tl = gsap.timeline({ paused: true });

      tl.to(header, {
        backgroundColor: "#0F0F0F",
        borderBottomColor: "#2A2A2A",
        duration: 0.5,
        ease: "power2.inOut",
      }, 0);

      tl.to(links, {
        color: "#999999",
        duration: 0.5,
        ease: "power2.inOut",
      }, 0);

      tl.to(activeLinks, {
        color: "#FFFFFF",
        duration: 0.5,
        ease: "power2.inOut",
      }, 0);

      if (trackLink) {
        tl.to(trackLink, {
          color: "#66D4F0",
          duration: 0.5,
          ease: "power2.inOut",
        }, 0);
      }

      /* Trigger when the dark section appears on the bottom of viewport
         (start: "top 85%") — the whole page feels like it goes dark early.
         Reverse when the section leaves viewport. */
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top 85%",
        end: "bottom top+=64",
        onEnter: () => tl.play(),
        onLeave: () => tl.reverse(),
        onEnterBack: () => tl.play(),
        onLeaveBack: () => tl.reverse(),
      });

      triggers.push(st);
    });

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, [pathname]);

  return (
    <header ref={headerRef} className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo}>
          pickit
        </Link>

        <nav aria-label="Navegación principal" className={styles.nav}>
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`${styles.link} ${isActive ? styles.active : ""}`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.right}>
          <Link href="/seguir-envio" className={styles.trackLink}>
            Seguir envío
          </Link>
          <a href="#contacto" className={`btn-primary ${styles.cta}`}>
            Hablar con ventas
          </a>
        </div>
      </div>
    </header>
  );
}
