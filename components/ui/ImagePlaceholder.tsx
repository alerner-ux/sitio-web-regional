interface ImagePlaceholderProps {
  label?: string;
  aspectRatio?: string;
  width?: string;
  height?: string;
  dark?: boolean;
  className?: string;
}

export default function ImagePlaceholder({
  label = "Imagen",
  aspectRatio,
  width = "100%",
  height,
  dark = false,
  className = "",
}: ImagePlaceholderProps) {
  const style: React.CSSProperties = {
    width,
    ...(height ? { height } : {}),
    ...(aspectRatio ? { aspectRatio } : {}),
  };

  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        borderRadius: "12px",
        border: `1.5px dashed ${dark ? "var(--color-dark-border)" : "var(--color-grey-light)"}`,
        background: dark ? "var(--color-dark-surface)" : "var(--color-grey-subtle)",
        color: dark ? "var(--color-dark-muted)" : "var(--color-grey-light)",
      }}
    >
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </svg>
      <span
        style={{
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          fontFamily: "var(--font-bricolage), system-ui, sans-serif",
        }}
      >
        {label}
      </span>
    </div>
  );
}
