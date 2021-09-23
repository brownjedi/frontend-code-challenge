import { shallowMount } from '@vue/test-utils'
import Tags from '@/components/Tags.vue'

describe('components/Tags.vue', () => {
  it('has the expected html structure', () => {
    const wrapper = shallowMount(Tags, {
      props: {
        tags: ['Fire', 'Ice'],
      },
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('ensure that the correct number of tags are rendering correctly', async () => {
    // inputs
    const tags = ['Fire', 'Ice', 'Grass']

    const wrapper = shallowMount(Tags, { props: { tags } })
    expect(wrapper.findAll<HTMLDivElement>('.tag').length).toBe(tags.length)
  })
})
