import { shallowMount } from '@vue/test-utils'
import CardSkeleton from '@/components/CardSkeleton.vue'

describe('components/CardSkeleton.vue', () => {
  it('has the expected html structure', () => {
    const wrapper = shallowMount(CardSkeleton)
    expect(wrapper.element).toMatchSnapshot()
  })
})
