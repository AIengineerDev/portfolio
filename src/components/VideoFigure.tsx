import type { VideoClip } from "@/data/projects";

/**
 * Self-hosted demo clip. Silent screen capture, so it loops muted with
 * controls — no autoplay, `preload="none"` keeps it off the critical path
 * until someone actually presses play.
 */
export function VideoFigure({ data }: { data: VideoClip }) {
  return (
    <figure>
      {data.heading && (
        <h2 className="mb-3 text-2xl font-semibold tracking-tight text-mist-200 sm:text-3xl">
          {data.heading}
        </h2>
      )}
      <div className="surface overflow-hidden rounded-3xl">
        <video
          className="h-auto w-full"
          controls
          loop
          muted
          playsInline
          preload="none"
          poster={data.poster}
          width={data.width}
          height={data.height}
          aria-label={data.alt}
        >
          <source src={data.src} type="video/mp4" />
          Your browser cannot play this clip.{" "}
          <a href={data.src} className="underline">
            Download it instead
          </a>
          .
        </video>
      </div>
      <figcaption className="mt-3 text-base leading-relaxed text-mist-400">
        {data.caption}
      </figcaption>
    </figure>
  );
}
