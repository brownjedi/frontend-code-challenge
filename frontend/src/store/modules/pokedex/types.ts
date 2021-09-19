export interface State {
  pokemons: {
    limit: number
    offset: number
    data: PokemonOverview[]
    status: Status
  }
  pokemon: {
    data?: PokemonInfo
    status: Status
  }
  rgbaster: {
    [key: string]: RGBaster
  }
}

export interface RGBaster {
  backgroundColor: string
  textColor: string
}

export interface Status {
  loading: boolean
  error?: Error | boolean
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

export interface PokemonInfo extends PokemonOverview {
  number: number
  maxCP: number
  maxHP: number
  fleeRate: number
  resistant: string[]
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
  evolutions: {
    id: string
    name: string
  }[]
  height: {
    minimum: string
    maximum: string
  }
  weight: {
    minimum: string
    maximum: string
  }
}
