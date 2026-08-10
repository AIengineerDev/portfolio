import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { DropoutChart } from "@/components/DropoutChart";
import { ResultsTable } from "@/components/ResultsTable";
import { Reveal } from "@/components/Reveal";
import { getProject, projects } from "@/data/projects";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
    openGraph: {
      title: project.title,
      description: project.tagline,
      images: project.cover ? [project.cover.src] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const [from, to] = project.accent;

  return (
    <article className="px-6 pb-32 pt-32">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm text-mist-400 transition-colors hover:text-mist-200"
        >
          <span aria-hidden>←</span> All projects
        </Link>

        <Reveal className="mt-8">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-mist-400">
            <span className="rounded-full px-2.5 py-1" style={{ background: `${from}1f`, color: from }}>
              {project.domain}
            </span>
            <span>{project.role}</span>
            <span className="text-mist-400">/</span>
            <span>{project.year}</span>
          </div>

          <h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-xl leading-relaxed text-mist-300">
            {project.tagline}
          </p>
        </Reveal>

        {project.cover && (
          <Reveal delay={0.1} className="mt-12">
            <figure>
              <div className="surface overflow-hidden rounded-3xl">
                <Image
                  src={project.cover.src}
                  alt={project.cover.alt}
                  width={1876}
                  height={1356}
                  priority
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-3 text-sm text-mist-400">
                {project.cover.caption}
              </figcaption>
            </figure>
          </Reveal>
        )}

        <Reveal className="mt-16">
          <p className="text-pretty text-lg leading-relaxed text-mist-300">{project.summary}</p>
        </Reveal>

        <Reveal className="mt-14">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-ink-600 bg-ink-600 sm:grid-cols-2 lg:grid-cols-4">
            {project.metrics.map((m) => (
              <div key={m.label} className="bg-ink-800 p-6">
                <div className="text-3xl font-semibold tabular-nums" style={{ color: to }}>
                  {m.value}
                </div>
                <div className="mt-1.5 text-sm font-medium text-mist-200">{m.label}</div>
                {m.detail && (
                  <div className="mt-1 text-xs leading-snug text-mist-400">{m.detail}</div>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-20 flex flex-col gap-14">
          {project.sections.map((s, i) => (
            <Reveal key={s.heading} delay={0.04 * i}>
              <section>
                <h2 className="text-2xl font-semibold tracking-tight text-mist-200 sm:text-3xl">
                  {s.heading}
                </h2>
                <div className="mt-5 flex flex-col gap-4">
                  {s.body.map((p, j) => (
                    <p key={j} className="text-pretty leading-relaxed text-mist-400">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            </Reveal>
          ))}
        </div>

        {project.dropout && (
          <Reveal className="mt-16">
            <DropoutChart data={project.dropout} />
          </Reveal>
        )}

        {project.tables?.map((t) => (
          <Reveal key={t.heading} className="mt-16">
            <ResultsTable data={t} />
          </Reveal>
        ))}

        {project.specs && (
          <Reveal className="mt-16">
            <h2 className="text-2xl font-semibold tracking-tight text-mist-200">
              Evaluation setup
            </h2>
            <dl className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-ink-600 bg-ink-600 sm:grid-cols-2">
              {project.specs.map((row) => (
                <div key={row.label} className="bg-ink-800 px-6 py-4">
                  <dt className="text-xs uppercase tracking-wider text-mist-400">{row.label}</dt>
                  <dd className="mt-1 text-sm text-mist-200">{row.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}

        {project.architecture && (
          <Reveal className="mt-16">
            <ArchitectureDiagram data={project.architecture} />
          </Reveal>
        )}

        {project.gallery?.map((g) => (
          <Reveal key={g.src} className="mt-16">
            <figure>
              <div className="surface overflow-hidden rounded-3xl p-3">
                <Image
                  src={g.src}
                  alt={g.alt}
                  width={1600}
                  height={900}
                  className="h-auto w-full rounded-2xl"
                />
              </div>
              <figcaption className="mt-3 text-sm text-mist-400">{g.caption}</figcaption>
            </figure>
          </Reveal>
        ))}

        <Reveal className="mt-20">
          <div className="grid gap-10 border-t border-ink-700 pt-10 sm:grid-cols-2">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-mist-400">
                Stack
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-ink-600 px-3 py-1 text-xs text-mist-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-8">
              {project.team && (
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-mist-400">
                    Team
                  </h3>
                  <ul className="mt-4 flex flex-col gap-1 text-sm text-mist-300">
                    {project.team.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              )}

              {project.links && (
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-mist-400">
                    Links
                  </h3>
                  <ul className="mt-4 flex flex-col gap-2 text-sm">
                    {project.links.map((l) => (
                      <li key={l.href}>
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-mist-300 underline decoration-ink-600 underline-offset-4 transition-colors hover:text-mist-200 hover:decoration-mist-400"
                        >
                          {l.label} ↗
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </article>
  );
}
