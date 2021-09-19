import { MutationTree } from 'vuex'
import { PokemonInfo, PokemonOverview, RGBaster, State } from './types'

export enum PokedexMutations {
  SET_POKEMONS = 'POKEDEX/SET_POKEMONS',
  SET_POKEMONS_LOADING = 'POKEDEX/SET_POKEMONS_LOADING',
  SET_POKEMONS_ERROR = 'POKEDEX/SET_POKEMONS_ERROR',

  SET_POKEMON = 'POKEDEX/SET_POKEMON',
  SET_POKEMON_LOADING = 'POKEDEX/SET_POKEMON_LOADING',
  SET_POKEMON_ERROR = 'POKEDEX/SET_POKEMON_ERROR',

  SET_RGBASTER = 'POKEDEX/SET_RGBASTER',
}

export type Mutations<S = State> = {
  [PokedexMutations.SET_POKEMONS](state: S, payload: { data: PokemonOverview[]; limit: number; offset: number }): void
  [PokedexMutations.SET_POKEMONS_LOADING](state: S, status: boolean): void
  [PokedexMutations.SET_POKEMONS_ERROR](state: S, error?: Error | boolean): void

  [PokedexMutations.SET_POKEMON](state: S, payload: PokemonInfo): void
  [PokedexMutations.SET_POKEMON_LOADING](state: S, status: boolean): void
  [PokedexMutations.SET_POKEMON_ERROR](state: S, error?: Error | boolean): void

  [PokedexMutations.SET_RGBASTER](state: S, payload: { pokemonName: string } & RGBaster): void
}

export const mutations: MutationTree<State> & Mutations = {
  [PokedexMutations.SET_POKEMONS](state, { data, limit, offset }) {
    state.pokemons.data = data
    state.pokemons.limit = limit
    state.pokemons.offset = offset
  },
  [PokedexMutations.SET_POKEMONS_LOADING](state, status) {
    state.pokemons.status.loading = status
  },
  [PokedexMutations.SET_POKEMONS_ERROR](state, error) {
    state.pokemons.status.error = error
  },

  [PokedexMutations.SET_POKEMON](state, payload: PokemonInfo) {
    state.pokemon.data = payload
  },
  [PokedexMutations.SET_POKEMON_LOADING](state, status) {
    state.pokemon.status.loading = status
  },
  [PokedexMutations.SET_POKEMON_ERROR](state, error) {
    state.pokemon.status.error = error
  },

  [PokedexMutations.SET_RGBASTER](state, { pokemonName, backgroundColor, textColor }) {
    state.rgbaster[pokemonName] = { backgroundColor, textColor }
  },
}
