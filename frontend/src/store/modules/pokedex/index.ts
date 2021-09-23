import { CommitOptions, Module, Store as VuexStore } from 'vuex'
import { RootState } from '@/store/types'
import { State } from './types'
import { Mutations, mutations } from './mutations'

const state: State = {
  query: {
    search: '',
    filter: {
      type: '',
    },
  },
  ui: {
    color: getComputedStyle(document.documentElement).getPropertyValue(`--main-text-color`),
  },
}

export { State }

export type PokedexStore<S = State> = Omit<VuexStore<S>, 'commit'> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
}

export const store: Module<State, RootState> = {
  state,
  mutations,
}
