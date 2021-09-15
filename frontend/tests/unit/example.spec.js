import { shallowMount } from '@vue/test-utils'
import Card from '@/components/Card.vue'

describe('Card.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'User'
    const wrapper = shallowMount(Card, {
      propsData: { msg },
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
