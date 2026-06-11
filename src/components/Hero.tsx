import { site } from '../content'
import { DownloadIcon, GitHubIcon, LinkedInIcon } from './Icons'

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-[-10rem] size-[28rem] rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 left-[-12rem] size-[24rem] rounded-full bg-accent/5 blur-3xl"
      />
      <div className="mx-auto flex max-w-5xl flex-col-reverse items-center gap-10 px-6 pb-20 pt-16 sm:pt-24 md:flex-row md:items-center md:gap-16">
        <div className="flex-1 text-center md:text-left">
          <p className="font-mono text-sm text-accent">Hi, my name is</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            {site.name}
          </h1>
          <p className="mt-4 text-xl text-zinc-400 sm:text-2xl">{site.tagline}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <a
              href="#projects"
              className="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-accent/85"
            >
              View projects
            </a>
            <a
              href={site.resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-md border border-zinc-700 px-5 py-2.5 text-sm font-semibold text-zinc-200 transition hover:border-accent hover:text-accent"
            >
              <DownloadIcon className="size-4" />
              Download resume
            </a>
          </div>
          <div className="mt-8 flex items-center justify-center gap-5 text-zinc-500 md:justify-start">
            <a
              href={site.social.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="transition hover:text-accent"
            >
              <GitHubIcon className="size-6" />
            </a>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="transition hover:text-accent"
            >
              <LinkedInIcon className="size-6" />
            </a>
          </div>
        </div>
        <img
          src={site.headshot}
          alt={`${site.name} headshot`}
          className="size-44 rounded-full object-cover ring-4 ring-accent/30 sm:size-56 md:size-64"
        />
      </div>
    </section>
  )
}
