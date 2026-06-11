import { site } from '../content'

const links = [
  ['About', '#about'],
  ['Projects', '#projects'],
  ['Experience', '#experience'],
  ['Skills', '#skills'],
  ['Contact', '#contact'],
] as const

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <a href="#top" className="font-bold tracking-tight text-white">
          Selleck<span className="text-accent"> Elliott</span>
        </a>
        <div className="hidden items-center gap-6 text-sm text-zinc-400 md:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="transition hover:text-accent">
              {label}
            </a>
          ))}
        </div>
        <a
          href={site.resumeUrl}
          download
          className="rounded-md border border-accent/40 px-3 py-1.5 text-sm font-medium text-accent transition hover:bg-accent/10"
        >
          Resume
        </a>
      </nav>
    </header>
  )
}
