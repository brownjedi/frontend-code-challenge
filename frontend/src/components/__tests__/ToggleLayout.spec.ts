import { shallowMount } from '@vue/test-utils'
import ToggleLayout from '@/components/ToggleLayout.vue'

describe('components/ToggleSkeleton.vue', () => {
  it('has the expected html structure', () => {
    const wrapper = shallowMount(ToggleLayout)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('emits when clicked', async () => {
    const wrapper = shallowMount(ToggleLayout, {
      props: {
        isList: true,
      },
    })

    expect(wrapper.emitted().click).toBeUndefined()

    await wrapper.find('.inner').trigger('click')

    expect(wrapper.emitted().click.length).toEqual(1)
  })
})
