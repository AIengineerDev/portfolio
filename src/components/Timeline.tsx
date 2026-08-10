import type { Role } from "@/data/profile";
import { Reveal } from "@/components/Reveal";

export function Timeline({ roles }: { roles: Role[] }) {
  return (
    <ol className="relative flex flex-col gap-12 border-l border-ink-600/60 pl-7 sm:pl-9">
      {roles.map((role, i) => (
        <li key={`${role.org}-${role.period}`} className="relative">
          {/* Node on the rail */}
          <span
            className="absolute -left-[35px] top-1.5 flex h-3 w-3 items-center justify-center sm:-left-[43px]"
            aria-hidden
          >
            {role.current && (
              <span className="absolute h-3 w-3 animate-pulse-ring rounded-full bg-ember-500" />
            )}
            <span
              className={`relative h-3 w-3 rounded-full border-2 ${
                role.current
                  ? "border-ember-500 bg-ember-500"
                  : "border-ink-600 bg-ink-900"
              }`}
            />
          </span>

          <Reveal delay={i * 0.06} y={18}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-xl font-semibold tracking-tight text-mist-200">
                {role.title}
              </h3>
              {role.current && (
                <span className="rounded-full bg-ember-500/15 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ember-400">
                  Current
                </span>
              )}
            </div>

            <p className="mt-1 text-sm text-mist-300">
              {role.org}
              {role.context && (
                <span className="text-mist-400"> · {role.context}</span>
              )}
            </p>
            <p className="mt-0.5 font-mono text-xs tracking-wide text-mist-400">
              {role.period}
            </p>

            <ul className="mt-4 flex flex-col gap-2.5">
              {role.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-sm leading-relaxed text-mist-400">
                  <span
                    className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-flux-500/70"
                    aria-hidden
                  />
                  <span className="text-pretty">{h}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {role.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-ink-600/80 px-2.5 py-0.5 text-[11px] text-mist-400"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
