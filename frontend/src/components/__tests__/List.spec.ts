import { shallowMount } from '@vue/test-utils'
import { provideApolloClient } from '@vue/apollo-composable'
import { createMockClient, MockApolloClient } from 'mock-apollo-client'
import { FAVORITE_POKEMON_MUTATION, UNFAVORITE_POKEMON_MUTATION } from '@/graphql/graphql-queries'
import List from '@/components/List.vue'

const pokemon = {
  id: '001',
  image: 'http://localhost:4000/img/artwork/vector/large/bulbasaur.png',
  normalSprite: 'http://localhost:4000/img/sprites/black-white/normal/bulbasaur.png',
  animatedSprite: 'http://localhost:4000/img/sprites/black-white/anim/normal/bulbasaur.gif',
  name: 'Bulbasaur',
  classification: 'Seed Pokémon',
  types: ['Grass', 'Poison'],
  isFavorite: false,
}

const routerPushMock = jest.fn()

jest.mock('vue-router', () => ({
  useRouter: () => ({
    push: routerPushMock,
  }),
}))

describe('components/List.vue', () => {
  let favRequestHandler: jest.Mock
  let unFavRequestHandler: jest.Mock
  let mockClient: MockApolloClient

  beforeEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    mockClient = createMockClient()
    favRequestHandler = jest.fn()
    unFavRequestHandler = jest.fn()
    mockClient.setRequestHandler(FAVORITE_POKEMON_MUTATION, favRequestHandler)
    mockClient.setRequestHandler(UNFAVORITE_POKEMON_MUTATION, unFavRequestHandler)
    provideApolloClient(mockClient)
  })

  it('has the expected html structure', () => {
    const wrapper = shallowMount(List, {
      props: pokemon,
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('shows animated sprite on mouseenter', async () => {
    const wrapper = shallowMount(List, {
      props: pokemon,
    })

    // before mouseenter
    expect(wrapper.vm.currentSprite).toBe(pokemon.normalSprite)

    await wrapper.trigger('mouseenter')
    expect(wrapper.vm.currentSprite).toBe(pokemon.animatedSprite)

    await wrapper.trigger('mouseleave')
    expect(wrapper.vm.currentSprite).toBe(pokemon.normalSprite)
  })

  it('toggle favorite', async () => {
    favRequestHandler.mockResolvedValue({ data: { pokemon: { id: pokemon.id, isFavorite: true } } })
    unFavRequestHandler.mockResolvedValue({ data: { pokemon: { id: pokemon.id, isFavorite: false } } })

    const wrapper = shallowMount(List, {
      props: pokemon,
    })

    await wrapper.find('favorite-stub').trigger('click')

    expect(favRequestHandler).toHaveBeenCalledTimes(1)
    expect(unFavRequestHandler).toHaveBeenCalledTimes(0)

    // simulate prop updates
    await wrapper.setProps({
      ...pokemon,
      isFavorite: true,
    })

    await wrapper.find('favorite-stub').trigger('click')

    expect(favRequestHandler).toHaveBeenCalledTimes(1)
    expect(unFavRequestHandler).toHaveBeenCalledTimes(1)
  })

  it('navigates to pokemon info on click', async () => {
    const wrapper = shallowMount(List, {
      props: pokemon,
    })

    await wrapper.trigger('click')

    expect(routerPushMock).toHaveBeenCalledTimes(1)
    expect(routerPushMock).toHaveBeenCalledWith(`/${pokemon.name.toLowerCase()}`)
  })
})
