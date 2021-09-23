import { shallowMount } from '@vue/test-utils'
import Skeleton from '@/components/Skeleton.vue'

describe('components/Skeleton.vue', () => {
  it('has the expected html structure', () => {
    const wrapper = shallowMount(Skeleton)
    expect(wrapper.element).toMatchSnapshot()
  })
})
