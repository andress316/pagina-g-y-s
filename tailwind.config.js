/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      borderRadius: {
        'custom-xl': '0 30px 30px', // Radio de esquina personalizado
      },
      colors: {
        
      },
    },
  },
  plugins: [],
}
