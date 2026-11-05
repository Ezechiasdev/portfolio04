"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// Apparition au défilement (fondu + glissement).
// Le même élément est rendu côté serveur et navigateur ; si l'utilisateur réduit les animations,
// la règle [data-reveal] de globals.css l'affiche directement (sinon le style invisible envoyé
// par le serveur restait en place et la section paraissait vide).
export function Reveal({
  children,
  delay = 0,
  x = 0,
  y = 32,
  className,
}: {
  children: ReactNode;
  delay?: number;
  x?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
