import Section from './Section'
import { dynamic } from '../content'
import { formatRange } from '../lib/format'

export default function Experience() {
  return (
    <Section id="experience" kicker="Experience" title="Where I've been">
      {dynamic.experience.length === 0 ? (
        <p className="text-zinc-400">
          Experience appears here automatically once <code>resume.pdf</code> is committed and the
          weekly sync runs.
        </p>
      ) : (
        <ol className="relative space-y-10 border-l border-zinc-800 pl-8">
          {dynamic.experience.map((item) => (
            <li key={`${item.title}-${item.company}`} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[2.4rem] top-1.5 size-3 rounded-full border-2 border-accent bg-zinc-950"
              />
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <span className="text-sm text-zinc-500">{formatRange(item.start, item.end)}</span>
              </div>
              <p className="mt-0.5 text-sm font-medium text-accent">
                {item.company}
                {item.location ? <span className="text-zinc-500"> · {item.location}</span> : null}
              </p>
              {item.highlights.length > 0 && (
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-zinc-400 marker:text-accent/60">
                  {item.highlights.map((highlight) => (
                    <li key={highlight.slice(0, 40)}>{highlight}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      )}

      {(dynamic.education.length > 0 || dynamic.certifications.length > 0) && (
        <div className="mt-14">
          <h3 className="text-xl font-bold text-white">Education & certifications</h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {dynamic.education.map((edu) => (
              <div
                key={`${edu.institution}-${edu.credential}`}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5"
              >
                <p className="font-semibold text-white">{edu.institution}</p>
                <p className="mt-0.5 text-sm text-accent">
                  {edu.credential}
                  {edu.year ? <span className="text-zinc-500"> · {edu.year}</span> : null}
                </p>
                {edu.details && <p className="mt-2 text-sm text-zinc-400">{edu.details}</p>}
              </div>
            ))}
            {dynamic.certifications.map((cert) => (
              <div key={cert} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
                <p className="font-semibold text-white">{cert}</p>
                <p className="mt-0.5 text-sm text-zinc-500">Certification</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="mt-10 text-sm italic text-zinc-600">
        This timeline refreshes automatically from my resume via a weekly sync.
      </p>
    </Section>
  )
}
