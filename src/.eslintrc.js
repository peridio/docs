module.exports = {
  plugins: ['@docusaurus'],
  extends: ['plugin:@docusaurus/recommended', 'airbnb'],
  ignorePatterns: ['build', 'src'],
  rules: {
    'import/no-unresolved': [2, { ignore: ['^@theme', '^@docusaurus'] }],
    semi: [2, 'never'],
  },
  overrides: [
    {
      files: ['*.jsx'],
    },
  ],
}
