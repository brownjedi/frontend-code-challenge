import { shallowMount } from '@vue/test-utils'
import FilterButton from '@/components/FilterButton.vue'

describe('components/FilterButton.vue', () => {
  it('has the expected html structure', async () => {
    const wrapper = shallowMount(FilterButton, { props: { text: 'Fire' } })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('has active class when active prop is set to true', async () => {
    const wrapper = shallowMount(FilterButton, { props: { text: 'Fire' } })

    expect(wrapper.find('button').classes()).not.toContain('active')

    await wrapper.setProps({ text: 'Fire', active: true })

    expect(wrapper.find('button').classes()).toContain('active')
  })

  it('emits text and color when clicked', async () => {
    // inputs
    const text = 'Fire'
    const color = '#FF0000'

    // document setup
    document.body.innerHTML = `
      <div>
        <h1>Non Vue app</h1>
        <div id="app"></div>
      </div>
    `
    document.documentElement.style.setProperty(`--${text.toLowerCase()}-text-color`, color)

    const wrapper = shallowMount(FilterButton, { attachTo: '#app', props: { text } })

    await wrapper.find('button').trigger('click')

    const clickEventResponse = wrapper.emitted().click[0] as string[]
    expect(clickEventResponse[0]).toStrictEqual(text)
    expect(clickEventResponse[1]).toStrictEqual(color)

    wrapper.unmount()
  })
})
