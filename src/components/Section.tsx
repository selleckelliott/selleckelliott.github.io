import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  kicker: string
  title: string
  children: ReactNode
}

export default function Section({ id, kicker, title, children }: SectionProps) {
  return (
    <section id={id} className="mx-auto max-w-5xl scroll-mt-20 px-6 py-16 sm:py-20">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">{kicker}</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
      <div className="mt-10">{children}</div>
    </section>
  )
}
