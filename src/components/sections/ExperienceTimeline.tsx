"use client";

import { useEffect, useRef, useState } from "react";
import type { ExperienceKind } from "@content/experience";

export type TimelineItem = {
  period: string;
  role: string;
  organization: string;
  description: string;
  kind: ExperienceKind;
};

const ROW = 210; // hauteur d'une étape (px)
const TOP = 70; // décalage du premier point
const SIDE = [0.14, 0.78]; // position horizontale des points (gauche, droite)

const dotColor: Record<ExperienceKind, string> = {
  work: "#7c4dff",
  education: "#ff8a4c",
  next: "#a9a7b3",
};

function point(i: number, width: number) {
  return { x: SIDE[i % 2] * width, y: TOP + i * ROW };
}

// Courbe en S entre deux points
function curve(a: { x: number; y: number }, b: { x: number; y: number }) {
  const k = ROW * 0.6;
  return `C ${a.x} ${a.y + k}, ${b.x} ${b.y - k}, ${b.x} ${b.y}`;
}

function Entry({ item, align }: { item: TimelineItem; align: "left" | "right" }) {
  const muted = item.kind === "next";
  return (
    <div className={align === "right" ? "text-right" : ""}>
      <p
        className={`text-[0.7rem] font-semibold tracking-wide ${
          muted ? "text-navy/40" : item.kind === "education" ? "text-[#c4521f]" : "text-[#5b2fd6]"
        }`}
      >
        {item.period}
      </p>
      <h3 className={`mt-1 text-base font-bold ${muted ? "text-navy/45" : "text-navy"}`}>
        {item.role}
        {item.organization && <span className="font-normal"> · {item.organization}</span>}
      </h3>
      <p className={`mt-1 text-xs leading-6 ${muted ? "text-navy/40" : "text-navy/75"}`}>{item.description}</p>
    </div>
  );
}

export function ExperienceTimeline({ items }: { items: TimelineItem[] }) {
  const root = useRef<HTMLDivElement>(null);
  const desktop = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  // Largeur réelle du conteneur pour tracer la courbe
  useEffect(() => {
    const el = desktop.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const solidCount = items.filter((i) => i.kind !== "next").length;
  const points = items.map((_, i) => point(i, width));
  const height = TOP + (items.length - 1) * ROW + 120;

  let solidPath = "";
  let dashedPath = "";
  if (width > 0 && points.length > 0) {
    solidPath = `M ${points[0].x} 0 L ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < solidCount; i++) solidPath += ` ${curve(points[i - 1], points[i])}`;
    const last = points[solidCount - 1];
    if (last && solidCount < points.length) {
      dashedPath = `M ${last.x} ${last.y}`;
      for (let i = solidCount; i < points.length; i++) dashedPath += ` ${curve(points[i - 1], points[i])}`;
      const end = points[points.length - 1];
      dashedPath += ` C ${end.x} ${end.y + 60}, ${end.x + 40} ${end.y + 90}, ${end.x + 60} ${end.y + 120}`;
    }
  }

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let cancelled = false;
    let cleanup = () => {};

    // GSAP est chargé à part, après l'affichage de la page
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const mm = gsap.matchMedia();
        const show = (target: Element) => target.setAttribute("data-visible", "true");
        const hide = (target: Element) => target.setAttribute("data-visible", "false");

        // Animations réduites : tout est affiché d'emblée
        mm.add("(prefers-reduced-motion: reduce)", () => {
          el.querySelectorAll("[data-step]").forEach(show);
        });

        mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1024px)", () => {
          const path = el.querySelector<SVGPathElement>("[data-line]");
          if (!path) return;
          const steps = Array.from(el.querySelectorAll("[data-desktop] [data-step]"));
          const total = path.getTotalLength();

          // Longueur de ligne nécessaire pour atteindre chaque point
          const thresholds = steps.map((_, i) => {
            if (i >= solidCount) return 1;
            const probe = document.createElementNS("http://www.w3.org/2000/svg", "path");
            let d = `M ${points[0].x} 0 L ${points[0].x} ${points[0].y}`;
            for (let j = 1; j <= i; j++) d += ` ${curve(points[j - 1], points[j])}`;
            probe.setAttribute("d", d);
            return probe.getTotalLength() / total - 0.02;
          });

          gsap.set(path, { strokeDasharray: total, strokeDashoffset: total });
          steps.forEach(hide);
          gsap.to(path, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: path,
              start: "top 65%",
              end: "bottom 65%",
              scrub: 0.6,
              onUpdate: (self) => {
                steps.forEach((s, i) => (self.progress >= thresholds[i] ? show(s) : hide(s)));
              },
            },
          });
        });

        mm.add("(prefers-reduced-motion: no-preference) and (max-width: 1023px)", () => {
          const line = el.querySelector("[data-mobile-line]");
          const steps = Array.from(el.querySelectorAll("[data-mobile] [data-step]"));
          if (line) {
            gsap.fromTo(
              line,
              { scaleY: 0 },
              {
                scaleY: 1,
                ease: "none",
                scrollTrigger: { trigger: line, start: "top 70%", end: "bottom 70%", scrub: 0.6 },
              },
            );
          }
          steps.forEach((s) => {
            hide(s);
            ScrollTrigger.create({
              trigger: s,
              start: "top 70%",
              onEnter: () => show(s),
              onLeaveBack: () => hide(s),
            });
          });
        });
      }, el);
      cleanup = () => ctx.revert();
    });

    return () => {
      cancelled = true;
      cleanup();
    };
    // points est recalculé à partir de width
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, solidCount]);

  const stepClass =
    "transition-all duration-700 ease-out data-[visible=false]:translate-y-4 data-[visible=false]:opacity-0";

  return (
    <div ref={root} className="mt-14">
      {/* Grands écrans : courbe sinueuse, étapes de part et d'autre */}
      <div ref={desktop} data-desktop className="relative hidden lg:block" style={{ height }}>
        {width > 0 && (
          <svg className="absolute inset-0 overflow-visible" width={width} height={height} aria-hidden>
            {dashedPath && (
              <path d={dashedPath} fill="none" stroke="#232a4d" strokeOpacity={0.3} strokeWidth={2} strokeDasharray="6 8" />
            )}
            <path data-line d={solidPath} fill="none" stroke="#232a4d" strokeWidth={2.5} strokeLinecap="round" />
          </svg>
        )}
        <ol>
          {width > 0 &&
            items.map((item, i) => {
              const p = points[i];
              const left = i % 2 === 0;
              return (
                <li key={i} data-step className={stepClass}>
                  <span
                    className="absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-paper ring-2 ring-navy/80"
                    style={{ left: p.x, top: p.y, background: dotColor[item.kind] }}
                    aria-hidden
                  />
                  <div
                    className="absolute w-[min(22rem,44%)] -translate-y-[60%]"
                    style={left ? { left: p.x + 28, top: p.y } : { right: width - p.x + 28, top: p.y }}
                  >
                    <Entry item={item} align={left ? "left" : "right"} />
                  </div>
                </li>
              );
            })}
        </ol>
      </div>

      {/* Mobile : ligne verticale simple */}
      <div data-mobile className="relative pl-9 sm:pl-12 lg:hidden">
        <span data-mobile-line className="absolute top-1 bottom-1 left-[7px] w-[2.5px] origin-top bg-navy" aria-hidden />
        <ol className="space-y-10 sm:space-y-12">
          {items.map((item, i) => (
            <li key={i} data-step className={`relative ${stepClass}`}>
              <span
                className="absolute top-1 -left-9 size-4 sm:-left-12 rounded-full border-[3px] border-paper ring-2 ring-navy/80"
                style={{ background: dotColor[item.kind] }}
                aria-hidden
              />
              <Entry item={item} align="left" />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
