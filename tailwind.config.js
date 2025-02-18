
// TAILWIND CONFIG
/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    // Include all files in the src folder
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  safelist: [
  ],
  theme: {
    extend: {
      // Here are 2 fonts (the imports are in the index.css inside the src folder), example of use: "font-inter"
      fontFamily: {
        inter: ['Inter', 'sans-serif'], 
        archivo: ['Archivo', 'sans-serif']
      },
      // Some premade keyframes for animations made by me
      keyframes: {
        fadeIn:{
          '0%': {opacity: '0'},
          '100%': {opacity: '1'}
        },
        fadeOut:{
          '0%': {opacity: '1', display: "flex"},
          '100%': {opacity: '0', display: "flex"}
        },
        fromBelow:{
          '0%': {transform: 'translateY(100%)', opacity: '0'},
          '100%': {transform: 'translateY(0)', opacity: '1'}
        },
        toBelowBlock:{
          '0%': {transform: 'translateY(0)', opacity: '1', display: 'block'},
          '100%': {transform: 'translateY(100%)', opacity: '0'}
        },
        activeYellow:{
          '0%': { backgroundColor: '#ffffff' },
          '100%': { backgroundColor: '#ffeb3b' },
        },
        fromLeft:{
          '0%': {transform: 'translateX(-100%)', opacity: '0'},
          '100%': {transform: 'translateX(0)', opacity: '1'}
        },
        fromRight:{
          '0%': {transform: 'translateX(100%)', opacity: '0'},
          '100%': {transform: 'translateX(0)', opacity: '1'}
        },
        spinForever:{
          '0%': {transform: 'rotate(0deg)'},
          '100%': {transform: 'rotate(360deg)'}
        },
      },
      // In here we actually add the animations and specify the keyframes (the ones above this) with the duration and other settings
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        fadeOut: 'fadeOut 2s ease-in-out',
        fromBelow: 'fromBelow 0.1s linear',
        toBelowBlock: 'toBelowBlock 0.5s ease-in-out',
        activeYellow: 'activeYellow 0.1s ease-in-out',
        fromLeft: 'fromLeft 0.5s ease-in-out',
        fromRight: 'fromRight 0.5s ease-in-out',
        spinForever: 'spinForever 1s linear infinite'
      }

    },
  },
  plugins: [
  ],
}

