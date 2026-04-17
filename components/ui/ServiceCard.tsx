"use client";

import styles from "./ServiceCard.module.css";

export type ServiceIcon =
  | "envio-punto"
  | "retiro-punto"
  | "devoluciones"
  | "despacho"
  | "same-day"
  | "domicilio";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ServiceIcon;
  index: number;
}

function ServiceWireframe({ icon }: { icon: ServiceIcon }) {
  return (
    <div className={styles.wireframe} aria-hidden="true">
      <svg viewBox="0 0 200 100" fill="none" className={styles.wireframeSvg}>
        {icon === "envio-punto" && (
          /* Package traveling route with 2 attempts, then lands at point */
          <>
            <path d="M15 50 C50 50, 60 25, 100 25 S150 50, 185 50"
              stroke="var(--color-grey-light)" strokeWidth="1.5" strokeDasharray="5 3" className={styles.dashFlow} />
            {/* Attempt markers */}
            <circle cx="100" cy="25" r="6" stroke="var(--color-salmon)" strokeWidth="1.5" fill="none" />
            <line x1="97" y1="22" x2="103" y2="28" stroke="var(--color-salmon)" strokeWidth="1.5" />
            <line x1="103" y1="22" x2="97" y2="28" stroke="var(--color-salmon)" strokeWidth="1.5" />
            <circle cx="135" cy="38" r="6" stroke="var(--color-salmon)" strokeWidth="1.5" fill="none" opacity="0.5" />
            <line x1="132" y1="35" x2="138" y2="41" stroke="var(--color-salmon)" strokeWidth="1.5" opacity="0.5" />
            <line x1="138" y1="35" x2="132" y2="41" stroke="var(--color-salmon)" strokeWidth="1.5" opacity="0.5" />
            {/* Pickup point destination */}
            <circle cx="185" cy="50" r="10" stroke="var(--color-orange)" strokeWidth="1.5" fill="none" className={styles.pointPulse} />
            <circle cx="185" cy="50" r="4" fill="var(--color-orange)" />
            {/* Moving package */}
            <rect width="10" height="8" rx="2" fill="var(--color-orange)">
              <animateMotion dur="4s" repeatCount="indefinite"
                path="M15 50 C50 50, 60 25, 100 25 S150 50, 185 50" />
            </rect>
            <text x="185" y="72" textAnchor="middle" className={styles.miniLabel}>Punto</text>
          </>
        )}

        {icon === "retiro-punto" && (
          /* Network of points, user picks closest one */
          <>
            {/* Point network */}
            {[
              { cx: 40, cy: 30 }, { cx: 80, cy: 20 }, { cx: 120, cy: 35 },
              { cx: 60, cy: 60 }, { cx: 100, cy: 70 }, { cx: 140, cy: 55 },
            ].map((p, i) => (
              <g key={i}>
                <circle cx={p.cx} cy={p.cy} r="8" stroke="var(--color-grey-light)" strokeWidth="1" fill="none" />
                <circle cx={p.cx} cy={p.cy} r="3" fill="var(--color-grey-light)" />
              </g>
            ))}
            {/* Connecting lines */}
            <line x1="40" y1="30" x2="80" y2="20" stroke="var(--color-grey-subtle)" strokeWidth="1" />
            <line x1="80" y1="20" x2="120" y2="35" stroke="var(--color-grey-subtle)" strokeWidth="1" />
            <line x1="60" y1="60" x2="100" y2="70" stroke="var(--color-grey-subtle)" strokeWidth="1" />
            <line x1="100" y1="70" x2="140" y2="55" stroke="var(--color-grey-subtle)" strokeWidth="1" />
            <line x1="40" y1="30" x2="60" y2="60" stroke="var(--color-grey-subtle)" strokeWidth="1" />
            <line x1="120" y1="35" x2="140" y2="55" stroke="var(--color-grey-subtle)" strokeWidth="1" />
            {/* Selected point highlight */}
            <circle cx="120" cy="35" r="8" stroke="var(--color-orange)" strokeWidth="2" fill="none" className={styles.selectedPoint} />
            <circle cx="120" cy="35" r="3" fill="var(--color-orange)" />
            <circle cx="120" cy="35" r="14" stroke="var(--color-orange)" strokeWidth="0.5" fill="none" className={styles.rippleSmall} />
            {/* Person icon */}
            <circle cx="165" cy="42" r="6" stroke="var(--color-grey-mid)" strokeWidth="1.5" fill="none" />
            <path d="M155 65 C155 55, 175 55, 175 65" stroke="var(--color-grey-mid)" strokeWidth="1.5" fill="none" />
            {/* Arrow from person to point */}
            <path d="M155 42 L134 37" stroke="var(--color-orange)" strokeWidth="1.5" strokeDasharray="3 2" className={styles.dashFlow} />
          </>
        )}

        {icon === "devoluciones" && (
          /* Return flow: buyer → point → back to warehouse */
          <>
            {/* Buyer */}
            <circle cx="30" cy="50" r="8" stroke="var(--color-grey-mid)" strokeWidth="1.5" fill="none" />
            <path d="M20 75 C20 63, 40 63, 40 75" stroke="var(--color-grey-mid)" strokeWidth="1.5" fill="none" />
            {/* Arrow to point */}
            <path d="M42 50 C60 50, 70 40, 90 40"
              stroke="var(--color-orange)" strokeWidth="1.5" strokeDasharray="5 3" className={styles.dashFlow} />
            {/* Pickit point */}
            <circle cx="100" cy="40" r="10" stroke="var(--color-orange)" strokeWidth="1.5" fill="none" />
            <circle cx="100" cy="40" r="4" fill="var(--color-orange)" />
            {/* Arrow back to warehouse */}
            <path d="M112 40 C130 40, 140 50, 165 50"
              stroke="var(--color-aqua)" strokeWidth="1.5" strokeDasharray="5 3" className={styles.dashFlowReverse} />
            {/* Warehouse */}
            <rect x="165" y="35" width="30" height="25" rx="4" stroke="var(--color-grey-light)" strokeWidth="1.5" fill="none" />
            <rect x="172" y="42" width="8" height="8" rx="1" fill="var(--color-aqua)" opacity="0.3" className={styles.boxReturn} />
            {/* Moving package */}
            <rect width="8" height="6" rx="1.5" fill="var(--color-aqua)">
              <animateMotion dur="3s" repeatCount="indefinite"
                path="M42 50 C60 50, 70 40, 100 40 C120 40, 140 50, 170 50" />
            </rect>
            {/* Visibility bar */}
            <rect x="60" y="72" width="80" height="4" rx="2" fill="var(--color-grey-subtle)" />
            <rect x="60" y="72" width="80" height="4" rx="2" fill="var(--color-aqua)" opacity="0.4" className={styles.trackBar} />
          </>
        )}

        {icon === "despacho" && (
          /* Sellers → strategic points network → optimization */
          <>
            {/* Seller nodes (left) */}
            {[25, 50, 75].map((y, i) => (
              <g key={i}>
                <rect x="10" y={y - 8} width="28" height="16" rx="3"
                  stroke="var(--color-grey-light)" strokeWidth="1" fill="var(--color-grey-subtle)" opacity="0.5" />
                <rect x="15" y={y - 3} width="8" height="6" rx="1" fill="var(--color-grey-light)" />
              </g>
            ))}
            {/* Routes to points */}
            <path d="M38 25 C60 25, 70 35, 90 35" stroke="var(--color-grey-light)" strokeWidth="1" strokeDasharray="4 2" className={styles.dashFlow} />
            <path d="M38 50 C60 50, 70 50, 90 50" stroke="var(--color-grey-light)" strokeWidth="1" strokeDasharray="4 2" className={styles.dashFlow} />
            <path d="M38 75 C60 75, 70 65, 90 65" stroke="var(--color-grey-light)" strokeWidth="1" strokeDasharray="4 2" className={styles.dashFlow} />
            {/* Strategic points */}
            {[35, 50, 65].map((y, i) => (
              <g key={i}>
                <circle cx="100" cy={y} r="8" stroke="var(--color-orange)" strokeWidth="1.5" fill="none" className={styles.pointPulse} style={{ animationDelay: `${i * 0.4}s` }} />
                <circle cx="100" cy={y} r="3" fill="var(--color-orange)" />
              </g>
            ))}
            {/* Cost optimization visual */}
            <rect x="135" y="25" width="50" height="50" rx="6" stroke="var(--color-grey-light)" strokeWidth="1" fill="none" />
            <text x="160" y="42" textAnchor="middle" className={styles.costLabel}>$</text>
            <path d="M145 60 L155 52 L165 56 L175 45" stroke="var(--color-aqua)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.costLine} />
          </>
        )}

        {icon === "same-day" && (
          /* Clock showing 4hrs, store → pickup → fast delivery */
          <>
            {/* Clock */}
            <circle cx="40" cy="50" r="25" stroke="var(--color-grey-light)" strokeWidth="1.5" fill="none" />
            <line x1="40" y1="50" x2="40" y2="32" stroke="var(--color-orange)" strokeWidth="2" strokeLinecap="round" className={styles.clockHandFast} />
            <line x1="40" y1="50" x2="52" y2="50" stroke="var(--color-grey-mid)" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="40" cy="50" r="2.5" fill="var(--color-orange)" />
            <text x="40" y="85" textAnchor="middle" className={styles.miniLabel}>4hs máx</text>
            {/* Fast route */}
            <path d="M68 50 C90 50, 100 35, 130 35 S160 50, 185 50"
              stroke="var(--color-orange)" strokeWidth="2" strokeDasharray="8 4" className={styles.dashFlowFast} />
            {/* Speed lines */}
            <line x1="110" y1="28" x2="125" y2="28" stroke="var(--color-orange)" strokeWidth="1" opacity="0.4" className={styles.speedLine} />
            <line x1="115" y1="22" x2="130" y2="22" stroke="var(--color-orange)" strokeWidth="1" opacity="0.3" className={styles.speedLine2} />
            {/* Destination */}
            <rect x="170" y="38" width="25" height="22" rx="4" stroke="var(--color-grey-light)" strokeWidth="1.5" fill="none" />
            <path d="M177 45 L182 40 L187 45" stroke="var(--color-grey-mid)" strokeWidth="1" fill="none" />
            <line x1="182" y1="40" x2="182" y2="53" stroke="var(--color-grey-mid)" strokeWidth="1" />
            {/* Moving bolt */}
            <polygon points="0,-5 -4,1 -1,1 -2,5 4,-1 1,-1" fill="var(--color-orange)">
              <animateMotion dur="2s" repeatCount="indefinite"
                path="M68 50 C90 50, 100 35, 130 35 S160 50, 185 50" />
            </polygon>
          </>
        )}

        {icon === "domicilio" && (
          /* Simple door-to-door delivery */
          <>
            {/* Store/origin */}
            <rect x="15" y="30" width="35" height="35" rx="5" stroke="var(--color-grey-light)" strokeWidth="1.5" fill="none" />
            <rect x="22" y="38" width="10" height="10" rx="2" fill="var(--color-orange)" opacity="0.2" className={styles.boxReturn} />
            <rect x="34" y="38" width="10" height="10" rx="2" fill="var(--color-orange)" opacity="0.15" />
            <rect x="22" y="50" width="10" height="10" rx="2" fill="var(--color-orange)" opacity="0.1" />
            {/* Smooth route */}
            <path d="M55 48 C80 48, 95 30, 120 30 S155 48, 175 48"
              stroke="var(--color-grey-light)" strokeWidth="1.5" strokeDasharray="6 3" className={styles.dashFlow} />
            {/* House destination */}
            <path d="M165 30 L180 20 L195 30" stroke="var(--color-grey-mid)" strokeWidth="2" fill="none" strokeLinejoin="round" />
            <rect x="168" y="30" width="24" height="20" rx="2" stroke="var(--color-grey-mid)" strokeWidth="1.5" fill="none" />
            <rect x="176" y="38" width="8" height="12" rx="1" fill="var(--color-grey-light)" opacity="0.5" />
            {/* Checkmark on delivery */}
            <circle cx="180" cy="65" r="8" fill="none" stroke="var(--color-aqua)" strokeWidth="1.5" className={styles.checkCircle} />
            <path d="M175 65 L178 68 L185 61" stroke="var(--color-aqua)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.checkMark} />
            {/* Moving package */}
            <rect width="10" height="8" rx="2" fill="var(--color-orange)">
              <animateMotion dur="3.5s" repeatCount="indefinite"
                path="M55 48 C80 48, 95 30, 120 30 S155 48, 175 48" />
            </rect>
          </>
        )}
      </svg>
    </div>
  );
}

export default function ServiceCard({ title, description, icon, index }: ServiceCardProps) {
  return (
    <div
      className={styles.card}
      style={{ "--delay": `${index * 0.1}s` } as React.CSSProperties}
    >
      <ServiceWireframe icon={icon} />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
