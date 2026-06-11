import Section from './Section'
import { site } from '../content'
import { DownloadIcon, GitHubIcon, LinkedInIcon } from './Icons'

const cardClass =
  'flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 px-6 py-4 font-medium text-zinc-200 transition hover:border-accent/60 hover:text-accent'

export default function Contact() {
  return (
    <Section id="contact" kicker="Contact" title="Get in touch">
      <p className="max-w-2xl text-lg text-zinc-400">
        The fastest way to reach me is LinkedIn. You can also browse my code on GitHub or grab a
        copy of my resume below.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <a href={site.social.linkedin} target="_blank" rel="noreferrer" className={cardClass}>
          <LinkedInIcon />
          LinkedIn
        </a>
        <a href={site.social.github} target="_blank" rel="noreferrer" className={cardClass}>
          <GitHubIcon />
          GitHub
        </a>
        <a href={site.resumeUrl} download className={cardClass}>
          <DownloadIcon />
          Resume (PDF)
        </a>
      </div>
    </Section>
  )
}
