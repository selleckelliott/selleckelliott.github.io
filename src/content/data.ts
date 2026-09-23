/**
 * Static site content — the editable copy of the portfolio.
 * Dynamic content (projects, experience, skills, education) lives in
 * dynamic.json and is refreshed automatically by scripts/sync.mjs.
 */
export const site = {
  name: 'Selleck Elliott',
  tagline: 'Backend engineer. C#/.NET fintech APIs and Python/FastAPI systems.',
  about: [
    "I'm a backend engineer working on C#/.NET REST APIs for loan servicing, payments, compliance, and litigation workflows at GoldPoint Systems. Previously, I worked in financial services as a Technical Financial Advisor, developing SQL and portfolio-modeling tools for an advisory desk.",
    'My Python/FastAPI projects focus on testable domain models, optimization, and measurable outcomes. FreightBid combines hexagonal architecture, OR-Tools, and calibrated machine learning; its synthetic-market benchmarks and 600-test suite make the results inspectable.',
    'Explore the source code and benchmark artifacts below, or open the CustodiFlow staging prototype to see its inventory and purchasing workflows.',
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
    CustodiFlow: '/media/custodiflow-demo.mp4',
  } as Record<string, string>,
}
