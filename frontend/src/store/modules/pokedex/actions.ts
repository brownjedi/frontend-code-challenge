import { ActionContext, ActionTree } from 'vuex'
import Color from 'color'
import rgbaster from 'rgbaster'
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

  async [PokedexActions.FETCH_POKEMON_BY_NAME]({ commit, state }, name) {
    commit(PokedexMutations.SET_POKEMON_LOADING, true)
    commit(PokedexMutations.SET_POKEMON_ERROR, undefined)
    try {
      const result = await apolloClient.query({ query: POKEMON_BY_NAME_QUERY, variables: { name } })
      const { pokemon } = result.data
      commit(PokedexMutations.SET_POKEMON, pokemon)

      // save dominant background color in vuex if not already present
      if (!state.rgbaster[pokemon.name]) {
        const rgbasterResult = await rgbaster(pokemon.image)
        const backgroundColor = rgbasterResult?.[0].color ?? '#FFFFFF'
        const textColor = new Color(backgroundColor).isLight() ? '#000000' : '#FFFFFF'
        commit(PokedexMutations.SET_RGBASTER, { pokemonName: pokemon.name, backgroundColor, textColor })
      }
    } catch (err) {
      commit(PokedexMutations.SET_POKEMON_ERROR, err as Error)
    } finally {
      commit(PokedexMutations.SET_POKEMON_LOADING, false)
    }
  },
}
