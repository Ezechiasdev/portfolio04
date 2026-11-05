"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// Three.js est chargé à part, uniquement dans le navigateur
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

function canUse3D() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    const canvas = document.createElement("canvas");
    if (!canvas.getContext("webgl2") && !canvas.getContext("webgl")) return false;
  } catch {
    return false;
  }
  // Appareils peu puissants : on garde la version statique
  const nav = navigator as Navigator & { deviceMemory?: number };
  if (nav.deviceMemory !== undefined && nav.deviceMemory < 4) return false;
  if (navigator.hardwareConcurrency <= 4 && innerWidth < 768) return false;
  return true;
}

// Version statique légère : mêmes formes en CSS
function StaticShapes() {
  return (
    <>
      <div className="absolute top-[3%] -left-12 h-16 w-44 -rotate-[25deg] rounded-full bg-[linear-gradient(135deg,#5ce1e6,#7c4dff_60%,#ff6fd8)] opacity-80 blur-[1px] sm:top-[12%] sm:left-[4%] sm:h-28 sm:w-72" />
      <div className="absolute -right-14 bottom-[3%] h-24 w-52 -rotate-[20deg] rounded-full bg-[linear-gradient(160deg,#a26bff,#4b2bd1_55%,#5ce1e6)] opacity-80 blur-[1px] sm:top-[42%] sm:right-[2%] sm:bottom-auto sm:h-44 sm:w-80" />
      <div className="absolute top-[6%] right-[12%] size-10 sm:top-[14%] sm:right-[22%] rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffc27a,#ff8a4c_55%,#d9512a)] shadow-[0_0_60px_10px_rgba(255,138,76,0.45)] sm:size-14" />
      <div className="absolute bottom-[22%] left-[30%] size-10 rotate-12 border border-cyan/40" />
      <div className="absolute top-[8%] left-[55%] size-6 rotate-45 border border-cyan/30" />
    </>
  );
}

export function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  // "pending" : rien d'affiché le temps de choisir ; "static" : formes CSS ; "3d" : Three.js
  const [mode, setMode] = useState<"pending" | "static" | "3d">("pending");
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // La 3D attend que le contenu principal soit affiché
    const start = () => setMode(canUse3D() ? "3d" : "static");
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(start, { timeout: 2500 });
      return () => cancelIdleCallback(id);
    }
    const id = setTimeout(start, 1200);
    return () => clearTimeout(id);
  }, []);

  // Pause de l'animation quand l'accueil n'est plus à l'écran
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {mode === "static" && (
        <div className="absolute inset-0 animate-fade-in">
          <StaticShapes />
        </div>
      )}
      {mode === "3d" && (
        <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
          <HeroScene active={visible} onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
