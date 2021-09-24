module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
    'plugin:jest/recommended',
    'plugin:cypress/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  plugins: ['graphql', 'cypress', 'jest'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // 'graphql/template-strings': [
    //   'error',
    //   {
    //     // Import default settings for your GraphQL client. Supported values:
    //     // 'apollo', 'relay', 'lokka', 'fraql', 'literal'
    //     env: 'apollo',

    //     // Import your schema JSON here
    //     schemaJson: require('./schema.json'),

    //     // OR provide absolute path to your schema JSON (but not if using `eslint --cache`!)
    //     // schemaJsonFilepath: path.resolve(__dirname, './schema.json'),

    //     // OR provide the schema in the Schema Language format
    //     // schemaString: printSchema(schema),

    //     // tagName is gql by default
    //   },
    // ],
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
}
