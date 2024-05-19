import js from '@eslint/js';
import globals from "globals";
import { FlatCompat } from '@eslint/eslintrc';
import airbnbConfig from "eslint-config-airbnb-base";
import prettier from 'eslint-config-prettier'
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compact = new FlatCompat({
  baseDirectory: __dirname,
});

const airbnb = compact.config(airbnbConfig);

export default [
  js.configs.recommended,
  prettier,
  ...airbnb,
  {
    languageOptions: { globals: globals.browser }
  },
  {
    ignores: ['node_modules/**', 'dist/**', 'test/**', "*.config.mjs"]
  },
  {
    rules: {
      "comma-dangle": ["error", {
        "arrays": "never",
        "objects": "never",
        "imports": "never",
        "exports": "never",
        "functions": "never"
      }],
      "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]
    }
  }
];
