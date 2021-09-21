export interface PokemonFilterInput {
  type?: string
  isFavorite?: boolean
}

export interface PokemonsQueryInput {
  limit?: number
  offset?: number
  search?: string
  filter?: PokemonFilterInput
}

export interface PokemonsQueryResponse {
  pokemons: PokemonList
}

export interface PokemonByNameQueryResponse {
  pokemon: PokemonInfo
}

export interface PokemonTypesQueryResponse {
  pokemonTypes: PokemonTypes
}

export interface FavoriteQueryResponse {
  pokemon: Pick<PokemonOverview, 'id' | 'isFavorite'>
}

export interface UnFavoriteQueryResponse {
  pokemon: Pick<PokemonOverview, 'id' | 'isFavorite'>
}

export interface PokemonList {
  count: number
  edges: PokemonOverview[]
  limit: number
  offset: number
}

export interface PokemonOverview {
  id: string
  name: string
  image: string
  sprites: {
    normal: string
    animated: string
  }
  isFavorite: boolean
  classification: string
  types: string[]
}

export interface Evolution {
  id: string
  name: string
}

export interface RGBaster {
  backgroundColor: string
  textColor: string
}

export interface PokemonInfo extends PokemonOverview {
  number: number
  maxCP: number
  maxHP: number
  fleeRate: number
  resistant: string[]
  rgbaster: RGBaster
  sound: string
  weaknesses: string[]
  attacks: {
    special: {
      name: string
      type: string
      damage: number
    }
    fast: {
      name: string
      type: string
      damage: number
    }
  }[]
  evolutionRequirements: {
    name: string
    amount: number
  }
  evolutions: Evolution[]
  height: {
    minimum: string
    maximum: string
  }
  weight: {
    minimum: string
    maximum: string
  }
}

export interface PokemonTypes {
  pokemonTypes: string[]
}
