"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Architecture } from "@/data/projects";

/**
 * Three stacked tiers, each a row of blocks, joined by downward arrows.
 * Rendered in the site palette rather than shipped as a deck export.
 */
export function ArchitectureDiagram({ data }: { data: Architecture }) {
  const reduced = useReducedMotion();

  return (
    <figure>
      <h2 className="text-2xl font-semibold tracking-tight text-mist-200 sm:text-3xl">
        System architecture
      </h2>
      <p className="mt-3 text-base leading-relaxed text-mist-400">{data.caption}</p>

      <div className="mt-8 flex flex-col items-stretch">
        {data.tiers.map((tier, ti) => (
          <div key={tier.label} className="contents">
            {ti > 0 && (
              <div className="flex justify-center py-3" aria-hidden>
                <svg width="14" height="20" viewBox="0 0 14 20" className="text-ink-600">
                  <path
                    d="M7 0 V13 M2 11 L7 18 L12 11"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}

            <motion.section
              initial={reduced ? undefined : { opacity: 0, y: 18 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: ti * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="surface relative overflow-hidden rounded-2xl p-5 sm:p-6"
            >
              <span
                className="absolute inset-y-0 left-0 w-[3px]"
                style={{ background: tier.accent }}
                aria-hidden
              />
              <h3
                className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em]"
                style={{ color: tier.accent }}
              >
                {tier.label}
              </h3>

              <div className="grid gap-3 sm:grid-cols-3">
                {tier.blocks.map((b) => (
                  <div
                    key={b.title}
                    className="rounded-xl border border-ink-600 bg-white/[0.05] p-4"
                  >
                    <div className="text-base font-semibold text-mist-200">{b.title}</div>
                    <ul className="mt-2.5 flex flex-col gap-1.5">
                      {b.items.map((it) => (
                        <li
                          key={it}
                          className="flex gap-2 text-sm leading-snug text-mist-400"
                        >
                          <span
                            className="mt-[6px] h-1 w-1 shrink-0 rounded-full"
                            style={{ background: tier.accent, opacity: 0.7 }}
                            aria-hidden
                          />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>
        ))}
      </div>
    </figure>
  );
}
