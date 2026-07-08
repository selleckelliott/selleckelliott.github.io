import Section from './Section'

const skillGroups = [
  {
    title: 'Backend systems',
    description:
      'I build C#/.NET services with ASP.NET Core, SQL-backed domain logic, and REST APIs that keep business rules clear.',
  },
  {
    title: 'AI and data workflows',
    description:
      'I use Python and FastAPI for simulation, scoring, optimization, and OpenAI tool-calling workflows with practical guardrails.',
  },
  {
    title: 'Frontend delivery',
    description:
      'I ship TypeScript and React interfaces with responsive layouts, Tailwind styling, and Vercel-ready deployment paths.',
  },
  {
    title: 'Engineering practice',
    description:
      'I lean on Git, Docker, Swagger, Postman, CI/CD habits, automated tests, and documentation to make work easier to maintain.',
  },
]

export default function Skills() {
  return (
    <Section id="skills" kicker="Skills" title="What I work with">
      <div className="grid gap-px overflow-hidden rounded-xl border border-zinc-800 bg-zinc-800 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <section key={group.title} className="bg-zinc-950 p-5 sm:p-6">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-accent">
              {group.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-300">{group.description}</p>
          </section>
        ))}
      </div>
    </Section>
  )
}
