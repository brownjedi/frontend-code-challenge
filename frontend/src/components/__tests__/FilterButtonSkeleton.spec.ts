import { shallowMount } from '@vue/test-utils'
import FilterButtonSkeleton from '@/components/FilterButtonSkeleton.vue'

describe('components/FilterButtonSkeleton.vue', () => {
  it('has the expected html structure', () => {
    const wrapper = shallowMount(FilterButtonSkeleton)
    expect(wrapper.element).toMatchSnapshot()
  })
})
