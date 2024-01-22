/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary-gray': '#F1F0FF',
        'dark-gray': '#6F6F6F',
        'light-gray': '#C4C4C4',
        'card-gray':'#F2F2F2',
        'primary-purple':'#48409E',
        'secondary-purple':'#BFB9FF',
        'primary-red': '#FF7979',
      },
      fontFamily:{
        'primary_title':'K2D',
        'primary_body':'Libre Franklin',
      },
      boxShadow:{
        '3xl': '0px 4px 10px 0px #0000001A'
      },
      borderRadius:{
        'xxl':'10px',
      },
      transitionDuration: {
        '2000': '2000ms',
        '3000': '3000ms',
        '4000': '4000ms',
        '5000': '5000ms',
      }
    },
  },
  plugins: [],
}

