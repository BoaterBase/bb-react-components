console.log('\nTailwinds', process.env.NODE_ENV);

module.exports = {
  prefix: 'bb-',
  variants: {
    zIndex: ['responsive', 'hover', 'focus', 'focus-within'],
    animation: ['responsive', 'hover'],
  },
  theme: {
    typography: (theme) => ({
      default: {
        css: {
          color: theme('colors.gray.500'),
          h1: { color: theme('colors.gray.700'), fontWeight: '700' },
          h2: { color: theme('colors.gray.700'), fontWeight: '600' },
          h3: { color: theme('colors.gray.700'), fontWeight: '500' },
          h4: { color: theme('colors.gray.700'), fontWeight: '500' },
        },
      },
    }),
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
    },
  },
  plugins: [require('@tailwindcss/ui')],
  purge: ['./src/**/*.css', './src/**/*.js', './src/**/*.jsx'],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};
