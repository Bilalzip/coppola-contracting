/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      fontFamily: {
        'primary': ['EB Garamond', 'Times New Roman', 'Georgia', 'serif'],
        'secondary': ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        'eb-garamond': ['EB Garamond', 'Times New Roman', 'Georgia', 'serif'],
        'poppins': ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'serif': ['EB Garamond', 'Times New Roman', 'Georgia', 'serif'],
      },
      colors: {
        'custom-dark': '#0a1128',
        // Brand colors from the existing CSS
        'brand-primary': '#001f54',
        'brand-primary-hover': '#002a6b',
        'brand-dark': '#001f54',
        'brand-accent': '#3b82f6',
        'brand-light': '#ffffff',
        // Blue-toned palette
        'true-blue': '#0466c8',
        'sapphire': '#0353a4',
        'yale-blue': '#023e7d',
        'oxford-blue': '#002855',
        'oxford-blue-2': '#001845',
        'oxford-blue-3': '#001233',
        'delft-blue': '#33415c',
        'paynes-gray': '#5c677d',
        'slate-gray': '#7d8597',
        'cool-gray': '#979dac',
        'brand-white': '#ffffff',
        'brand-text-dark': '#222',
        'brand-text-light': '#fff',
        'neutral-1': '#f5f5f5',
        'neutral-2': '#d3d3d3',
        'neutral-3': '#a0a0a0',
        // Cool neutral base for the ambient background, tinted toward the
        // oxford-blue brand rather than a warm linen.
        'porcelain': {
          50: '#fbfcfe',
          100: '#f4f7fb',
          200: '#e6edf7',
          300: '#d6e1f0',
        },
      },
      backgroundImage: {
        'radial-fade': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
      },
      keyframes: {
        aurora: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '25%': { transform: 'translate3d(6%, -8%, 0) scale(1.12)' },
          '50%': { transform: 'translate3d(-5%, 6%, 0) scale(0.94)' },
          '75%': { transform: 'translate3d(-8%, -5%, 0) scale(1.08)' },
        },
        // Track holds two identical copies, so -50% is a seamless loop point
        marquee: {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(-50%, 0, 0)' },
        },
      },
      animation: {
        aurora: 'aurora 28s ease-in-out infinite',
        marquee: 'marquee 45s linear infinite',
      },
      // Fluid type scale. Each step interpolates linearly between a 375px
      // viewport (the min) and a 1440px viewport (the max), so no step ever
      // renders outside its intended range.
      fontSize: {
        // Semantic tokens
        'page-title': 'clamp(2.25rem, 1.942rem + 1.31vw, 3.125rem)',   // 36 -> 50
        'section-title': 'clamp(1.75rem, 1.486rem + 1.13vw, 2.5rem)',  // 28 -> 40
        'body': 'clamp(1rem, 0.956rem + 0.19vw, 1.125rem)',            // 16 -> 18
        'body-lg': 'clamp(1.125rem, 1.037rem + 0.38vw, 1.375rem)',     // 18 -> 22, long-form copy
        'caption': 'clamp(0.875rem, 0.831rem + 0.19vw, 1rem)',         // 14 -> 16, body minus 2px

        // Numeric scale, rebased so headings stay within the page-title
        // ceiling and body steps never drop below the 16px minimum.
        'xs': 'clamp(0.75rem, 0.728rem + 0.09vw, 0.8125rem)',          // 12 -> 13
        'sm': 'clamp(0.875rem, 0.831rem + 0.19vw, 1rem)',              // 14 -> 16
        'base': 'clamp(1rem, 0.956rem + 0.19vw, 1.125rem)',            // 16 -> 18
        'lg': 'clamp(1.0625rem, 0.997rem + 0.28vw, 1.25rem)',          // 17 -> 20
        'xl': 'clamp(1.125rem, 1.037rem + 0.38vw, 1.375rem)',          // 18 -> 22
        '2xl': 'clamp(1.25rem, 1.162rem + 0.38vw, 1.5rem)',            // 20 -> 24
        '3xl': 'clamp(1.375rem, 1.243rem + 0.56vw, 1.75rem)',          // 22 -> 28
        '4xl': 'clamp(1.5625rem, 1.408rem + 0.66vw, 2rem)',            // 25 -> 32
        '5xl': 'clamp(1.75rem, 1.530rem + 0.94vw, 2.375rem)',          // 28 -> 38
        '6xl': 'clamp(1.875rem, 1.611rem + 1.13vw, 2.625rem)',         // 30 -> 42
        '7xl': 'clamp(2rem, 1.692rem + 1.31vw, 2.875rem)',             // 32 -> 46
        '8xl': 'clamp(2.1875rem, 1.857rem + 1.41vw, 3.125rem)',        // 35 -> 50
        '9xl': 'clamp(2.375rem, 2.111rem + 1.13vw, 3.125rem)',         // 38 -> 50
      },
      letterSpacing: {
        'tight': '-0.01em',
        'wide': '0.04em',
      },
      boxShadow: {
        'brand-md': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'brand-lg': '0 10px 15px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
};
