module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    semi: [2, 'never'],
    'react/prop-types': 'off',
    'no-continue': 'off',
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'linebreak-style': 0,
    'no-use-before-define': 'off',
    'no-underscore-dangle': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'no-plusplus': ['error', {
      allowForLoopAfterthoughts: true,
    }],
    'no-shadow': 'off',
    'react/require-default-props': 'off',
    'react/jsx-filename-extension': [1, {
      extensions: ['.tsx'],
    }],
    'import/no-unresolved': 'off',
    'no-unused-vars': ['error', {
      args: 'none',
    }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  globals: {
    JSX: true,
    RequestInfo: true,
    RequestInit: true,
    FirebaseFirestore: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
}
