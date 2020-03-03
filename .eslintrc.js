module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {},
  extends: ['@nuxtjs/eslint-config-typescript'],
  // add your custom rules here
  rules: {
    quotes: [0, 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    indent: [0, 2],
    semi: [0, 'always'],
    'comma-dangle': [0],
    'space-before-function-paren': [0],
    'arrow-parens': [0],
    'vue/html-self-closing': [0],
  },
};
