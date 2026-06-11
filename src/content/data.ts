/**
 * Static site content — the editable copy of the portfolio.
 * Dynamic content (projects, experience, skills, education) lives in
 * dynamic.json and is refreshed automatically by scripts/sync.mjs.
 */
export const site = {
  name: 'Selleck Elliott',
  tagline: 'C#/.NET developer building AI-powered systems.',
  about: [
    "I'm Selleck — a software developer working primarily in C# and .NET, with a growing focus on AI engineering. I came to software from a background in business and financial analysis, which taught me to care about the why behind every system: the costs, the constraints, and the decisions the software is actually supposed to improve.",
    'Since completing the TrueCoders software development program, I\u2019ve built a portfolio that runs from classic design-pattern deep dives in C# to full applications — and most recently freightbid_agent, a hybrid AI decision system for freight dispatch that combines rule-based optimization, ML prediction, and agent planning.',
    'This site keeps itself up to date: a weekly job pulls my latest GitHub projects and re-reads my resume, so what you see here tracks what I\u2019m actually building.',
  ],
  social: {
    github: 'https://github.com/selleckelliott',
    linkedin: 'https://www.linkedin.com/in/selleckelliott/',
  },
  resumeUrl: '/resume.pdf',
  headshot: '/headshot.png',
  /** Always shown in Skills, merged with skills extracted from the resume. */
  baselineSkills: [
    'C#',
    '.NET',
    'ASP.NET Core',
    'SQL',
    'Python',
    'JavaScript',
    'TypeScript',
    'React',
    'REST APIs',
    'Design Patterns',
    'Git',
    'AI Agents',
  ],
  /** Map repo name -> demo video served from public/. */
  repoMedia: {
    BodyBuilding: '/media/BodybuildingProjectRecording.mp4',
    Archeology: '/media/archeologyappvideo.mp4',
  } as Record<string, string>,
}
