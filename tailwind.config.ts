import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}', './content/**/*.{json,md}'],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#990000',
          deep: '#450609',
          wine: '#2a0507',
          orange: '#FF6600',
          ember: '#ff8a3d',
          leaf: '#00852D',
        },
        ink: { DEFAULT: '#111318', 2: '#1b1e25', 3: '#2a2e37', soft: '#4a505c', mute: '#6b7280' },
        mist: { DEFAULT: '#F5F6F8', 2: '#eceef2', line: '#e2e5ea' },
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(2.4rem, 5.6vw, 4.75rem)', { lineHeight: '1.04', letterSpacing: '-0.02em', fontWeight: '800' }],
        'h1': ['clamp(2.1rem, 4.4vw, 3.6rem)', { lineHeight: '1.08', letterSpacing: '-0.02em', fontWeight: '800' }],
        'h2': ['clamp(1.75rem, 3.2vw, 2.6rem)', { lineHeight: '1.12', letterSpacing: '-0.018em', fontWeight: '750' }],
        'h3': ['1.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '700' }],
      },
      maxWidth: { prose: '68ch' },
      boxShadow: {
        card: '0 1px 2px rgba(17,19,24,.04), 0 8px 24px -12px rgba(17,19,24,.12)',
        lift: '0 2px 4px rgba(17,19,24,.05), 0 24px 48px -20px rgba(69,6,9,.35)',
      },
    },
  },
  corePlugins: { container: false },
  plugins: [],
};
export default config;
