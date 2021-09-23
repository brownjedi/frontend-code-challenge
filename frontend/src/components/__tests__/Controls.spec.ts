import { shallowMount } from '@vue/test-utils'
import Controls from '@/components/Controls.vue'
import { store } from '@/store'

describe('components/Controls.vue', () => {
  it('has the expected html structure', () => {
    const wrapper = shallowMount(Controls)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('updates the vuex store when search', async () => {
    const wrapper = shallowMount(Controls, {
      global: {
        plugins: [store],
      },
    })

    expect(store.state.pokedex.query.search).toBe('')

    const searchString = 'pikachu'
    await wrapper.vm.onSearch(searchString)

    expect(store.state.pokedex.query.search).toBe(searchString)
  })
})
