const path = require('path')

module.exports = {
  client: {
    service: {
      name: 'pokedex-backend',
      localSchemaFile: path.resolve(__dirname, './schema.json'),
    },
    includes: ['src/**/*.{js,jsx,ts,tsx,vue,gql}'],
  },
}
