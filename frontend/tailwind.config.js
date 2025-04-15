module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 0.2s ease-out forwards',
        scaleIn: 'scaleIn 0.8s ease forwards',
        float: 'float 6s infinite ease-in-out',
      },
      animationDelay: {
        100: '100ms',
        200: '200ms',
        300: '300ms',
        400: '400ms',
        500: '500ms',
        600: '600ms',
      },
    },
  },
  plugins: [
    function({ addUtilities, theme }) {
      const animationDelays = theme('animationDelay');
      const utilities = Object.entries(animationDelays).map(([key, value]) => {
        return {
          [`.animation-delay-${key}`]: {
            'animation-delay': value,
          },
        };
      });
      
      addUtilities(utilities);
    },
  ],
} 