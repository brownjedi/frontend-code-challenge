import { createStore, createLogger } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { RootState } from './types'

import { store as pokedex, PokedexStore } from './modules/pokedex'

export type Store = PokedexStore<Pick<RootState, 'pokedex'>>

const isProd = process.env.NODE_ENV === 'production'

const plugins = [
  createPersistedState({
    paths: ['pokedex.rgbaster'],
  }),
]

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
