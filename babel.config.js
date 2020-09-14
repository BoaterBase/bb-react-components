console.log('\nBabel', process.env.NODE_ENV);

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
        bugfixes: true,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    // FIX: https://github.com/developit/microbundle/issues/694
    [
      '@babel/plugin-proposal-optional-chaining',
      {
        loose: true,
      },
    ],
  ],
};
