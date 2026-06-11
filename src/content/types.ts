/** A GitHub repository surfaced on the Projects grid. */
export interface Project {
  name: string
  html_url: string
  description: string | null
  language: string | null
  topics: string[]
  stargazers_count: number
  homepage: string | null
  updated_at: string
}

/** One role on the Experience timeline (extracted from resume.pdf). */
export interface ExperienceItem {
  title: string
  company: string
  location?: string
  start: string
  end: string
  highlights: string[]
}

export interface EducationItem {
  institution: string
  credential: string
  year?: string
  details?: string
}

/**
 * Shape of src/content/dynamic.json — written by scripts/sync.mjs and baked
 * into the static build. Never edit dynamic.json by hand except to seed it.
 */
export interface DynamicContent {
  generatedAt: string | null
  projects: Project[]
  experience: ExperienceItem[]
  skills: string[]
  education: EducationItem[]
  certifications: string[]
}
