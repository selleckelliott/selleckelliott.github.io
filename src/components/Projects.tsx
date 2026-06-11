import Section from './Section'
import { dynamic, site, type Project } from '../content'
import { formatMonthYear } from '../lib/format'
import { ExternalLinkIcon, GitHubIcon, StarIcon } from './Icons'

const LANGUAGE_COLORS: Record<string, string> = {
  'C#': '#178600',
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#663399',
}

function ProjectCard({ project }: { project: Project }) {
  const video = site.repoMedia[project.name]
  const langColor = project.language ? (LANGUAGE_COLORS[project.language] ?? '#71717a') : null

  return (
    <article className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition hover:border-accent/50 hover:bg-zinc-900">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-white">{project.name}</h3>
        <div className="flex shrink-0 items-center gap-3 text-zinc-500">
          {project.homepage && (
            <a
              href={project.homepage}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.name} live site`}
              className="transition hover:text-accent"
            >
              <ExternalLinkIcon />
            </a>
          )}
          <a
            href={project.html_url}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.name} on GitHub`}
            className="transition hover:text-accent"
          >
            <GitHubIcon className="size-5" />
          </a>
        </div>
      </div>
      {project.description && (
        <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">{project.description}</p>
      )}
      {video && (
        <video
          controls
          preload="metadata"
          src={video}
          className="mt-4 w-full rounded-lg border border-zinc-800"
        />
      )}
      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-zinc-500">
        {project.language && langColor && (
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded-full" style={{ backgroundColor: langColor }} />
            {project.language}
          </span>
        )}
        {project.stargazers_count > 0 && (
          <span className="inline-flex items-center gap-1">
            <StarIcon className="size-3.5" />
            {project.stargazers_count}
          </span>
        )}
        <span>Updated {formatMonthYear(project.updated_at)}</span>
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <Section id="projects" kicker="Projects" title="Things I've built">
      {dynamic.projects.length === 0 ? (
        <p className="text-zinc-400">
          Projects show up here automatically once GitHub repos are tagged with the{' '}
          <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-accent">portfolio</code> topic.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {dynamic.projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      )}
      <p className="mt-8 text-sm text-zinc-500">
        Pulled automatically from{' '}
        <a
          href={site.social.github}
          target="_blank"
          rel="noreferrer"
          className="text-accent hover:underline"
        >
          my GitHub
        </a>{' '}
        — repos tagged <code className="rounded bg-zinc-800 px-1.5 py-0.5">portfolio</code> appear here.
      </p>
    </Section>
  )
}
