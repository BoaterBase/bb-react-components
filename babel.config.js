console.log('\nBabel', process.env.NODE_ENV);

// FIX: https://github.com/developit/microbundle/issues/694
module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    [
      '@babel/plugin-proposal-optional-chaining',
      {
        loose: true,
      },
    ],
  ],
};
