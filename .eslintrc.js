module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ['@nuxtjs/eslint-config-typescript', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  // add your custom rules here
  rules: {
    semi: ['warn', 'always'], // Habilita aspas simples
    'vue/multi-word-component-names': 'off', // Permite a inserção de componentes que não possuem nomes compostos
    'spaced-comment': ['warn', 'always'], // Quando um comentário está sem espaço, ele apenas dá um warning, ao invés de um error.
    skipStrings: 'off',
    'import/no-named-as-default-member': 'off',
    'no-irregular-whitespace': 'off',
  },
};
