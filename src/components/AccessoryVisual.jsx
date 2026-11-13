export default function AccessoryVisual({ kind, finish, className = "", label }) {
  const tone = finish?.back || "#f2f2f4";
  const edge = finish?.shadow || "#c6c6c8";
  const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": true };

  return (
    <div className={className || "w-28"} {...a11y}>
      <svg viewBox="0 0 160 160" className="h-auto w-full">
        {kind === "case" ? (
          <>
            <rect x="42" y="18" width="76" height="124" rx="18" fill={tone} stroke={edge} strokeWidth="3" />
            <rect x="58" y="30" width="44" height="16" rx="6" fill="#1d1d1f" />
            <circle cx="80" cy="118" r="4" fill={edge} />
          </>
        ) : null}
        {kind === "clear" ? (
          <>
            <rect x="42" y="18" width="76" height="124" rx="18" fill="rgba(255,255,255,0.45)" stroke="#c8c8c8" strokeWidth="3" />
            <rect x="58" y="30" width="44" height="16" rx="6" fill="none" stroke="#9a9a9e" strokeWidth="2" />
            <circle cx="80" cy="118" r="4" fill="none" stroke="#9a9a9e" strokeWidth="2" />
          </>
        ) : null}
        {kind === "charger" ? (
          <>
            <circle cx="80" cy="78" r="42" fill="#f7f7f8" stroke="#d2d2d7" strokeWidth="3" />
            <circle cx="80" cy="78" r="22" fill="none" stroke="#c7c7cc" strokeWidth="3" />
            <path d="M80 120 v18" stroke="#d2d2d7" strokeWidth="4" strokeLinecap="round" />
          </>
        ) : null}
        {kind === "cable" ? (
          <path
            d="M38 96c18-40 28-40 40-18s18 36 34 8"
            fill="none"
            stroke="#d2d2d7"
            strokeWidth="8"
            strokeLinecap="round"
          />
        ) : null}
        {kind === "battery" ? (
          <>
            <rect x="36" y="40" width="88" height="80" rx="18" fill="#f7f7f8" stroke="#d2d2d7" strokeWidth="3" />
            <circle cx="80" cy="80" r="18" fill="none" stroke="#c7c7cc" strokeWidth="3" />
          </>
        ) : null}
      </svg>
    </div>
  );
}
