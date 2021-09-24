import { shallowMount } from '@vue/test-utils'
import { Evolution as EvolutionType } from '@/types'
import Evolutions from '@/components/Evolutions.vue'

describe('components/Evolutions.vue', () => {
  it('has the expected html structure', () => {
    const evolutions: EvolutionType[] = [
      {
        id: '001',
        name: 'Bulbasaur',
      },
      {
        id: '002',
        name: 'Ivysaur',
      },
      {
        id: '003',
        name: 'Venusaur',
      },
    ]

    const wrapper = shallowMount(Evolutions, {
      props: {
        evolutions,
      },
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should have n - 1 arrows in between for n evolutions', () => {
    const evolutions: EvolutionType[] = [
      {
        id: '001',
        name: 'Bulbasaur',
      },
      {
        id: '002',
        name: 'Ivysaur',
      },
      {
        id: '003',
        name: 'Venusaur',
      },
    ]

    const wrapper = shallowMount(Evolutions, {
      props: {
        evolutions,
      },
    })

    expect(wrapper.findAll('.arrow').length).toBe(evolutions.length - 1)
  })
})
