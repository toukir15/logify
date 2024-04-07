/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#28282b',
        'secondary': '#76B7ED',
        'white': '#FFFFFF',
        'gray': '#A1A1AA',
        'light-gray': "#F3F4F6"
      },
    },
  },
  plugins: [],
}

