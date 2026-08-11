"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Gallery } from "@/data/projects";

/**
 * A wide technical diagram — the kind that is unreadable at column width.
 *
 * Two things it does that a plain <Image> does not:
 *   1. Breaks out of the article's `max-w-4xl` column, so a 3488px-wide
 *      architecture map renders at ~1.6x the text width instead of being
 *      squeezed until its labels are 4px tall.
 *   2. Opens a real zoom layer on click. The page-level figure stays clipped to
 *      its rounded card; the zoom layer is `position: fixed` and scrolls in both
 *      axes, so nothing overlaps the content beneath it and nothing is cropped.
 */

const ZOOM_STEPS = [1, 1.5, 2, 3] as const;

export function DiagramFigure({ data }: { data: Gallery }) {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState<number>(1);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  const zoomBy = useCallback((direction: 1 | -1) => {
    setZoom((current) => {
      const i = ZOOM_STEPS.indexOf(current as (typeof ZOOM_STEPS)[number]);
      const next = Math.min(Math.max(i + direction, 0), ZOOM_STEPS.length - 1);
      return ZOOM_STEPS[next];
    });
  }, []);

  // Escape closes, +/- zoom. Bound only while open so the page keeps its keys.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "+" || e.key === "=") zoomBy(1);
      if (e.key === "-" || e.key === "_") zoomBy(-1);
    };
    document.addEventListener("keydown", onKey);

    // Lock the page behind the layer, and restore exactly what was there —
    // the site sets its own overflow rules, so do not assume "visible".
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close, zoomBy]);

  // Reset the magnification between visits, and hand focus back to the opener —
  // but only on an actual close. Without the `wasOpen` guard this also fires on
  // mount and steals focus to the diagram the moment the page loads.
  const wasOpen = useRef(false);
  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      return;
    }
    if (wasOpen.current) {
      wasOpen.current = false;
      setZoom(1);
      openerRef.current?.focus({ preventScroll: true });
    }
  }, [open]);

  const width = data.width ?? 1876;
  const height = data.height ?? 1356;

  return (
    <figure>
      {/* Breakout: centred on the viewport rather than on the text column, so
          the diagram is wider than the prose without a full-bleed edge-to-edge
          look that would fight the rest of the page. */}
      {/* Width is an inline style, not a `w-[min(...)]` class: Tailwind does not
          emit the arbitrary value reliably when the value contains a comma, and
          the silent failure renders the 3488px source at natural size, which
          gives the whole page a horizontal scrollbar. */}
      <div
        className="relative left-1/2 max-w-[94vw] -translate-x-1/2"
        style={{ width: "min(88rem, 94vw)" }}
      >
        <button
          ref={openerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`${data.alt} — open the zoom view`}
          className="group surface relative block w-full cursor-zoom-in overflow-hidden rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-mist-200/60"
        >
          <Image
            src={data.src}
            alt={data.alt}
            width={width}
            height={height}
            priority
            sizes="(max-width: 1024px) 94vw, 88rem"
            className="h-auto w-full max-w-full"
          />
          <span
            className="pointer-events-none absolute bottom-4 right-4 rounded-full border border-ink-600 bg-ink-800/90 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-mist-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
            aria-hidden
          >
            Click to zoom
          </span>
        </button>
      </div>

      <figcaption className="mt-3 text-sm leading-relaxed text-mist-400">
        {data.caption}
      </figcaption>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={data.alt}
          // z-60, not z-50: the site header is `fixed … z-50`, and at equal
          // stacking the winner is decided by DOM order — which is not a
          // guarantee worth relying on for a full-screen layer.
          className="fixed inset-0 z-[60] flex flex-col bg-ink-900/95 backdrop-blur-sm"
        >
          <div className="flex shrink-0 items-center justify-between gap-4 border-b border-ink-600 px-4 py-3">
            <p className="min-w-0 truncate font-mono text-[11px] uppercase tracking-[0.14em] text-mist-400">
              {data.caption ?? data.alt}
            </p>

            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={() => zoomBy(-1)}
                disabled={zoom === ZOOM_STEPS[0]}
                aria-label="Zoom out"
                className="rounded-lg border border-ink-600 px-3 py-1.5 text-sm text-mist-300 transition-colors hover:text-mist-200 disabled:opacity-40"
              >
                −
              </button>
              <span className="w-14 text-center font-mono text-xs text-mist-400" aria-live="polite">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                onClick={() => zoomBy(1)}
                disabled={zoom === ZOOM_STEPS[ZOOM_STEPS.length - 1]}
                aria-label="Zoom in"
                className="rounded-lg border border-ink-600 px-3 py-1.5 text-sm text-mist-300 transition-colors hover:text-mist-200 disabled:opacity-40"
              >
                +
              </button>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                className="ml-2 rounded-lg border border-ink-600 px-3 py-1.5 text-sm text-mist-300 transition-colors hover:text-mist-200"
              >
                Close
                <span className="ml-2 font-mono text-[10px] text-mist-400">ESC</span>
              </button>
            </div>
          </div>

          {/* Scrolls in both axes: at 300% a 3488px map is far wider than any
              screen, and panning is the point. `overflow-hidden` here is what
              caused the clipping this component replaces. */}
          <div className="min-h-0 flex-1 overflow-auto p-4">
            <Image
              src={data.src}
              alt={data.alt}
              width={width}
              height={height}
              sizes="100vw"
              className="h-auto max-w-none"
              style={{ width: `${zoom * 100}%` }}
            />
          </div>
        </div>
      )}
    </figure>
  );
}
