import { CommitOptions, DispatchOptions, Module, Store as VuexStore } from 'vuex'
import { RootState } from '@/store/types'
import { State } from './types'
import { Mutations, mutations } from './mutations'
import { Getters, getters } from './getters'
import { Actions, actions } from './actions'

const state: State = {
  pokemons: {
    data: [],
    limit: 30,
    offset: 0,
    status: { loading: false, error: undefined },
  },
  pokemon: {
    data: undefined,
    status: { loading: false, error: undefined },
  },
}

export { State }

export type PokedexStore<S = State> = Omit<VuexStore<S>, 'getters' | 'commit' | 'dispatch'> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
}

export const store: Module<State, RootState> = {
  state,
  mutations,
  getters,
  actions,
}
