module.exports = {
  root: true,
  plugins: ['@docusaurus'],
  extends: ['plugin:@docusaurus/recommended', 'airbnb'],
  ignorePatterns: ['build', 'src'],
  rules: {
    'import/no-unresolved': [2, { ignore: ['^@theme', '^@docusaurus'] }],
    semi: [2, 'never'],
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: true,
        variables: true,
        allowNamedExports: false,
      },
    ],
    'no-console': ['error', { allow: ['warn', 'error'] }],
  },
  overrides: [
    {
      files: ['*.jsx'],
    },
  ],
}
