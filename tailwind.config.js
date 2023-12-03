/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        fredoka: ['var(--font-fredoka)'],
        rubik: ['var(--font-rubik)'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "growing": {
          "0%": {transform: 'translateX(100%)'},
          "30%": {transform: 'translateX(35%)'},
          "70%": {transform: 'translateX(10%)'},
          "90%": {transform: 'translateX(3%)'},
          "100%": {transform: 'translateX(1%)'}
        },
        "emerge-1": {
          "0%": {opacity: "0"},
          "50%": {opacity: "0"},
          "100%": {opacity: "1"}
        },
        "emerge-2": {
          "0%": {opacity: "0"},
          "66%": {opacity: "0"},
          "100%": {opacity: "1"}
        },
        "emerge-3": {
          "0%": {opacity: "0"},
          "75%": {opacity: "0"},
          "100%": {opacity: "1"}
        },
        "emerge-4": {
          "0%": {opacity: "0"},
          "80%": {opacity: "0"},
          "100%": {opacity: "1"}
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "growing": "growing 30s linear",
        "growing-music": "growing 82s linear",
        "growing-video": "growing 92s linear",
        "emerge-1": "emerge-1 1.5s ease-in",
        "emerge-2": "emerge-2 2.5s ease-in",
        "emerge-3": "emerge-3 3.5s ease-in",
        "emerge-4": "emerge-4 4.5s ease-in",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}