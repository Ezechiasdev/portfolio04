// Grandes lettres en filigrane, dessinées en SVG : purement décoratives,
// elles ne sont ni lues par les lecteurs d'écran ni prises pour le contenu principal de la page
export function Watermark({ text, className = "" }: { text: string; className?: string }) {
  return (
    <svg
      aria-hidden
      className={`watermark overflow-visible ${className}`}
      // Largeur approximative d'une lettre en Poppins 800 : 0,75 em
      style={{ width: `${text.length * 0.75}em`, height: "0.8em" }}
    >
      <text x="0" y="0.8em" fill="currentColor">
        {text}
      </text>
    </svg>
  );
}
