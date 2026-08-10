import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/data/projects";

const focus = [
  {
    title: "Multi-agent RL",
    body: "Heterogeneous policies, trust-region methods, and the reward design that makes cooperation emerge instead of collapse.",
  },
  {
    title: "Simulation",
    body: "Environments scaled in physical units, built from real terrain, fast enough to train on and honest enough to trust.",
  },
  {
    title: "Applied perception",
    body: "Detection stacks validated against real imagery, with failure modes reported by bucket rather than averaged away.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      <section id="work" className="scroll-mt-24 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="mb-12 flex items-end justify-between gap-6">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-mist-400">
                  Selected work
                </p>
                <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                  Projects
                </h2>
              </div>
              <p className="hidden max-w-xs text-sm leading-relaxed text-mist-400 sm:block">
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

      <section id="about" className="scroll-mt-24 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-mist-400">About</p>
            <h2 className="mt-3 max-w-3xl text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              I work on the part of machine learning that has to survive contact with the real
              world.
            </h2>
            <p className="mt-6 max-w-2xl leading-relaxed text-mist-400">
              My focus is coordination under uncertainty — several agents, incomplete information,
              degraded communication, and a deadline. That means building the simulator as
              carefully as the policy, and judging results by how they degrade rather than by their
              best-case score.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {focus.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.08}>
                <div className="surface h-full rounded-2xl p-6">
                  <h3 className="text-base font-semibold text-mist-200">{f.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-mist-400">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 px-6 pb-32 pt-16">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="surface relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16">
              <div className="pointer-events-none absolute inset-x-0 -top-32 h-64 bg-[radial-gradient(ellipse_at_center,rgba(255,122,47,0.22),transparent_70%)]" />
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-mist-400">
                Contact
              </p>
              <h2 className="relative mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Working on something that has to coordinate?
              </h2>
              <p className="relative mx-auto mt-4 max-w-lg leading-relaxed text-mist-400">
                Open to research collaborations and applied ML work in robotics, simulation, and
                multi-agent systems.
              </p>
              <div className="relative mt-9 flex flex-wrap justify-center gap-3">
                <a
                  href="mailto:alex.lavre2@gmail.com"
                  className="rounded-full bg-mist-200 px-6 py-3 text-sm font-medium text-ink-950 transition-transform hover:scale-[1.03]"
                >
                  alex.lavre2@gmail.com
                </a>
                <Link
                  href="/projects/omnisearch"
                  className="rounded-full border border-ink-600 px-6 py-3 text-sm font-medium text-mist-300 transition-colors hover:border-mist-400 hover:text-mist-200"
                >
                  Read the OmniSearch case study
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
