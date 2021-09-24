import { shallowMount } from '@vue/test-utils'
import Pokedex from '@/views/Pokedex.vue'
import router from '@/router'

describe('views/Pokedex.vue', () => {
  it('has the expected html structure', async () => {
    router.push('/')

    // After this line, router is ready
    await router.isReady()

    const wrapper = shallowMount(Pokedex, {
      global: {
        plugins: [router],
      },
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
