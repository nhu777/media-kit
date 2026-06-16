/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ['@repo/eslint-config'],
  ignorePatterns: [
    '.next/',
    'out/',
    'public/',
    'scripts/',
    '*.config.js',
    '*.config.mjs',
    '.eslintrc.js',
    'next-env.d.ts',
    'node_modules/',
    'packages/',
  ],
};
