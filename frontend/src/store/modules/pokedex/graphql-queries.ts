import gql from 'graphql-tag'

const POKEMON_OVERVIEW_FRAGMENT = gql`
  fragment PokemonOverviewFields on Pokemon {
    id
    name
    image
    sprites {
      normal
      animated
    }
    classification
    types
    isFavorite
  }
`

export const POKEMONS_QUERY = gql`
  ${POKEMON_OVERVIEW_FRAGMENT}
  query pokemons {
    pokemons(query: { limit: 100 }) {
      limit
      offset
      edges {
        ...PokemonOverviewFields
      }
    }
  }
`

export const POKEMON_BY_NAME_QUERY = gql`
  ${POKEMON_OVERVIEW_FRAGMENT}
  query pokemon($name: String!) {
    pokemon: pokemonByName(name: $name) {
      ...PokemonOverviewFields
      number
      maxCP
      maxHP
      fleeRate
      resistant
      sound
      types
      weaknesses
      attacks {
        special {
          name
          type
          damage
        }
        fast {
          name
          type
          damage
        }
      }
      evolutionRequirements {
        name
        amount
      }
      evolutions {
        id
        name
      }
      height {
        minimum
        maximum
      }
      weight {
        minimum
        maximum
      }
    }
  }
`
