module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    // disable semicolon
    '@typescript-eslint/member-delimiter-style': 'off',
    // allow use of 'any'
    '@typescript-eslint/no-explicit-any': 'off',
    // allow explicit type declarations
    '@typescript-eslint/no-inferrable-types': 'off'
  }
}
