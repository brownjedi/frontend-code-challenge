import { shallowMount } from '@vue/test-utils'
import Pokemon from '@/views/Pokemon.vue'

const routeMock = jest.fn()
jest.mock('vue-router', () => ({
  useRoute: () => routeMock(),
}))

describe('views/Pokemon.vue', () => {
  beforeEach(() => jest.resetAllMocks())

  it('has the expected html structure', () => {
    routeMock.mockImplementationOnce(() => ({
      params: {
        name: 'Bulbasaur',
      },
    }))

    const wrapper = shallowMount(Pokemon)
    expect(wrapper.element).toMatchSnapshot()
  })
})
