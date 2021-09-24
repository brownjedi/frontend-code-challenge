import { createStore, createLogger } from 'vuex'
import { RootState } from './types'

import { store as pokedex, PokedexStore } from './modules/pokedex'

export type Store = PokedexStore<Pick<RootState, 'pokedex'>>

const isProd = process.env.NODE_ENV === 'production'
const isTest = process.env.NODE_ENV === 'test'

const plugins = []

if (!isProd && !isTest) {
  plugins.push(createLogger())
}

export const store = createStore<RootState>({
  plugins,
  modules: {
    pokedex,
  },
})

export function useStore(): Store {
  return store as Store
}
