/** @type {import('tailwindcss').Config} */
const defaulTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'xs' : '370px',
      ...defaulTheme.screens,
    }
  },
  plugins: [],
}
