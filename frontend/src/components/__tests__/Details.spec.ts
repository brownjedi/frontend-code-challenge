import { flushPromises, shallowMount } from '@vue/test-utils'
import Details from '@/components/Details.vue'
import { createMockClient, MockApolloClient } from 'mock-apollo-client'
import {
  FAVORITE_POKEMON_MUTATION,
  POKEMON_BY_NAME_QUERY,
  UNFAVORITE_POKEMON_MUTATION,
} from '@/graphql/graphql-queries'
import { provideApolloClient } from '@vue/apollo-composable'

const pokemon = {
  id: '001',
  name: 'Bulbasaur',
  image: 'http://localhost:4000/img/artwork/vector/large/bulbasaur.png',
  sprites: {
    normal: 'http://localhost:4000/img/sprites/black-white/normal/bulbasaur.png',
    animated: 'http://localhost:4000/img/sprites/black-white/anim/normal/bulbasaur.gif',
  },
  classification: 'Seed Pokémon',
  types: ['Grass', 'Poison'],
  isFavorite: false,
  number: 1,
  maxCP: 951,
  maxHP: 1071,
  fleeRate: 0.1,
  resistant: ['Water', 'Electric', 'Grass', 'Fighting', 'Fairy'],
  sound: 'http://localhost:4000/sounds/1',
  weaknesses: ['Fire', 'Ice', 'Flying', 'Psychic'],
  attacks: {
    special: [
      {
        name: 'Power Whip',
        type: 'Grass',
        damage: 70,
      },
      {
        name: 'Seed Bomb',
        type: 'Grass',
        damage: 40,
      },
      {
        name: 'Sludge Bomb',
        type: 'Poison',
        damage: 55,
      },
    ],
    fast: [
      {
        name: 'Tackle',
        type: 'Normal',
        damage: 12,
      },
      {
        name: 'Vine Whip',
        type: 'Grass',
        damage: 7,
      },
    ],
  },
  evolutionRequirements: {
    name: 'Bulbasaur candies',
    amount: 25,
  },
  evolutions: [
    {
      id: '002',
      name: 'Ivysaur',
    },
    {
      id: '003',
      name: 'Venusaur',
    },
  ],
  height: {
    minimum: '0.61m',
    maximum: '0.79m',
  },
  weight: {
    minimum: '6.04kg',
    maximum: '7.76kg',
  },
}

describe('components/Details.vue', () => {
  let favRequestHandler: jest.Mock
  let unFavRequestHandler: jest.Mock
  let pokemonByNameRequestHandler: jest.Mock
  let mockClient: MockApolloClient

  beforeEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    mockClient = createMockClient()
    pokemonByNameRequestHandler = jest.fn()
    favRequestHandler = jest.fn()
    unFavRequestHandler = jest.fn()
    mockClient.setRequestHandler(POKEMON_BY_NAME_QUERY, pokemonByNameRequestHandler)
    mockClient.setRequestHandler(FAVORITE_POKEMON_MUTATION, favRequestHandler)
    mockClient.setRequestHandler(UNFAVORITE_POKEMON_MUTATION, unFavRequestHandler)
    provideApolloClient(mockClient)
  })

  describe('when query loading', () => {
    it('has the expected html structure', () => {
      const wrapper = shallowMount(Details, {
        props: {
          name: pokemon.name,
        },
      })
      expect(wrapper.element).toMatchSnapshot()
    })

    it('sends the pokemon name in the graphql query', () => {
      shallowMount(Details, {
        props: {
          name: pokemon.name,
        },
      })

      expect(pokemonByNameRequestHandler).toHaveBeenCalledWith({ name: pokemon.name.toLowerCase() })
    })
  })

  describe('when query fails', () => {
    it('shows error message', async () => {
      pokemonByNameRequestHandler.mockRejectedValueOnce(new Error('Graphql query failed'))

      const wrapper = shallowMount(Details, {
        props: {
          name: pokemon.name,
        },
      })

      expect(pokemonByNameRequestHandler).toHaveBeenCalledTimes(1)

      // wait for apollo results
      await flushPromises()

      // ensure that result container exists
      expect(wrapper.find('.error').exists()).toBe(true)
      expect(wrapper.find('.error').text()).toBe('An error occured')
    })
  })

  describe('when query succeeds', () => {
    it('shows no result message when no data', async () => {
      pokemonByNameRequestHandler.mockResolvedValueOnce({
        data: { pokemon: null },
      })

      const wrapper = shallowMount(Details, {
        props: {
          name: pokemon.name,
        },
      })

      expect(pokemonByNameRequestHandler).toHaveBeenCalledTimes(1)

      // wait for apollo results
      await flushPromises()

      // ensure that result container exists
      expect(wrapper.find('.no-result').exists()).toBe(true)
      expect(wrapper.find('.no-result').text()).toBe('No result :(')
    })

    it('favorite the pokemon', async () => {
      pokemonByNameRequestHandler.mockResolvedValueOnce({
        data: { pokemon },
      })
      favRequestHandler.mockResolvedValue({ data: { pokemon: { id: pokemon.id, isFavorite: true } } })
      unFavRequestHandler.mockResolvedValue({ data: { pokemon: { id: pokemon.id, isFavorite: false } } })

      const wrapper = shallowMount(Details, {
        props: {
          name: pokemon.name,
        },
      })

      // wait for apollo results
      await flushPromises()

      // trigger to favorite it
      await wrapper.find('favorite-stub').trigger('click')

      expect(favRequestHandler).toHaveBeenCalledTimes(1)
      expect(unFavRequestHandler).toHaveBeenCalledTimes(0)
    })

    it('unfavorite the pokemon', async () => {
      pokemonByNameRequestHandler.mockResolvedValueOnce({
        data: { pokemon: { ...pokemon, isFavorite: true } },
      })
      favRequestHandler.mockResolvedValue({ data: { pokemon: { id: pokemon.id, isFavorite: true } } })
      unFavRequestHandler.mockResolvedValue({ data: { pokemon: { id: pokemon.id, isFavorite: false } } })

      const wrapper = shallowMount(Details, {
        props: {
          name: pokemon.name,
        },
      })

      // wait for apollo results
      await flushPromises()

      // trigger to favorite it
      await wrapper.find('favorite-stub').trigger('click')

      expect(favRequestHandler).toHaveBeenCalledTimes(0)
      expect(unFavRequestHandler).toHaveBeenCalledTimes(1)
    })

    it('renders results correctly when data is present', async () => {
      pokemonByNameRequestHandler.mockResolvedValueOnce({
        data: { pokemon },
      })

      const wrapper = shallowMount(Details, {
        props: {
          name: pokemon.name,
        },
      })

      // wait for apollo results
      await flushPromises()

      expect(wrapper.element).toMatchSnapshot()
    })

    it('plays audio when clicked on the img', async () => {
      const playStub = jest.spyOn(window.HTMLMediaElement.prototype, 'play').mockResolvedValue()
      pokemonByNameRequestHandler.mockResolvedValueOnce({
        data: { pokemon },
      })

      const wrapper = shallowMount(Details, {
        props: {
          name: pokemon.name,
        },
      })

      // wait for apollo results
      await flushPromises()

      const imgEl = wrapper.findAll('img')

      // there are only two images once the data is loaded (for now)
      // one is the pokemon image and other is the speaker icon
      // both trigger audio
      expect(imgEl.length).toBe(2)

      for (let i = 0; i < imgEl.length; i++) {
        await imgEl[i].trigger('click')
        expect(playStub).toHaveBeenCalled()
      }

      expect(playStub).toHaveBeenCalledTimes(2)
      playStub.mockRestore()
    })
  })
})
