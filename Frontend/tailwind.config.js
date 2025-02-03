/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        Anton:["Anton", 'serif'],
      },
     fontWeight:400,
     
    },
  },
  plugins: [],
}

