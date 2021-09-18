import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store/types'
import { apolloClient } from '@/apolloClient'
import { State } from './types'
import { Mutations, PokedexMutations } from './mutations'
import { POKEMONS_QUERY, POKEMON_BY_NAME_QUERY } from './graphql-queries'

export enum PokedexActions {
  FETCH_POKEMONS = 'POKEDEX/FETCH_POKEMONS',
  FETCH_POKEMON_BY_NAME = 'POKEDEX/FETCH_POKEMON_BY_NAME',
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
  [PokedexActions.FETCH_POKEMONS]({ commit }: AugmentedActionContext): Promise<void>
  [PokedexActions.FETCH_POKEMON_BY_NAME]({ commit }: AugmentedActionContext, name: string): Promise<void>
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [PokedexActions.FETCH_POKEMONS]({ commit }) {
    commit(PokedexMutations.SET_POKEMONS_LOADING, true)
    commit(PokedexMutations.SET_POKEMONS_ERROR, undefined)
    try {
      const result = await apolloClient.query({ query: POKEMONS_QUERY })
      const { edges, limit, offset } = result.data.pokemons
      commit(PokedexMutations.SET_POKEMONS, { data: edges, limit, offset })
    } catch (err) {
      commit(PokedexMutations.SET_POKEMONS_ERROR, err as Error)
    } finally {
      commit(PokedexMutations.SET_POKEMONS_LOADING, false)
    }
  },

  async [PokedexActions.FETCH_POKEMON_BY_NAME]({ commit }, name) {
    commit(PokedexMutations.SET_POKEMON_LOADING, true)
    commit(PokedexMutations.SET_POKEMON_ERROR, undefined)
    try {
      const result = await apolloClient.query({ query: POKEMON_BY_NAME_QUERY, variables: { name } })
      commit(PokedexMutations.SET_POKEMON, result.data.pokemon)
    } catch (err) {
      commit(PokedexMutations.SET_POKEMON_ERROR, err as Error)
    } finally {
      commit(PokedexMutations.SET_POKEMON_LOADING, false)
    }
  },
}
