"use client";

import { useEffect, useRef } from "react";

/**
 * Fixed, non-interactive page backdrop: drifting aurora blobs, a fine grid,
 * and a cursor-tracked spotlight driven by CSS vars (no React re-renders).
 */
export function Backdrop() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        el.style.setProperty("--mx", `${e.clientX}px`);
        el.style.setProperty("--my", `${e.clientY}px`);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ "--mx": "50vw", "--my": "30vh" } as React.CSSProperties}
    >
      <div className="absolute inset-0 bg-ink-950" />

      <div className="absolute -top-1/3 left-[-10%] h-[70vmax] w-[70vmax] animate-aurora rounded-full bg-[radial-gradient(circle_at_center,rgba(255,122,47,0.22),transparent_60%)] blur-3xl" />
      <div
        className="absolute -right-1/4 top-1/4 h-[60vmax] w-[60vmax] animate-aurora rounded-full bg-[radial-gradient(circle_at_center,rgba(53,224,208,0.18),transparent_60%)] blur-3xl"
        style={{ animationDelay: "-8s" }}
      />
      <div
        className="absolute bottom-[-25%] left-1/4 h-[55vmax] w-[55vmax] animate-aurora rounded-full bg-[radial-gradient(circle_at_center,rgba(139,107,255,0.16),transparent_60%)] blur-3xl"
        style={{ animationDelay: "-15s" }}
      />

      {/* Survey grid */}
      <div
        className="absolute inset-0 animate-drift opacity-[0.28]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,147,176,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(139,147,176,0.10) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse 90% 70% at 50% 30%, black, transparent 80%)",
        }}
      />

      {/* Cursor spotlight */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx) var(--my), rgba(255,156,92,0.10), transparent 70%)",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(5,6,10,0.85)_100%)]" />
    </div>
  );
}
