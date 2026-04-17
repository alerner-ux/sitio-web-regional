"use client";

import styles from "./HeroWireframe.module.css";

/**
 * Animated wireframe illustrating the Pickit logistics ecosystem:
 * Fulfillment warehouse → distribution routes → pickup points → last mile delivery
 */
export default function HeroWireframe() {
  return (
    <div className={styles.frame} aria-hidden="true">
      <svg viewBox="0 0 400 300" fill="none" className={styles.svg}>
        {/* ── Background grid dots ─────────────────── */}
        {Array.from({ length: 8 }).map((_, row) =>
          Array.from({ length: 10 }).map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={20 + col * 40}
              cy={20 + row * 38}
              r="1"
              fill="var(--color-grey-light)"
              opacity="0.3"
            />
          ))
        )}

        {/* ── Fulfillment center (left) ────────────── */}
        <rect
          x="20" y="100" width="80" height="60" rx="6"
          stroke="var(--color-grey-light)" strokeWidth="1.5"
          className={styles.warehouse}
        />
        <rect x="35" y="115" width="18" height="18" rx="2" fill="var(--color-orange)" opacity="0.15" className={styles.box1} />
        <rect x="57" y="115" width="18" height="18" rx="2" fill="var(--color-orange)" opacity="0.15" className={styles.box2} />
        <rect x="35" y="137" width="18" height="18" rx="2" fill="var(--color-orange)" opacity="0.15" className={styles.box3} />
        <rect x="57" y="137" width="18" height="18" rx="2" fill="var(--color-orange)" opacity="0.15" className={styles.box4} />
        <text x="60" y="92" textAnchor="middle" className={styles.label}>Fulfillment</text>

        {/* ── Distribution routes ───────────────────── */}
        <path
          d="M100 130 C140 130, 150 80, 200 80"
          stroke="var(--color-grey-light)" strokeWidth="1.5"
          strokeDasharray="6 4"
          className={styles.route}
        />
        <path
          d="M100 130 C140 130, 160 130, 200 130"
          stroke="var(--color-grey-light)" strokeWidth="1.5"
          strokeDasharray="6 4"
          className={styles.route}
        />
        <path
          d="M100 130 C140 130, 150 180, 200 180"
          stroke="var(--color-grey-light)" strokeWidth="1.5"
          strokeDasharray="6 4"
          className={styles.route}
        />

        {/* Moving packages on routes */}
        <circle r="5" fill="var(--color-orange)">
          <animateMotion dur="3s" repeatCount="indefinite" begin="0s"
            path="M100 130 C140 130, 150 80, 200 80" />
        </circle>
        <circle r="5" fill="var(--color-salmon)">
          <animateMotion dur="3.5s" repeatCount="indefinite" begin="0.8s"
            path="M100 130 C140 130, 160 130, 200 130" />
        </circle>
        <circle r="5" fill="var(--color-aqua)">
          <animateMotion dur="4s" repeatCount="indefinite" begin="0.4s"
            path="M100 130 C140 130, 150 180, 200 180" />
        </circle>

        {/* ── Pickup points (center) ───────────────── */}
        {[
          { cx: 200, cy: 80 },
          { cx: 200, cy: 130 },
          { cx: 200, cy: 180 },
        ].map((p, i) => (
          <g key={i}>
            <circle cx={p.cx} cy={p.cy} r="12" stroke="var(--color-orange)" strokeWidth="1.5" fill="none" className={styles.point} />
            <circle cx={p.cx} cy={p.cy} r="4" fill="var(--color-orange)" className={styles.pointDot} />
            {/* Ripple */}
            <circle cx={p.cx} cy={p.cy} r="12" stroke="var(--color-orange)" strokeWidth="0.5" fill="none" opacity="0" className={styles.ripple} style={{ animationDelay: `${i * 0.6}s` }} />
          </g>
        ))}
        <text x="200" y="215" textAnchor="middle" className={styles.label}>Puntos Pickit</text>

        {/* ── Last-mile routes to destinations ──────── */}
        <path
          d="M212 80 C260 60, 280 50, 320 50"
          stroke="var(--color-grey-light)" strokeWidth="1.5"
          strokeDasharray="4 3"
          className={styles.routeLastMile}
        />
        <path
          d="M212 130 C260 120, 280 110, 320 110"
          stroke="var(--color-grey-light)" strokeWidth="1.5"
          strokeDasharray="4 3"
          className={styles.routeLastMile}
        />
        <path
          d="M212 180 C260 190, 280 190, 320 180"
          stroke="var(--color-grey-light)" strokeWidth="1.5"
          strokeDasharray="4 3"
          className={styles.routeLastMile}
        />

        {/* Moving packages on last-mile */}
        <circle r="4" fill="var(--color-orange)" opacity="0.7">
          <animateMotion dur="2.5s" repeatCount="indefinite" begin="1.5s"
            path="M212 80 C260 60, 280 50, 320 50" />
        </circle>
        <circle r="4" fill="var(--color-salmon)" opacity="0.7">
          <animateMotion dur="3s" repeatCount="indefinite" begin="2s"
            path="M212 130 C260 120, 280 110, 320 110" />
        </circle>
        <circle r="4" fill="var(--color-aqua)" opacity="0.7">
          <animateMotion dur="2.8s" repeatCount="indefinite" begin="1s"
            path="M212 180 C260 190, 280 190, 320 180" />
        </circle>

        {/* ── Delivery destinations (right) ────────── */}
        {[
          { x: 320, y: 50 },
          { x: 320, y: 110 },
          { x: 320, y: 180 },
        ].map((d, i) => (
          <g key={i}>
            <rect x={d.x} y={d.y - 15} width="55" height="30" rx="5"
              stroke="var(--color-grey-light)" strokeWidth="1"
              fill="var(--color-grey-subtle)" opacity="0.4"
              className={styles.destination}
            />
            {/* Mini house/building icon */}
            <rect x={d.x + 8} y={d.y - 8} width="12" height="14" rx="1"
              fill="none" stroke="var(--color-grey-mid)" strokeWidth="1" />
            <line x1={d.x + 10} y1={d.y + 6} x2={d.x + 10} y2={d.y + 2}
              stroke="var(--color-grey-mid)" strokeWidth="1" />
            {/* Status bar */}
            <rect x={d.x + 26} y={d.y - 4} width="22" height="3" rx="1.5"
              fill="var(--color-grey-light)" opacity="0.5" />
            <rect x={d.x + 26} y={d.y + 2} width="16" height="3" rx="1.5"
              fill="var(--color-grey-light)" opacity="0.3" />
          </g>
        ))}
        <text x="347" y="215" textAnchor="middle" className={styles.label}>Última milla</text>

        {/* ── Bottom bar: "99% efficiency" indicator ── */}
        <rect x="120" y="248" width="160" height="6" rx="3" fill="var(--color-grey-subtle)" />
        <rect x="120" y="248" width="158" height="6" rx="3" fill="var(--color-orange)" opacity="0.6" className={styles.effBar} />
        <text x="200" y="272" textAnchor="middle" className={styles.labelSmall}>99% eficiencia</text>
      </svg>
    </div>
  );
}
