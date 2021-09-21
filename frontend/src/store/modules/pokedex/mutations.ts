import { MutationTree } from 'vuex'
import { State } from './types'

export enum PokedexMutations {
  SET_SEARCH = 'POKEDEX/SET_SEARCH',
  SET_TYPE = 'POKEDEX/SET_TYPE',
}

export type Mutations<S = State> = {
  [PokedexMutations.SET_SEARCH](state: S, payload: { search: string }): void
  [PokedexMutations.SET_TYPE](state: S, payload: { type: string }): void
}

export const mutations: MutationTree<State> & Mutations = {
  [PokedexMutations.SET_SEARCH](state, { search }) {
    state.query.search = search
  },
  [PokedexMutations.SET_TYPE](state, { type }) {
    state.query.filter.type = type
  },
}
