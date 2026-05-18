/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper:      'var(--paper)',
        ink:        'var(--ink)',
        forest:     'var(--forest)',
        terracotta: 'var(--terracotta)',
        muted:      'var(--muted)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body:    ['var(--font-body)'],
        mono:    ['var(--font-mono)'],
      },
    },
  },
  plugins: [],
}
