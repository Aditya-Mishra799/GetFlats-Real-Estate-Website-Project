/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors :{
        'smooth-orange': '#ff6f61',
        'dark-orange': '#fa6557',
        'active-orange': '#fa5546',
      },
      borderRadius:{
        'mini': '4px',
      }
    },
  },
  plugins: [],
};
