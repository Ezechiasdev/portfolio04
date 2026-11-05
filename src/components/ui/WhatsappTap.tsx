"use client";

import { Pointer } from "lucide-react";
import { useEffect, useState } from "react";
import { WhatsappLogo } from "./SocialIcons";

// Bouton WhatsApp rond qui clignote, avec une main qui tape dessus,
// dès que la zone `watch` (le formulaire) arrive à l'écran. S'arrête après un clic.
export function WhatsappTap({
  href,
  label,
  hint,
  watch,
}: {
  href: string;
  label: string;
  hint: string;
  watch: React.RefObject<HTMLElement | null>;
}) {
  const [inView, setInView] = useState(false);
  const [clicked, setClicked] = useState(false);
  const active = inView && !clicked;

  useEffect(() => {
    const el = watch.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.25,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [watch]);

  return (
    <span className="relative inline-grid shrink-0">
      {active && (
        <>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 animate-wa-ping rounded-full bg-whatsapp"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute right-0 bottom-full mb-2 animate-fade-in rounded-md bg-whatsapp px-2.5 py-1 text-[0.7rem] font-semibold whitespace-nowrap text-[#0b0d12] shadow-lg sm:right-auto sm:left-1/2 sm:-translate-x-1/2"
          >
            {hint}
          </span>
        </>
      )}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        title="WhatsApp"
        onClick={() => setClicked(true)}
        className={`relative grid size-11 place-items-center rounded-full bg-whatsapp text-white shadow-[0_0_20px_rgba(37,211,102,0.35)] transition hover:brightness-110 ${
          active ? "animate-wa-press" : "hover:scale-110"
        }`}
      >
        <WhatsappLogo className="size-6" />
      </a>
      {active && (
        <Pointer
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 size-7 animate-wa-tap fill-white text-[#0b0d12] drop-shadow-md motion-reduce:hidden"
          strokeWidth={1.5}
        />
      )}
    </span>
  );
}
