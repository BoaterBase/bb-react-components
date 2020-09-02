console.log('PostCSS', process.env.NODE_ENV);

module.exports = {
  plugins: [require('postcss-import'), require('tailwindcss'), require('autoprefixer')],
};
