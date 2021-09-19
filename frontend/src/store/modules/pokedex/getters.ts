import { GetterTree } from 'vuex'
import { RootState } from '@/store/types'
import { PokemonOverview, State, RGBaster, PokemonInfo } from './types'

export type Getters = {
  getPokemons(state: State): PokemonOverview[]
  getPokemon(state: State): PokemonInfo | undefined
  getRGBasterInfo(state: State): (name: string) => RGBaster
}

export const getters: GetterTree<State, RootState> & Getters = {
  getPokemons: state => state.pokemons.data,
  getPokemon: state => state.pokemon.data,
  getRGBasterInfo: state => name => state.rgbaster[name],
}
