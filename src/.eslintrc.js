module.exports = {
  extends: 'airbnb',
  ignorePatterns: ['build'],
  rules: {
    'import/no-unresolved': [2, { ignore: ['^@theme', '^@docusaurus'] }],
  },
  overrides: [
    {
      files: ['*.jsx'],
    },
  ],
};
