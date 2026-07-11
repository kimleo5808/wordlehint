import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)', 'var(--font-body)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono-code)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        // Editorial Newsprint stack — scoped to /wordle-unlimited
        fraunces: ['var(--font-fraunces)', 'Georgia', 'serif'],
        newsreader: ['var(--font-newsreader)', 'Georgia', 'serif'],
        'plex-mono': ['var(--font-plex-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        'plex-sans': ['var(--font-plex-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        },
        cta: {
          DEFAULT: 'hsl(var(--cta))',
          foreground: 'hsl(var(--cta-foreground))',
        },
        wordle: {
          correct: 'hsl(var(--wordle-correct))',
          present: 'hsl(var(--wordle-present))',
          absent: 'hsl(var(--wordle-absent))',
          key: 'hsl(var(--wordle-key))',
        },
        // Editorial Newsprint palette — scoped to /wordle-unlimited.
        // Uses raw hex (not CSS vars) to avoid touching the global theme system.
        brand: {
          cream: '#F5F1E8',
          paper: '#FBF8F0',
          ink: '#1A1814',
          midInk: '#3A3631',
          tan: '#D9D2C2',
          subtle: '#6B6660',
          signal: '#C2410C',
          signalDark: '#9A3309',
          signalLight: '#FED7AA',
        },
        // Dark-mode counterparts for the Editorial palette
        'brand-dark': {
          bg: '#1C1A17',
          paper: '#2A2622',
          ink: '#F5F1E8',
        },
        // Wordle color-blind alternative palette (blue + orange)
        'wordle-cb': {
          correct: '#1976D2',
          present: '#E65100',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'flip-digit': {
          '0%': { transform: 'rotateX(0deg)' },
          '50%': { transform: 'rotateX(90deg)' },
          '100%': { transform: 'rotateX(0deg)' },
        },
        // Roaming-yellow motif for /5-letter-words/with-* heroes: each tile's
        // overlay flashes present-yellow in turn, so the letter "hops" across
        // the five slots — a position is known, the slot is not.
        'tile-chase': {
          '0%, 100%': { opacity: '0' },
          '8%, 16%': { opacity: '1' },
          '24%': { opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'flip-digit': 'flip-digit 0.6s ease-in-out',
        'tile-chase': 'tile-chase 3s ease-in-out infinite',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
