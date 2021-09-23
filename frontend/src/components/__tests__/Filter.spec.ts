import { mount, flushPromises } from '@vue/test-utils'
import { createMockClient, MockApolloClient } from 'mock-apollo-client'
import { provideApolloClient } from '@vue/apollo-composable'
import Filter from '@/components/Filter.vue'
import { POKEMON_TYPES_QUERY } from '@/graphql/graphql-queries'
import { store } from '@/store'

describe('components/Filter.vue', () => {
  let requestHandler: jest.Mock
  let mockClient: MockApolloClient

  beforeEach(() => {
    mockClient = createMockClient()
    requestHandler = jest.fn()
    mockClient.setRequestHandler(POKEMON_TYPES_QUERY, requestHandler)
    provideApolloClient(mockClient)
  })

  describe('when query loading', () => {
    it('has the expected html structure', async () => {
      const wrapper = mount(Filter)
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe('when query fails', () => {
    it('shows error message', async () => {
      requestHandler.mockRejectedValueOnce(new Error('Graphql query failed'))

      const wrapper = mount(Filter)

      expect(requestHandler).toHaveBeenCalledTimes(1)

      // wait for apollo results
      await flushPromises()

      // ensure that result container exists
      expect(wrapper.find('.error').exists()).toBe(true)
      expect(wrapper.find('.error').text()).toBe('An error occured')

      // ensure we have zero buttons when errors
      expect(wrapper.findAll('button').length).toBe(0)
    })
  })

  describe('when query succeeds', () => {
    it('shows no result message when no data', async () => {
      requestHandler.mockResolvedValueOnce({
        data: { pokemonTypes: null },
      })

      const wrapper = mount(Filter)

      expect(requestHandler).toHaveBeenCalledTimes(1)

      // wait for apollo results
      await flushPromises()

      // ensure that result container exists
      expect(wrapper.find('.no-result').exists()).toBe(true)
      expect(wrapper.find('.no-result').text()).toBe('No result :(')

      // ensure we have zero buttons when errors
      expect(wrapper.findAll('button').length).toBe(0)
    })

    it('renders results correctly when data is present', async () => {
      const mapping: Record<string, string> = { Fire: '#FF0000', Ice: '#0000FF', Grass: '#00FF00', Dragon: '$EDEDED' }
      const pokemonTypes = Object.keys(mapping)
      requestHandler.mockResolvedValueOnce({
        data: { pokemonTypes },
      })

      // document setup
      document.body.innerHTML = `
      <div>
        <h1>Non Vue app</h1>
        <div id="app"></div>
      </div>
    `
      document.documentElement.style.setProperty(`--main-text-color`, '#000000')
      Object.keys(mapping).forEach(x => {
        document.documentElement.style.setProperty(`--${x.toLowerCase()}-text-color`, mapping[x])
      })

      const wrapper = mount(Filter, { attachTo: '#app', global: { plugins: [store] } })

      expect(requestHandler).toHaveBeenCalledTimes(1)

      // wait for apollo results
      await flushPromises()

      // ensure that result container exists
      expect(wrapper.find('.result').exists()).toBe(true)

      const buttons = wrapper.findAll('button')

      // ensure we have (n + 1) buttons. The first button is All button
      expect(buttons.length).toBe(pokemonTypes.length + 1)

      // first button should be the All button and selected by default
      expect(buttons[0].classes()).toContain('active')
      expect(buttons[0].text()).toBe('All')
      await buttons[0].trigger('click')
      expect(store.state.pokedex.query.filter.type).toStrictEqual('')
      expect(store.state.pokedex.ui.color).toStrictEqual('#000000')

      // check the values of other buttons and the vuex store data
      for (let i = 0; i < pokemonTypes.length; i++) {
        expect(buttons[i + 1].text()).toBe(pokemonTypes[i])
        await buttons[i + 1].trigger('click')
        expect(store.state.pokedex.query.filter.type).toStrictEqual(pokemonTypes[i])
        expect(store.state.pokedex.ui.color).toStrictEqual(mapping[pokemonTypes[i]])
      }
    })
  })
})
