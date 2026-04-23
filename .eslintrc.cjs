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
    'import/resolver': {
      typescript: {},
    },
  },

  plugins: ['@typescript-eslint', 'react-hooks', 'react-refresh', 'import', 'unused-imports'],

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

    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',

    /**
     *  Import rules
     */
    'import/default': 'off',
    'import/no-unresolved': 'off',
    'import/order': 'off',
    'unused-imports/no-unused-imports': 'error',

    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],

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
