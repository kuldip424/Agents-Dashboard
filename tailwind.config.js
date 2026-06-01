/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        xs: ['12px', { lineHeight: '1.5', letterSpacing: '-0.2px' }],
        sm: ['14px', { lineHeight: '1.5', letterSpacing: '-0.2px' }],
        base: ['15px', { lineHeight: '1.6', letterSpacing: '-0.3px' }],
        lg: ['17px', { lineHeight: '1.6', letterSpacing: '-0.3px' }],
        xl: ['19px', { lineHeight: '1.65', letterSpacing: '-0.4px' }],
        '2xl': ['24px', { lineHeight: '1.3', letterSpacing: '-0.4px' }],
        '3xl': ['30px', { lineHeight: '1.25', letterSpacing: '-0.5px' }],
        '4xl': ['36px', { lineHeight: '1.2', letterSpacing: '-0.5px' }],
      },
      colors: {
        brand: {
          50:  "#f0f9ff",
          100: "#e0f2fe",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
        slate: {
          50: "#f9fafb",
          100: "#f3f4f6",
          150: "#eef2f7",
          200: "#e5e7eb",
          300: "#d1d5db",
          350: "#cbd5e1",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "20px",
      },
      boxShadow: {
        xs: '0 1px 2px rgba(0, 0, 0, 0.04)',
        sm: '0 2px 4px rgba(0, 0, 0, 0.06)',
        base: '0 4px 8px rgba(0, 0, 0, 0.08)',
        md: '0 8px 16px rgba(0, 0, 0, 0.1)',
        lg: '0 12px 24px rgba(0, 0, 0, 0.12)',
        xl: '0 20px 40px rgba(0, 0, 0, 0.15)',
      },
      spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
      },
      keyframes: {
        slideUp: {
          from: { transform: "translateY(24px)", opacity: "0" },
          to:   { transform: "translateY(0)",    opacity: "1" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
      },
      animation: {
        "slide-up": "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-in":  "fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
