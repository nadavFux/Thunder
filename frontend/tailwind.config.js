/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        workbench: {
          bg: '#1a1a1a',
          pane: '#2d2d2d',
          border: '#404040',
          active: '#3b82f6',
          header: '#121212',
          toolbar: '#1a1a1a',
          body: '#2d2d2d',
          accent: '#3b82f6',
        }
      }
    },
  },
  plugins: [],
}
