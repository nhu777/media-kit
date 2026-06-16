// =============================================================================
// Arbor Design System - Deprecated Class Replacements
// =============================================================================

// Encourage Arbor semantic typography utilities instead of Tailwind t-shirt sizes.
const arborTypographyReplacements = [
  { name: 'text-xxs', use: 'text-body-xxs' },
  { name: 'text-xs', use: 'text-body-xs' },
  { name: 'text-sm', use: 'text-body-sm' },
  { name: 'text-base', use: 'text-body-base' },
  { name: 'text-md', use: 'text-body-base' },
  { name: 'text-lg', use: 'text-title-sm' },
  { name: 'text-xl', use: 'text-5xl' },
  { name: 'text-2xl', use: 'text-title-md' },
  { name: 'text-3xl', use: 'text-title-lg' },
  { name: 'text-4xl', use: 'text-title-xl' },
];

// Brand colors should use the brand-* prefix for consistency.
const arborBrandColors = [
  'apple',
  'canopy',
  'chalk',
  'charcoal',
  'chartreuse',
  'concrete',
  'currant',
  'dahlia',
  'felt',
  'forest',
  'goldenrod',
  'heather',
  'hydrangea',
  'iris',
  'lavender',
  'lichen',
  'marble',
  'moss',
  'orchid',
  'pansy',
  'pebble',
  'poppy',
  'root',
  'rose',
  'sand',
  'shade',
  'sky',
  'slate',
  'stone',
];

// All Tailwind utility prefixes that accept color values
const arborColorPrefixes = [
  'bg',
  'text',
  'border',
  'border-t',
  'border-b',
  'border-l',
  'border-r',
  'border-x',
  'border-y',
  'ring',
  'outline',
  'fill',
  'stroke',
  'caret',
  'accent',
  'divide',
  'decoration',
  'shadow',
  'from',
  'via',
  'to',
  'placeholder',
];

const arborColorReplacements = arborColorPrefixes.flatMap(prefix =>
  arborBrandColors.map(color => ({
    name: `${prefix}-${color}`,
    use: `${prefix}-brand-${color}`,
  }))
);

// Arbor spacing uses Tailwind's numeric scale—map legacy t-shirt spacing aliases.
const arborSpacingScaleMap = {
  '2xs': '1',
  xs: '2',
  sm: '3',
  md: '4',
  lg: '6',
  xl: '8',
  '2xl': '12',
};

const arborSpacingPrefixes = [
  'p',
  'px',
  'py',
  'pt',
  'pb',
  'pl',
  'pr',
  'm',
  'mx',
  'my',
  'mt',
  'mb',
  'ml',
  'mr',
  'space-x',
  'space-y',
  'gap',
  'gap-x',
  'gap-y',
  'h',
  'w',
];

const arborSpacingReplacements = arborSpacingPrefixes.flatMap(prefix =>
  Object.entries(arborSpacingScaleMap).map(([token, value]) => ({
    name: `${prefix}-${token}`,
    use: `${prefix}-${value}`,
  }))
);

// =============================================================================
// ESLint Configuration - Relaxed for Prototyping
// =============================================================================
// This config prioritizes developer velocity over strict type safety.
// It keeps formatting/import rules (helpful for consistency) but relaxes
// accessibility and type-checking rules that slow down prototyping.

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    // Disable type-aware linting for faster performance
    project: null,
  },
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'simple-import-sort',
    'prettier',
    'deprecate-classnames',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    // =========================================================================
    // KEEP: React Hooks rules - these catch real bugs
    // =========================================================================
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // =========================================================================
    // KEEP: React rules
    // =========================================================================
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/react-in-jsx-scope': 'off',

    // =========================================================================
    // RELAXED: TypeScript rules - allow flexibility for prototyping
    // =========================================================================
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],

    // =========================================================================
    // KEEP: Import sorting - auto-fixable and keeps things tidy
    // =========================================================================
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    // =========================================================================
    // KEEP: Prettier - auto-fixable formatting
    // =========================================================================
    'prettier/prettier': 'error',

    // =========================================================================
    // KEEP: Arbor Design System warnings - helpful for designers
    // =========================================================================
    'deprecate-classnames/classnames': [
      'warn',
      ...arborTypographyReplacements,
      ...arborSpacingReplacements,
      ...arborColorReplacements,
    ],

    // =========================================================================
    // RELAXED: General rules
    // =========================================================================
    'prefer-const': 'warn',
    'no-console': 'off',
    'no-debugger': 'warn',
  },
  overrides: [
    // JavaScript files - disable TypeScript-specific rules
    {
      files: ['*.js', '*.jsx'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'coverage/',
    '.next/',
    'out/',
    '*.config.js',
    '*.config.mjs',
  ],
};
