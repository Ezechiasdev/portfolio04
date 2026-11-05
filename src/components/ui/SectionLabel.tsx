// Petit repère au-dessus des titres : "// 02 — à propos"
export function SectionLabel({
  index,
  label,
  className = "",
}: {
  index: string;
  label: string;
  className?: string;
}) {
  return (
    <p className={`text-xs tracking-wide text-cyan ${className}`}>
      {"// "}
      {index} — {label}
    </p>
  );
}
