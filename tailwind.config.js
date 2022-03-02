module.exports = {
  content: ['./src/main/react/**/*.{js,jsx,ts,tsx}', './src/main/resources/public/index.html'],
  darkMode: 'class', // false or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        }
      },
      animation: {
        wiggle: 'wiggle 200ms ease-in-out',
      }
    },
  },
  plugins: [],
}