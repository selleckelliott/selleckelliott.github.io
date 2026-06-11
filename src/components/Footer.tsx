import { dynamic, site } from '../content'
import { formatMonthYear } from '../lib/format'

export default function Footer() {
  const synced = dynamic.generatedAt ? formatMonthYear(dynamic.generatedAt) : null

  return (
    <footer className="border-t border-zinc-900 py-10 text-center text-sm text-zinc-600">
      <p>
        © {new Date().getFullYear()} {site.name} · Built with React, Vite & Tailwind
      </p>
      <p className="mt-1.5">
        Content syncs automatically from GitHub and my resume
        {synced ? ` · Last synced ${synced}` : ''}
      </p>
    </footer>
  )
}
