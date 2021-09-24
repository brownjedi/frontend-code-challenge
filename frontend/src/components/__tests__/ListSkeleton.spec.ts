import { shallowMount } from '@vue/test-utils'
import ListSkeleton from '@/components/ListSkeleton.vue'

describe('components/ListSkeleton.vue', () => {
  it('has the expected html structure', () => {
    const wrapper = shallowMount(ListSkeleton)
    expect(wrapper.element).toMatchSnapshot()
  })
})
