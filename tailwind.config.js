console.log('\nTailwinds', process.env.NODE_ENV);

const colors = require('tailwindcss/colors');

module.exports = {
  prefix: 'bb-',
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography'), require('@tailwindcss/aspect-ratio'), require('@tailwindcss/line-clamp')],
  variants: {
    zIndex: ['responsive', 'hover', 'focus', 'focus-within'],
    animation: ['responsive', 'hover'],
  },
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000',
      white: '#fff',
      gray: colors.coolGray,
      red: colors.red,
      orange: colors.orange,
      yellow: colors.amber,
      green: colors.green,
      teal: colors.teal,
      blue: colors.blue,
      indigo: colors.indigo,
      purple: colors.purple,
      pink: colors.pink,
    },

    extend: {
      animation: {
        'slide-object': 'slide-object 5s ease infinite',
      },
      keyframes: {
        'slide-object': {
          '0%': { objectPosition: 'center' },
          '25%': { objectPosition: '0 0' },
          '50%': { objectPosition: 'center' },
          '75%': { objectPosition: '100% 0' },
          '100%': { objectPosition: 'center' },
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.500'),
            h1: { color: theme('colors.gray.700'), fontWeight: '700' },
            h2: { color: theme('colors.gray.700'), fontWeight: '600' },
            h3: { color: theme('colors.gray.700'), fontWeight: '500' },
            h4: { color: theme('colors.gray.700'), fontWeight: '500' },
          },
        },
      }),
    },
  },
  purge: ['./src/**/*.css', './src/**/*.js', './src/**/*.jsx'],
};
