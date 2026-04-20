/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,

  env: {
    browser: true,
    es2021: true,
  },

  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  settings: {
    react: {
      version: 'detect',
    },
  },

  plugins: ['@typescript-eslint', 'react-hooks', 'react-refresh', 'import'],

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier', // always last
  ],

  ignorePatterns: ['dist', 'node_modules', '.eslintrc.cjs', 'vite.config.ts'],

  rules: {
    /**
     *  React
     */
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

    /**
     *  TypeScript
     */
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

    '@typescript-eslint/no-explicit-any': 'warn', // You can change it to error if you want it to be more strict
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',

    /**
     *  Import rules
     */
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],

    'import/no-unresolved': 'error',

    /**
     *  Prohibit relative import (very important)
     */
    'no-restricted-imports': [
      'warn',
      {
        patterns: ['../../*', '../../../*'],
      },
    ],

    /**
     *  General
     */
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'warn',

    /**
     *  Code style (Let Prettier handle the formatting)
     */
    'arrow-body-style': ['warn', 'as-needed'],
  },
};
