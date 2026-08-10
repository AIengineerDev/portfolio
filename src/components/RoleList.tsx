import type { Role } from "@/data/profile";
import { Reveal } from "@/components/Reveal";

/** Compact roles — one card each, no timeline rail. The narrative lives above. */
export function RoleList({ roles }: { roles: Role[] }) {
  return (
    <div className="flex flex-col gap-4">
      {roles.map((role, i) => (
        <Reveal key={`${role.org}-${role.period}`} delay={i * 0.06} y={18}>
          <div className="surface rounded-2xl p-6 sm:p-7">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="text-xl font-semibold tracking-tight text-mist-200">
                  {role.title}
                </h3>
                {role.current && (
                  <span className="rounded-full bg-ember-500/20 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ember-400">
                    Current
                  </span>
                )}
              </div>
              <span className="font-mono text-xs tracking-wide text-ember-400">
                {role.period}
              </span>
            </div>

            <p className="mt-1.5 text-base font-medium text-mist-300">
              {role.org}
              {role.context && (
                <span className="font-normal text-mist-400"> · {role.context}</span>
              )}
            </p>

            <p className="mt-3 text-pretty leading-relaxed text-mist-400">{role.blurb}</p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {role.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-ink-600 bg-white/[0.04] px-2.5 py-1 text-[11px] text-mist-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
