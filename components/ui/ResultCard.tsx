"use client";

import styles from "./ResultCard.module.css";

type IconType = "gauge" | "clock" | "bolt" | "truck" | "shield";

interface ResultCardProps {
  value: string;
  label: string;
  icon: IconType;
  index: number;
}

/* Tiny animated wireframe per metric — each one unique */
function AnimatedWireframe({ icon }: { icon: IconType }) {
  return (
    <div className={styles.wireframe} aria-hidden="true">
      <svg
        viewBox="0 0 120 60"
        fill="none"
        className={styles.wireframeSvg}
      >
        {icon === "gauge" && (
          /* Animated arc gauge filling up */
          <>
            <path
              d="M20 50 A30 30 0 0 1 100 50"
              stroke="var(--color-dark-border)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M20 50 A30 30 0 0 1 100 50"
              stroke="var(--color-orange)"
              strokeWidth="3"
              strokeLinecap="round"
              className={styles.gaugeArc}
            />
            <circle cx="60" cy="50" r="3" fill="var(--color-orange)" className={styles.gaugeDot} />
          </>
        )}

        {icon === "clock" && (
          /* Clock hands rotating */
          <>
            <circle cx="60" cy="30" r="22" stroke="var(--color-dark-border)" strokeWidth="2" />
            <line
              x1="60" y1="30" x2="60" y2="14"
              stroke="var(--color-orange)"
              strokeWidth="2.5"
              strokeLinecap="round"
              className={styles.clockMinute}
            />
            <line
              x1="60" y1="30" x2="72" y2="30"
              stroke="var(--color-dark-muted)"
              strokeWidth="2"
              strokeLinecap="round"
              className={styles.clockHour}
            />
            <circle cx="60" cy="30" r="2" fill="var(--color-orange)" />
          </>
        )}

        {icon === "bolt" && (
          /* Lightning bolt with pulse */
          <>
            <polygon
              points="55,5 45,32 58,32 50,55 70,25 57,25 65,5"
              fill="none"
              stroke="var(--color-orange)"
              strokeWidth="2"
              strokeLinejoin="round"
              className={styles.boltPulse}
            />
            <circle cx="60" cy="30" r="28" stroke="var(--color-dark-border)" strokeWidth="1" className={styles.boltRing} />
          </>
        )}

        {icon === "truck" && (
          /* Delivery path with moving dot */
          <>
            <path
              d="M10 45 C30 45, 30 15, 60 15 S90 45, 110 45"
              stroke="var(--color-dark-border)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 3"
            />
            <circle r="4" fill="var(--color-orange)" className={styles.truckDot}>
              <animateMotion
                dur="3s"
                repeatCount="indefinite"
                path="M10 45 C30 45, 30 15, 60 15 S90 45, 110 45"
              />
            </circle>
            <rect x="5" y="42" width="8" height="8" rx="1" fill="var(--color-dark-border)" />
            <rect x="107" y="42" width="8" height="8" rx="1" fill="var(--color-orange)" />
          </>
        )}

        {icon === "shield" && (
          /* Shield with checkmark drawing */
          <>
            <path
              d="M60 5 L90 18 L90 38 C90 50 60 58 60 58 C60 58 30 50 30 38 L30 18 Z"
              stroke="var(--color-dark-border)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M45 30 L55 40 L75 20"
              stroke="var(--color-orange)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className={styles.shieldCheck}
            />
          </>
        )}
      </svg>
    </div>
  );
}

export default function ResultCard({ value, label, icon, index }: ResultCardProps) {
  return (
    <div
      className={styles.card}
      style={{ "--delay": `${index * 0.1}s` } as React.CSSProperties}
    >
      <AnimatedWireframe icon={icon} />
      <span className={styles.value}>{value}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
