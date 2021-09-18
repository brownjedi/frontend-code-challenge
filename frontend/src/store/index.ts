import { createStore, createLogger } from 'vuex'
import { RootState } from './types'

import { store as pokedex, PokedexStore } from './modules/pokedex'

export type Store = PokedexStore<Pick<RootState, 'pokedex'>>

export const store = createStore<RootState>({
  plugins: [createLogger()],
  modules: {
    pokedex,
  },
})

export function useStore(): Store {
  return store as Store
}
