import { shallowMount } from '@vue/test-utils'
import Pokedex from '@/views/Pokedex.vue'
import router from '@/router'

describe('views/Pokedex.vue', () => {
  it('has the expected html structure', () => {
    const wrapper = shallowMount(Pokedex, {
      global: {
        plugins: [router],
      },
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
