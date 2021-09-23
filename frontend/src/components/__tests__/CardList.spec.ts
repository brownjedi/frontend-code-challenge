import { flushPromises, shallowMount, mount } from '@vue/test-utils'
import CardList from '@/components/CardList.vue'
import { POKEMONS_QUERY } from '@/graphql/graphql-queries'
import { provideApolloClient } from '@vue/apollo-composable'
import { MockApolloClient, createMockClient } from 'mock-apollo-client'
import { store } from '@/store'
import { PokedexMutations } from '@/store/modules/pokedex/mutations'

describe('components/CardList.vue', () => {
  let requestHandler: jest.Mock
  let mockClient: MockApolloClient

  beforeEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    mockClient = createMockClient()
    requestHandler = jest.fn()
    mockClient.setRequestHandler(POKEMONS_QUERY, requestHandler)
    provideApolloClient(mockClient)
  })

  describe('when query loading', () => {
    it('has the expected html structure', () => {
      const wrapper = shallowMount(CardList)
      expect(wrapper.element).toMatchSnapshot()
    })

    it('sets the graphql query arguments to show only favorites', () => {
      shallowMount(CardList, { props: { showOnlyFavorites: true } })

      expect(requestHandler.mock.calls[0][0].query.filter.isFavorite).toBe(true)
    })

    it('sets the graphql query arguments to all', () => {
      shallowMount(CardList, { props: { showOnlyFavorites: undefined } })

      expect(requestHandler.mock.calls[0][0].query.filter.isFavorite).toBe(undefined)
    })

    it('sends the filter type properly to graphql when state changed', async () => {
      const wrapper = shallowMount(CardList, {
        global: {
          plugins: [store],
        },
      })

      expect(requestHandler).toHaveBeenCalled()
      expect(requestHandler.mock.calls[0][0].query.filter.type).toBe('')

      wrapper.vm.$store.commit(PokedexMutations.SET_TYPE, { type: 'Fire' })

      expect(requestHandler).toHaveBeenCalled()
      expect(requestHandler.mock.calls[0][0].query.filter.type).toBe('Fire')
    })

    it('sends the search properly to graphql when state changed', async () => {
      const wrapper = shallowMount(CardList, {
        global: {
          plugins: [store],
        },
      })

      expect(requestHandler.mock.calls[0][0].query.search).toBe('')

      wrapper.vm.$store.commit(PokedexMutations.SET_SEARCH, { search: 'Pikachu' })

      expect(requestHandler.mock.calls[0][0].query.search).toBe('Pikachu')
    })
  })

  describe('when query fails', () => {
    it('shows error message', async () => {
      requestHandler.mockRejectedValueOnce(new Error('Graphql query failed'))

      const wrapper = shallowMount(CardList)

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
        data: { pokemons: null },
      })

      const wrapper = shallowMount(CardList)

      expect(requestHandler).toHaveBeenCalledTimes(1)

      // wait for apollo results
      await flushPromises()

      // ensure that result container exists
      expect(wrapper.find('.no-result').exists()).toBe(true)
      expect(wrapper.find('.no-result').text()).toBe('No result :(')
    })
  })
})
