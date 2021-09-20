import { MutationTree } from 'vuex'
import { State } from './types'
import { PokemonOverview } from '@/types'

export enum PokedexMutations {
  SET_POKEMONS = 'POKEDEX/SET_POKEMONS',
  SET_POKEMONS_LOADING = 'POKEDEX/SET_POKEMONS_LOADING',
  SET_POKEMONS_ERROR = 'POKEDEX/SET_POKEMONS_ERROR',
}

export type Mutations<S = State> = {
  [PokedexMutations.SET_POKEMONS](
    state: S,
    payload: { data: PokemonOverview[]; limit: number; offset: number; count: number }
  ): void
  [PokedexMutations.SET_POKEMONS_LOADING](state: S, status: boolean): void
  [PokedexMutations.SET_POKEMONS_ERROR](state: S, error?: Error | boolean): void
}

export const mutations: MutationTree<State> = {}
