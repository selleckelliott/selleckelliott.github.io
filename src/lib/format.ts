export function formatMonthYear(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export function formatRange(start: string, end: string): string {
  if (start && end) return `${start} — ${end}`
  return start || end || ''
}
