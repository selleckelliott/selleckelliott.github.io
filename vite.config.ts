import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base is '/' because the final home of this site is the user-root repo
// selleckelliott.github.io. Until the repo is renamed, the deployed site will
// NOT render correctly at /Personal_Website/ — that is expected.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
})
