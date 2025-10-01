// @ts-check
import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'
import unusedImportPlugin from 'eslint-plugin-unused-imports'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    plugins: {
      'unused-imports': unusedImportPlugin,
      '@stylistic': stylistic,
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['**/*.ts'],
    extends: [importPlugin.flatConfigs.recommended, importPlugin.flatConfigs.typescript],
  },
  {
    settings: {
      'import/resolver': {
        typescript: true,
      },
    }
  },
  {
    rules: {
      'import/order': [
        'warn',
        {
          groups: [
            // External group
            ['builtin', 'external'],
            // Internal group
            ['internal', 'parent', 'sibling', 'index', 'unknown']],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
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
      '@stylistic/padding-line-between-statements': [
        'warn',
        // 1. Keep directive prologue tight, then a blank line before rest.
        { blankLine: 'always', prev: 'directive', next: '*' },
        { blankLine: 'any', prev: 'directive', next: 'directive' },
        // 2. Separate import section from rest of file (import/order groups already compact imports themselves).
        { blankLine: 'always', prev: 'import', next: '*' },
        { blankLine: 'any', prev: 'import', next: 'import' },
        // 3. Group const/let declarations together, then space before following logic.
        { blankLine: 'always', prev: ['const', 'let'], next: '*' },
        { blankLine: 'any', prev: ['const', 'let'], next: ['const', 'let'] },
        // 4. Add clarity before return statements.
        { blankLine: 'always', prev: '*', next: 'return' },
        // 4b. Ensure a visual break after core control-flow blocks (supported selectors only).
        { blankLine: 'always', prev: ['if', 'for', 'while', 'switch', 'try'], next: '*' },
        // 5. Space before major blocks (functions, classes) unless already separated by imports/vars rule.
        { blankLine: 'always', prev: '*', next: ['function', 'class'] },
        // 6. Space before TypeScript declarations (interfaces / type aliases) for readability in model-heavy files.
        { blankLine: 'always', prev: '*', next: ['interface', 'type'] },
        // 7. Keep consecutive exports together but separate export section from preceding logic.
        { blankLine: 'always', prev: '*', next: 'export' },
        { blankLine: 'any', prev: 'export', next: 'export' }
      ],
      // Enforce braces for all control statements to forbid single-line if without braces.
      curly: ['error', 'all'],
    },
  },
  eslintPluginPrettierRecommended,
);
