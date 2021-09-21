import { createStore, createLogger } from 'vuex'
import { RootState } from './types'

import { store as pokedex, PokedexStore } from './modules/pokedex'

export type Store = PokedexStore<Pick<RootState, 'pokedex'>>

const isProd = process.env.NODE_ENV === 'production'

const plugins = []

if (!isProd) {
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
