console.log('\nTailwinds', process.env.NODE_ENV);

module.exports = {
  prefix: 'bb-',
  variants: {
    zIndex: ['responsive', 'hover', 'focus'],
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
  },
  plugins: [require('@tailwindcss/ui')],
  purge: ['./src/**/*.css', './src/**/*.js', './src/**/*.jsx'],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};
