import { gql } from '@apollo/client/core'

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
  query pokemons($query: PokemonsQueryInput! = { limit: 30, offset: 0 }) {
    pokemons(query: $query) {
      limit
      offset
      count
      edges {
        ...PokemonOverviewFields
      }
    }
  }
`

export const POKEMON_TYPES_QUERY = gql`
  query pokemonTypes {
    pokemonTypes
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
      rgbaster @client {
        backgroundColor
        textColor
      }
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

export const FAVORITE_POKEMON_MUTATION = gql`
  mutation favoritePokemon($id: ID!) {
    pokemon: favoritePokemon(id: $id) {
      id
      isFavorite
    }
  }
`

export const UNFAVORITE_POKEMON_MUTATION = gql`
  mutation unFavoritePokemon($id: ID!) {
    pokemon: unFavoritePokemon(id: $id) {
      id
      isFavorite
    }
  }
`
