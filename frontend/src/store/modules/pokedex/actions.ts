import { ActionContext, ActionTree } from 'vuex'

import { RootState } from '@/store/types'
import { apolloClient } from '@/graphql/apolloClient'
import { State } from './types'
import { Mutations } from './mutations'
import { FAVORITE_POKEMON_MUTATION, UNFAVORITE_POKEMON_MUTATION } from '../../../graphql/graphql-queries'

export enum PokedexActions {
  SET_FAVORITE = 'POKEDEX/SET_FAVORITE',
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
  [PokedexActions.SET_FAVORITE](
    { commit }: AugmentedActionContext,
    payload: { id: string; favorite: boolean }
  ): Promise<void>
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [PokedexActions.SET_FAVORITE](_, { id, favorite }) {
    try {
      apolloClient.mutate({
        mutation: favorite ? FAVORITE_POKEMON_MUTATION : UNFAVORITE_POKEMON_MUTATION,
        variables: { id },
      })
    } catch (err) {
      console.log(err)
    }
  },
}
