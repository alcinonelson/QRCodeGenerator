/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',    
        secondary: '#10B981',  
        accent: '#FBBF24',     
        background: '#F3F4F6', 
        inputBorder: '#D1D5DB', 
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], 
      },
      borderRadius: {
        xl: '1rem',       
        '2xl': '1.5rem',  
      },
      boxShadow: {
        lg: '0 10px 25px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 50px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};



