"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import type { Project } from "@/data/projects";

const statusLabel: Record<Project["status"], string> = {
  shipped: "Shipped",
  "in-progress": "In progress",
  research: "Research",
};

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 180, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 180, damping: 20 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
    setHovered(false);
  };

  const [from, to] = project.accent;

  // Honor the cover's own shape (clamped) instead of forcing 16:9 — a wide
  // architecture diagram cropped to 16:9 loses both edges.
  const cover = project.cover;
  const coverRatio = cover?.width && cover?.height ? cover.width / cover.height : 16 / 9;
  const cardRatio = Math.min(2.4, Math.max(1.5, coverRatio));

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={reset}
      initial={reduced ? undefined : { opacity: 0, y: 40 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 1200 }}
      className="group relative"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="surface block overflow-hidden rounded-3xl transition-shadow duration-500 hover:shadow-[0_30px_80px_-40px_rgba(255,122,47,0.45)]"
      >
        {/* Accent glow that tracks the pointer */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${mx.get() * 100}% ${my.get() * 100}%, ${from}18, transparent 60%)`,
          }}
        />

        {project.cover && (
          <div
            className="relative overflow-hidden border-b border-ink-600"
            style={{ aspectRatio: String(cardRatio) }}
          >
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              fill
              sizes="(max-width: 768px) 100vw, 900px"
              priority={index === 0}
              className="object-cover object-center transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/20 to-transparent" />
            {hovered && !reduced && (
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                  className="h-24 w-full animate-scan"
                  style={{
                    background: `linear-gradient(to bottom, transparent, ${to}22, transparent)`,
                  }}
                />
              </div>
            )}
          </div>
        )}

        <div className="relative p-7 sm:p-9">
          <div className="mb-4 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-mist-400">
            <span
              className="rounded-full px-2.5 py-1"
              style={{ background: `${from}1f`, color: from }}
            >
              {statusLabel[project.status]}
            </span>
            <span>{project.domain}</span>
            <span className="text-mist-400">/</span>
            <span>{project.year}</span>
          </div>

          <h3 className="text-3xl font-semibold tracking-tight text-mist-200 sm:text-4xl">
            {project.title}
          </h3>
          <p className="mt-3 max-w-2xl text-pretty text-lg leading-relaxed text-mist-300">
            {project.tagline}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {project.metrics.slice(0, 4).map((m) => (
              <div key={m.label}>
                <div
                  className="text-2xl font-semibold tabular-nums"
                  style={{ color: to }}
                >
                  {m.value}
                </div>
                <div className="mt-0.5 text-sm leading-snug text-mist-400">{m.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-7 flex items-center gap-2 text-sm font-medium text-mist-300">
            Read the case study
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
