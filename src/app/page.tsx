import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import {
  certifications,
  education,
  profile,
  skills,
  stats,
} from "@/data/profile";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <>
      <Hero />

      {/* ---------------------------------------------------------------- */}
      <section id="experience" className="scroll-mt-24 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-flux-400">
              Experience
            </p>
            <h2 className="mt-3 max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              I work on the part of machine learning that has to survive contact with the real
              world.
            </h2>

            <div className="mt-7 flex max-w-3xl flex-col gap-4">
              {profile.summary.map((p) => (
                <p key={p} className="text-pretty text-lg leading-relaxed text-mist-300">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-ink-600 bg-ink-600 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-ink-800 p-6">
                  <div className="text-3xl font-semibold tabular-nums text-flux-400">
                    {s.value}
                  </div>
                  <div className="mt-1.5 text-base leading-snug text-mist-400">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>

        </div>
      </section>

      <section id="education" className="scroll-mt-24 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-flux-400">
              Education
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Where it came from
            </h2>
          </Reveal>

          <div className="mt-10 flex flex-col gap-4">
            {education.map((e, i) => (
              <Reveal key={e.degree} delay={i * 0.07}>
                <div className="surface rounded-2xl p-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-xl font-semibold text-mist-200">{e.degree}</h3>
                    <span className="font-mono text-xs tracking-wide text-ember-400">
                      {e.period}
                    </span>
                  </div>
                  <p className="mt-1.5 text-lg text-mist-300">{e.school}</p>
                  {e.detail && (
                    <p className="mt-3 text-lg leading-relaxed text-mist-400">{e.detail}</p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-4">
            <div className="surface rounded-2xl p-7">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist-400">
                Certifications
              </h3>
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {certifications.map((c) => (
                  <li key={c} className="flex gap-3 text-base text-mist-300">
                    <span
                      className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500"
                      aria-hidden
                    />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="skills" className="scroll-mt-24 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-flux-400">
              Toolkit
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Skills</h2>
          </Reveal>

          <div className="mt-10 flex flex-col gap-6">
            {skills.map((group, i) => (
              <Reveal key={group.label} delay={i * 0.05}>
                <div className="grid gap-3 border-t border-ink-700 pt-6 sm:grid-cols-[210px_1fr] sm:gap-6">
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ember-400">
                    {group.label}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((it) => (
                      <span
                        key={it}
                        className="rounded-full border border-ink-600 bg-white/[0.04] px-3 py-1.5 text-sm text-mist-300"
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="work" className="scroll-mt-24 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="mb-12 flex items-end justify-between gap-6">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-flux-400">
                  Selected work
                </p>
                <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                  Projects
                </h2>
              </div>
              <p className="hidden max-w-xs text-base leading-relaxed text-mist-400 sm:block">
                Each case study covers the problem, the approach, and what the numbers actually
                showed — including where they did not hold.
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col gap-10">
            {projects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="contact" className="scroll-mt-24 px-6 pb-32 pt-16">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="surface relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16">
              <div className="pointer-events-none absolute inset-x-0 -top-32 h-64 bg-[radial-gradient(ellipse_at_center,rgba(255,138,66,0.3),transparent_70%)]" />
              <p className="relative font-mono text-xs uppercase tracking-[0.28em] text-flux-400">
                Contact
              </p>
              <h2 className="relative mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Working on something that has to coordinate?
              </h2>
              <p className="relative mx-auto mt-4 max-w-lg text-lg leading-relaxed text-mist-300">
                Open to research collaborations and applied ML work in robotics, simulation, and
                multi-agent systems.
              </p>
              <div className="relative mt-9 flex flex-wrap justify-center gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="rounded-full bg-mist-200 px-6 py-3 text-sm font-medium text-ink-950 transition-transform hover:scale-[1.03]"
                >
                  {profile.email}
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-ink-600 px-6 py-3 text-sm font-medium text-mist-300 transition-colors hover:border-mist-400 hover:text-mist-200"
                >
                  LinkedIn ↗
                </a>
                <Link
                  href="/projects/omnisearch"
                  className="rounded-full border border-ink-600 px-6 py-3 text-sm font-medium text-mist-300 transition-colors hover:border-mist-400 hover:text-mist-200"
                >
                  OmniSearch case study
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
