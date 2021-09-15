export const SET_POKEMON = 'SET_POKEMON'
export const SET_POKEMONS = 'SET_POKEMONS'

// initial state
const state = () => ({
  pokemons: {},
  pokemon: {},
})

const mutations = {
  [SET_POKEMON](state, pokemon) {
    state.pokemon = pokemon
  },
  [SET_POKEMONS](state, pokemons) {
    state.pokemons = pokemons
  },
}

const actions = {
  async fetchPokemons() {},
  async fetchPokemonById() {},
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
