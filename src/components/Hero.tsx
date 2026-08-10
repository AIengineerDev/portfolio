"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

const line = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.09, duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function Hero() {
  const reduced = useReducedMotion();
  const anim = reduced ? {} : { initial: "hidden" as const, animate: "show" as const, variants: line };

  return (
    <section className="relative flex min-h-[92vh] flex-col justify-center px-6 pt-32">
      <div className="mx-auto w-full max-w-5xl">
        <motion.p
          custom={0}
          {...anim}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-ink-600/70 bg-white/[0.03] px-3.5 py-1.5 font-mono text-xs tracking-wide text-mist-400"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-flux-500" />
          AI / ML engineer · multi-agent systems
        </motion.p>

        <motion.h1
          custom={1}
          {...anim}
          className="max-w-4xl text-balance text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl"
        >
          I build systems that <span className="text-gradient">learn to coordinate</span> under
          pressure.
        </motion.h1>

        <motion.p
          custom={2}
          {...anim}
          className="mt-7 max-w-2xl text-lg leading-relaxed text-mist-400"
        >
          Reinforcement learning, simulation, and applied ML — with a bias toward the messy
          conditions where systems actually break. Below is selected work.
        </motion.p>

        <motion.div custom={3} {...anim} className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="#work"
            className="group relative overflow-hidden rounded-full bg-mist-200 px-6 py-3 text-sm font-medium text-ink-950 transition-transform hover:scale-[1.03]"
          >
            <span className="relative z-10">View the work</span>
          </Link>
          <Link
            href="#contact"
            className="rounded-full border border-ink-600 px-6 py-3 text-sm font-medium text-mist-300 transition-colors hover:border-mist-400 hover:text-mist-200"
          >
            Get in touch
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={reduced ? undefined : { opacity: 0 }}
        animate={reduced ? undefined : { opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-mist-400/60"
      >
        scroll
      </motion.div>
    </section>
  );
}
