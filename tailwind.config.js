/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
    "./node_modules/flowbite/**/*.js",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      backgroundColor: {
        'custom-color': '#3d484e',
        'background-color': '#f3f4f9',
        'oscuro': '#0a0a0a',
        'rojo': '#fd6c6d',
        'azul-oscuro': '#264f7e',
        'navbar-color': '#303a41',
        'azul': '#5699e9',
        'hover': '#475157',
        'verde': '#438440',
        
      },
      colors: {
        'blue-gray-800': '#3e4a52',
        'blue-gray-900': '#303a41',
        'blue-gray-400': '#78909C',
        'verde': '#438440'
      },
      spacing: {
        '-control-medium-size': 'calc(2rem / -2 + 1px)',
      },

      fontFamily: {
        'Geist': ['Geist', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}