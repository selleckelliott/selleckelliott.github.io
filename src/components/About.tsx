import Section from './Section'
import { site } from '../content'

export default function About() {
  return (
    <Section id="about" kicker="About" title="A bit about me">
      <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-zinc-400">
        {site.about.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
      </div>
    </Section>
  )
}
