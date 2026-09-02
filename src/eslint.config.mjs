import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import docusaurusPlugin from '@docusaurus/eslint-plugin'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'

export default [
  {
    ignores: ['build', 'vendor', '.cache-references'],
  },
  {
    // `.mjs` belongs here, not in a gap. Node scripts that must be ESM (mermaid
    // ships ESM only, this package is commonjs) carry that extension, and
    // without it `npm run lint` reports 0 rules for them - a green lint that
    // says nothing about the file. `sourceType: 'module'` below is already what
    // `.mjs` needs.
    files: ['**/*.{js,jsx,mjs}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        babelOptions: {
          presets: ['@babel/preset-react'],
        },
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      '@docusaurus': docusaurusPlugin,
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...docusaurusPlugin.configs.recommended.rules,
      // Disable prop-types since TypeScript provides better type checking
      'react/prop-types': 'off',
      // React 17+ JSX transform — no need to import React for JSX
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      '@docusaurus': docusaurusPlugin,
      '@typescript-eslint': typescriptPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...docusaurusPlugin.configs.recommended.rules,
      ...typescriptPlugin.configs.recommended.rules,
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
]
