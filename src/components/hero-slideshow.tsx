import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const SLIDES = [
  "/hero-slides/slide-1.jpg",
  "/hero-slides/slide-2.jpg",
  "/hero-slides/slide-3.jpg",
  "/hero-slides/slide-4.jpg",
  "/hero-slides/slide-5.jpg",
  "/hero-slides/slide-6.jpg",
];

// Slow "Ken Burns" drift - each slide moves in a different direction.
const DRIFTS = [
  { from: { scale: 1.04, x: "0%", y: "0%" }, to: { scale: 1.1, x: "-1%", y: "-0.5%" } },
  { from: { scale: 1.1, x: "1%", y: "0.5%" }, to: { scale: 1.05, x: "0%", y: "0%" } },
  { from: { scale: 1.04, x: "1%", y: "0%" }, to: { scale: 1.1, x: "-1.5%", y: "0%" } },
  { from: { scale: 1.04, x: "-1%", y: "1%" }, to: { scale: 1.1, x: "0.5%", y: "-1%" } },
];

const SHOW_MS = 7000;
const FADE_S = 1.8;

export function HeroSlideshow({ alt = "Children learning in a classroom" }: { alt?: string }) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  // Preload every slide so transitions never flash empty.
  useEffect(() => {
    SLIDES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), SHOW_MS);
    return () => window.clearInterval(id);
  }, []);

  const drift = DRIFTS[index % DRIFTS.length];

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden={false}>
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_S, ease: "easeInOut" }}
        >
          <motion.img
            src={SLIDES[index]}
            alt={alt}
            className="h-full w-full object-cover object-center"
            initial={reduceMotion ? false : drift.from}
            animate={reduceMotion ? undefined : drift.to}
            transition={{ duration: (SHOW_MS / 1000) + FADE_S + 0.5, ease: "linear" }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
