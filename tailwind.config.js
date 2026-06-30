/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          dark: "#080b11",
          card: "#0f141c",
          blue: "#1d4ed8",
          electric: "#3b82f6",
          orange: "#ea580c",
          amber: "#f97316",
          teal: "#0d9488",
        }
      },
    },
  },
  plugins: [],
};