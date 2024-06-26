import js from '@eslint/js';
import globals from 'globals';
import { FlatCompat } from '@eslint/eslintrc';
import babelParser from '@babel/eslint-parser';
import prettier from 'eslint-config-prettier';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

export default [
  js.configs.recommended,
  ...compat.extends('eslint-config-airbnb-base'),
  prettier,
  {
    languageOptions: { parser: babelParser, globals: globals.browser }
  },
  {
    ignores: ['node_modules/**', 'dist/**', 'tests/**', '*.config.*js']
  },
  {
    rules: {
      'comma-dangle': [
        'error',
        {
          arrays: 'never',
          objects: 'never',
          imports: 'never',
          exports: 'never',
          functions: 'never'
        }
      ],
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      'no-underscore-dangle': [
        'error',
        {
          allow: ['_baseURL', '_clientId', '_ocapiVersion', '_timeout', '_authentication'],
          allowAfterThis: true
        }
      ],
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
      'dot-notation': 'off'
    }
  },
  {
    settings: {
      'import/resolver': {
        alias: {
          map: [
            ['@core', path.resolve(__dirname, 'lib/core')],
            ['@utils', path.resolve(__dirname, 'lib/utils')],
            ['@model', path.resolve(__dirname, 'lib/model')],
            ['@constants', path.resolve(__dirname, 'lib/constants')]
          ]
        }
      }
    }
  }
];
