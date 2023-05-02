/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        uthmani: "Uthmani",
        Noor:"Noor"
      },
      animation:{
        'spin-slow': 'spin 2s linear infinite',
      }
    },
  },
  plugins: [],
}

