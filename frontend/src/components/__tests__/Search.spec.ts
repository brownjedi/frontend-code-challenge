import { shallowMount } from '@vue/test-utils'
import Search from '@/components/Search.vue'

describe('components/Search.vue', () => {
  it('has the expected html structure', () => {
    const wrapper = shallowMount(Search)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('the input element works correctly', async () => {
    const sampleText = 'pikachu'
    const wrapper = shallowMount(Search)
    const input = wrapper.find('input')
    await input.setValue(sampleText)

    expect(wrapper.vm.text).toBe(sampleText)
    expect(input.element.value).toBe(sampleText)
  })

  it('the initial value is set correctly', async () => {
    const sampleText = 'pikachu'
    const wrapper = shallowMount(Search, {
      props: {
        initialValue: sampleText,
      },
    })
    const input = wrapper.find('input')
    expect(input.element.value).toBe(sampleText)
  })

  it('the close element works correctly', async () => {
    const sampleText = 'pikachu'
    const wrapper = shallowMount(Search, {
      props: {
        initialValue: sampleText,
      },
    })

    expect(wrapper.find('input').element.value).toBe(sampleText)

    await wrapper.get('.close-icon').trigger('click')
    expect(wrapper.find('input').element.value).toBe('')
  })
})
