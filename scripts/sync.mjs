#!/usr/bin/env node
/**
 * Portfolio content sync — writes src/content/dynamic.json.
 *
 * Sources:
 *   1. GitHub REST API — public repos for GITHUB_USER tagged with the
 *      `portfolio` topic (uses GITHUB_TOKEN when present, anonymous otherwise).
 *   2. Gemini — structured extraction of public/resume.pdf into
 *      { experience, skills, education, certifications }.
 *
 * Failure policy: never write empty/broken data over good data. Each section
 * falls back to the existing dynamic.json content if its source is missing,
 * fails, or returns nothing useful. Missing GEMINI_API_KEY or resume.pdf are
 * clean skips, not errors. The file is only rewritten when content changed.
 *
 * Requires Node 20+ (native fetch). No runtime dependencies.
 */
import { readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DYNAMIC_PATH = path.join(ROOT, 'src', 'content', 'dynamic.json')
const RESUME_PATH = path.join(ROOT, 'public', 'resume.pdf')

const GITHUB_USER = 'selleckelliott'
const PORTFOLIO_TOPIC = 'portfolio'
const GEMINI_MODEL = 'gemini-2.5-flash-lite'

const EMPTY_CONTENT = {
  generatedAt: null,
  projects: [],
  experience: [],
  skills: [],
  education: [],
  certifications: [],
}

const EXTRACTION_PROMPT = `You are a strict data-extraction engine. Extract structured resume data from the attached PDF.

Rules:
- Use ONLY information explicitly present in the PDF. Never infer, embellish, or invent anything.
- If a field is not present in the PDF, use an empty string "" (or omit the entry entirely).
- Copy bullet points nearly verbatim; you may trim whitespace and trailing punctuation only.
- Dates as short strings such as "Jan 2023" or "2023"; use "Present" for current roles.
- Output ONLY valid JSON matching exactly this schema — no markdown, no commentary:

{
  "experience": [
    { "title": "", "company": "", "location": "", "start": "", "end": "", "highlights": [""] }
  ],
  "skills": [""],
  "education": [
    { "institution": "", "credential": "", "year": "", "details": "" }
  ],
  "certifications": [""]
}`

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const isStr = (v) => typeof v === 'string'
const cleanStr = (v) => (isStr(v) ? v.trim() : '')
const cleanStrArray = (v) =>
  Array.isArray(v) ? v.filter(isStr).map((s) => s.trim()).filter(Boolean) : []

async function loadExisting() {
  try {
    const parsed = JSON.parse(await readFile(DYNAMIC_PATH, 'utf8'))
    return { ...EMPTY_CONTENT, ...parsed }
  } catch {
    console.warn('! No readable existing dynamic.json — starting from an empty skeleton.')
    return { ...EMPTY_CONTENT }
  }
}

// ---------------------------------------------------------------------------
// Source 1: GitHub projects
// ---------------------------------------------------------------------------

async function fetchProjects() {
  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'portfolio-sync',
  }
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  const repos = []
  for (let page = 1; page <= 5; page++) {
    const url = `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&page=${page}&sort=updated`
    const res = await fetch(url, { headers })
    if (!res.ok) {
      throw new Error(`GitHub API ${res.status}: ${(await res.text()).slice(0, 200)}`)
    }
    const batch = await res.json()
    repos.push(...batch)
    if (batch.length < 100) break
  }

  return repos
    .filter((r) => !r.archived && Array.isArray(r.topics) && r.topics.includes(PORTFOLIO_TOPIC))
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    .map((r) => ({
      name: r.name,
      html_url: r.html_url,
      description: r.description ?? null,
      language: r.language ?? null,
      topics: r.topics ?? [],
      stargazers_count: r.stargazers_count ?? 0,
      homepage: r.homepage || null,
      updated_at: r.updated_at,
    }))
}

// ---------------------------------------------------------------------------
// Source 2: Gemini resume extraction
// ---------------------------------------------------------------------------

async function extractResume() {
  if (!process.env.GEMINI_API_KEY) {
    console.log('- GEMINI_API_KEY not set — skipping resume extraction (keeping existing data).')
    return null
  }
  if (!existsSync(RESUME_PATH)) {
    console.log('- public/resume.pdf not found — skipping resume extraction (keeping existing data).')
    return null
  }

  const pdf = await readFile(RESUME_PATH)
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': process.env.GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { inline_data: { mime_type: 'application/pdf', data: pdf.toString('base64') } },
              { text: EXTRACTION_PROMPT },
            ],
          },
        ],
        generationConfig: { temperature: 0, responseMimeType: 'application/json' },
      }),
    },
  )
  if (!res.ok) {
    throw new Error(`Gemini API ${res.status}: ${(await res.text()).slice(0, 300)}`)
  }

  const data = await res.json()
  const text = (data?.candidates?.[0]?.content?.parts ?? [])
    .map((p) => p.text ?? '')
    .join('')
    .replace(/^\s*```(?:json)?\s*|\s*```\s*$/g, '')
  if (!text.trim()) throw new Error('Gemini returned an empty response.')
  return JSON.parse(text)
}

/** Validate one extracted section; returns a clean array or null if unusable. */
function sanitizeExperience(value) {
  if (!Array.isArray(value)) return null
  const items = value
    .map((item) => ({
      title: cleanStr(item?.title),
      company: cleanStr(item?.company),
      location: cleanStr(item?.location),
      start: cleanStr(item?.start),
      end: cleanStr(item?.end),
      highlights: cleanStrArray(item?.highlights),
    }))
    .filter((item) => item.title || item.company)
  return items.length > 0 ? items : null
}

function sanitizeEducation(value) {
  if (!Array.isArray(value)) return null
  const items = value
    .map((item) => ({
      institution: cleanStr(item?.institution),
      credential: cleanStr(item?.credential),
      year: cleanStr(item?.year),
      details: cleanStr(item?.details),
    }))
    .filter((item) => item.institution || item.credential)
  return items.length > 0 ? items : null
}

function sanitizeStrings(value) {
  const items = cleanStrArray(value)
  return items.length > 0 ? items : null
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const existing = await loadExisting()
  const next = { ...existing }

  // Projects
  try {
    const projects = await fetchProjects()
    if (projects.length > 0) {
      next.projects = projects
      console.log(`+ GitHub: ${projects.length} repo(s) tagged "${PORTFOLIO_TOPIC}".`)
    } else {
      console.log(
        `- GitHub: no repos tagged "${PORTFOLIO_TOPIC}" — keeping ${existing.projects.length} existing project(s).`,
      )
    }
  } catch (err) {
    console.warn(`! GitHub fetch failed (${err.message}) — keeping existing projects.`)
  }

  // Resume
  try {
    const extracted = await extractResume()
    if (extracted) {
      const sections = [
        ['experience', sanitizeExperience(extracted.experience)],
        ['skills', sanitizeStrings(extracted.skills)],
        ['education', sanitizeEducation(extracted.education)],
        ['certifications', sanitizeStrings(extracted.certifications)],
      ]
      for (const [key, value] of sections) {
        if (value) {
          next[key] = value
          console.log(`+ Resume: extracted ${value.length} ${key} item(s).`)
        } else {
          console.log(`- Resume: no valid ${key} extracted — keeping existing data.`)
        }
      }
    }
  } catch (err) {
    console.warn(`! Resume extraction failed (${err.message}) — keeping existing resume data.`)
  }

  // Only rewrite the file when content actually changed (ignoring generatedAt),
  // so the CI commit step stays a no-op on quiet weeks.
  const fingerprint = ({ projects, experience, skills, education, certifications }) =>
    JSON.stringify({ projects, experience, skills, education, certifications })
  if (fingerprint(next) === fingerprint(existing)) {
    console.log('= No content changes — dynamic.json left untouched.')
    return
  }

  next.generatedAt = new Date().toISOString()
  await writeFile(DYNAMIC_PATH, `${JSON.stringify(next, null, 2)}\n`, 'utf8')
  console.log(`= Wrote ${path.relative(ROOT, DYNAMIC_PATH)}.`)
}

main().catch((err) => {
  console.error(`Sync failed unexpectedly: ${err.stack ?? err}`)
  process.exit(1)
})
