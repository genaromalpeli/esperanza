import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0e0e0e',
        surface: '#161616',
        border: '#2a2a2a',
        gold: '#c9a84c',
        teal: '#52d9c8',
        'soft-green': '#8ec9a0',
        yellow: '#e8c56d',
        red: '#e8716b',
        muted: '#555555',
        text: '#e2e2e2',
      },
    },
  },
  plugins: [],
}

export default config
