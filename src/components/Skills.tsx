import Section from './Section'
import { dynamic, site } from '../content'

export default function Skills() {
  const seen = new Set<string>()
  const skills = [...site.baselineSkills, ...dynamic.skills].filter((skill) => {
    const key = skill.trim().toLowerCase()
    if (!key || seen.has(key)) return false
    seen.add(key)
    return true
  })

  return (
    <Section id="skills" kicker="Skills" title="What I work with">
      <ul className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <li
            key={skill}
            className="rounded-full border border-zinc-700 bg-zinc-900/70 px-4 py-1.5 text-sm text-zinc-300 transition hover:border-accent hover:text-accent"
          >
            {skill}
          </li>
        ))}
      </ul>
    </Section>
  )
}
