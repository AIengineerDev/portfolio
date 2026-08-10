import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Timeline } from "@/components/Timeline";
import {
  certifications,
  education,
  experience,
  profile,
  skills,
  stats,
} from "@/data/profile";

export const metadata: Metadata = {
  title: "Experience & Education",
  description: `${profile.headline}. ${profile.focus}.`,
};

export default function AboutPage() {
  return (
    <div className="px-6 pb-32 pt-32">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-mist-400">
            Experience &amp; education
          </p>
          <h1 className="mt-5 text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-5 text-xl leading-relaxed text-mist-300">{profile.headline}</p>
          <p className="mt-2 font-mono text-xs tracking-wide text-mist-400">{profile.focus}</p>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-mist-400">
            <span>{profile.location}</span>
            <a
              href={`mailto:${profile.email}`}
              className="underline decoration-ink-600 underline-offset-4 transition-colors hover:text-mist-200 hover:decoration-mist-400"
            >
              {profile.email}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-ink-600 underline-offset-4 transition-colors hover:text-mist-200 hover:decoration-mist-400"
            >
              LinkedIn ↗
            </a>
          </div>
        </Reveal>

        <Reveal className="mt-14">
          <div className="flex flex-col gap-4">
            {profile.summary.map((p) => (
              <p key={p} className="text-pretty leading-relaxed text-mist-300">
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-14">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-ink-600/70 bg-ink-600/40 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-ink-900/80 p-6">
                <div className="text-3xl font-semibold tabular-nums text-flux-400">
                  {s.value}
                </div>
                <div className="mt-1.5 text-sm leading-snug text-mist-400">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <section className="mt-24">
          <Reveal>
            <h2 className="mb-10 text-3xl font-semibold tracking-tight sm:text-4xl">
              Experience
            </h2>
          </Reveal>
          <Timeline roles={experience} />
        </section>

        <section className="mt-24">
          <Reveal>
            <h2 className="mb-8 text-3xl font-semibold tracking-tight sm:text-4xl">
              Education
            </h2>
          </Reveal>
          <div className="flex flex-col gap-4">
            {education.map((e, i) => (
              <Reveal key={e.degree} delay={i * 0.07}>
                <div className="surface rounded-2xl p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-lg font-semibold text-mist-200">{e.degree}</h3>
                    <span className="font-mono text-xs tracking-wide text-mist-400">
                      {e.period}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-mist-300">{e.school}</p>
                  {e.detail && (
                    <p className="mt-3 text-sm leading-relaxed text-mist-400">{e.detail}</p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-6">
            <div className="surface rounded-2xl p-6">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist-400">
                Certifications
              </h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {certifications.map((c) => (
                  <li key={c} className="flex gap-2.5 text-sm text-mist-300">
                    <span
                      className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-violet-500"
                      aria-hidden
                    />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>

        <section className="mt-24">
          <Reveal>
            <h2 className="mb-8 text-3xl font-semibold tracking-tight sm:text-4xl">
              Skills
            </h2>
          </Reveal>
          <div className="flex flex-col gap-5">
            {skills.map((group, i) => (
              <Reveal key={group.label} delay={i * 0.05}>
                <div className="grid gap-3 border-t border-ink-700/60 pt-5 sm:grid-cols-[200px_1fr] sm:gap-6">
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist-400">
                    {group.label}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((it) => (
                      <span
                        key={it}
                        className="rounded-full border border-ink-600 px-3 py-1 text-xs text-mist-300"
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal className="mt-24">
          <div className="surface relative overflow-hidden rounded-3xl px-8 py-14 text-center">
            <div className="pointer-events-none absolute inset-x-0 -top-32 h-64 bg-[radial-gradient(ellipse_at_center,rgba(255,122,47,0.2),transparent_70%)]" />
            <h2 className="relative text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
              The work behind the résumé
            </h2>
            <p className="relative mx-auto mt-3 max-w-md leading-relaxed text-mist-400">
              Case studies go deeper than bullet points — including the numbers that did not
              go the way we expected.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/#work"
                className="rounded-full bg-mist-200 px-6 py-3 text-sm font-medium text-ink-950 transition-transform hover:scale-[1.03]"
              >
                See the projects
              </Link>
              <a
                href={`mailto:${profile.email}`}
                className="rounded-full border border-ink-600 px-6 py-3 text-sm font-medium text-mist-300 transition-colors hover:border-mist-400 hover:text-mist-200"
              >
                Get in touch
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
