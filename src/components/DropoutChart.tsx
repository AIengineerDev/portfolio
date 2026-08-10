"use client";

import { motion, useReducedMotion } from "motion/react";
import type { DropoutPoint } from "@/data/projects";

const SERIES = [
  { key: "happo", label: "HAPPO (learned)", color: "#ff7a2f", width: 2.5 },
  { key: "antColony", label: "Ant colony", color: "#35e0d0", width: 1.75 },
  { key: "lawnmower", label: "Lawnmower", color: "#8b6bff", width: 1.75 },
] as const;

const W = 720;
const H = 300;
const PAD = { top: 24, right: 24, bottom: 44, left: 48 };

/** Mission success vs. communication dropout, drawn as a plain inline SVG. */
export function DropoutChart({ data }: { data: DropoutPoint[] }) {
  const reduced = useReducedMotion();

  const xs = data.map((d) => d.dropout);
  const xMin = Math.min(...xs);
  const xMax = Math.max(...xs);
  const yMin = 40;
  const yMax = 90;

  const x = (v: number) =>
    PAD.left + ((v - xMin) / (xMax - xMin)) * (W - PAD.left - PAD.right);
  const y = (v: number) =>
    PAD.top + (1 - (v - yMin) / (yMax - yMin)) * (H - PAD.top - PAD.bottom);

  const yTicks = [40, 50, 60, 70, 80, 90];

  return (
    <figure className="surface rounded-3xl p-5 sm:p-7">
      <figcaption className="mb-1 text-sm font-medium text-mist-200">
        Mission success under communication dropout
      </figcaption>
      <p className="mb-5 text-xs text-mist-400">
        Full-confirmation success rate, 100 held-out seeds per point. 4 UAVs · 3 UGVs · 1 km²
        Malibu Creek terrain.
      </p>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full min-w-[520px]"
          role="img"
          aria-label="Line chart: HAPPO holds 76 to 82 percent mission success up to 70 percent communication dropout, while scripted baselines fall to the high 50s immediately."
        >
          {yTicks.map((t) => (
            <g key={t}>
              <line
                x1={PAD.left}
                x2={W - PAD.right}
                y1={y(t)}
                y2={y(t)}
                stroke="rgba(139,147,176,0.14)"
                strokeWidth={1}
              />
              <text
                x={PAD.left - 10}
                y={y(t) + 4}
                textAnchor="end"
                className="fill-mist-400 text-[11px]"
              >
                {t}%
              </text>
            </g>
          ))}

          {data.map((d) => (
            <text
              key={d.dropout}
              x={x(d.dropout)}
              y={H - PAD.bottom + 20}
              textAnchor="middle"
              className="fill-mist-400 text-[11px]"
            >
              {d.dropout}%
            </text>
          ))}
          <text
            x={PAD.left + (W - PAD.left - PAD.right) / 2}
            y={H - 6}
            textAnchor="middle"
            className="fill-mist-400/70 text-[11px]"
          >
            communication dropout
          </text>

          {SERIES.map((s, si) => {
            const path = data
              .map((d, i) => `${i === 0 ? "M" : "L"} ${x(d.dropout)} ${y(d[s.key])}`)
              .join(" ");
            return (
              <g key={s.key}>
                <motion.path
                  d={path}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={s.width}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
                  whileInView={reduced ? undefined : { pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 1.3, delay: si * 0.18, ease: "easeInOut" }}
                />
                {data.map((d) => (
                  <circle
                    key={d.dropout}
                    cx={x(d.dropout)}
                    cy={y(d[s.key])}
                    r={s.key === "happo" ? 4 : 3}
                    fill="#0a0c14"
                    stroke={s.color}
                    strokeWidth={2}
                  />
                ))}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
        {SERIES.map((s) => (
          <div key={s.key} className="flex items-center gap-2 text-xs text-mist-300">
            <span
              className="h-0.5 w-5 rounded-full"
              style={{ background: s.color }}
            />
            {s.label}
          </div>
        ))}
      </div>
    </figure>
  );
}
