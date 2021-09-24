import { flushPromises, shallowMount } from '@vue/test-utils'
import Evolution from '@/components/Evolution.vue'
import { createMockClient, MockApolloClient } from 'mock-apollo-client'
import { POKEMON_BY_NAME_QUERY } from '@/graphql/graphql-queries'
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

const routerPushMock = jest.fn()

jest.mock('vue-router', () => ({
  useRouter: () => ({
    push: routerPushMock,
  }),
}))

describe('components/Evolution.vue', () => {
  let requestHandler: jest.Mock
  let mockClient: MockApolloClient

  beforeEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    mockClient = createMockClient()
    requestHandler = jest.fn()
    mockClient.setRequestHandler(POKEMON_BY_NAME_QUERY, requestHandler)
    provideApolloClient(mockClient)
  })

  describe('when query loading', () => {
    it('has the expected html structure', () => {
      const wrapper = shallowMount(Evolution, {
        props: {
          id: pokemon.id,
          name: pokemon.name,
        },
      })
      expect(wrapper.element).toMatchSnapshot()
    })

    it('sends the pokemon name in the graphql query', () => {
      shallowMount(Evolution, {
        props: {
          id: pokemon.id,
          name: pokemon.name,
        },
      })

      expect(requestHandler).toHaveBeenCalledWith({ name: pokemon.name.toLowerCase() })
    })
  })

  describe('when query fails', () => {
    it('shows error message', async () => {
      requestHandler.mockRejectedValueOnce(new Error('Graphql query failed'))

      const wrapper = shallowMount(Evolution, {
        props: {
          id: pokemon.id,
          name: pokemon.name,
        },
      })

      expect(requestHandler).toHaveBeenCalledTimes(1)

      // wait for apollo results
      await flushPromises()

      // ensure that result container exists
      expect(wrapper.find('.error').exists()).toBe(true)
      expect(wrapper.find('.error').text()).toBe('An error occured')
    })
  })

  describe('when query succeeds', () => {
    it('shows no result message when no data', async () => {
      requestHandler.mockResolvedValueOnce({
        data: { pokemon: null },
      })

      const wrapper = shallowMount(Evolution, {
        props: {
          id: pokemon.id,
          name: pokemon.name,
        },
      })

      expect(requestHandler).toHaveBeenCalledTimes(1)

      // wait for apollo results
      await flushPromises()

      // ensure that result container exists
      expect(wrapper.find('.no-result').exists()).toBe(true)
      expect(wrapper.find('.no-result').text()).toBe('No result :(')
    })

    it('renders results correctly when data is present', async () => {
      requestHandler.mockResolvedValueOnce({
        data: { pokemon },
      })

      const wrapper = shallowMount(Evolution, {
        props: {
          id: pokemon.id,
          name: pokemon.name,
        },
      })

      // wait for apollo results
      await flushPromises()

      expect(wrapper.element).toMatchSnapshot()
    })

    it('navigates to pokemon info on click', async () => {
      requestHandler.mockResolvedValueOnce({
        data: { pokemon },
      })

      const wrapper = shallowMount(Evolution, {
        props: {
          id: pokemon.id,
          name: pokemon.name,
        },
      })

      // wait for apollo results
      await flushPromises()

      await wrapper.find('.result').trigger('click')

      expect(routerPushMock).toHaveBeenCalledTimes(1)
      expect(routerPushMock).toHaveBeenCalledWith(`/${pokemon.name.toLowerCase()}`)
    })
  })
})
