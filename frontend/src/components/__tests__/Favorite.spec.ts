import { shallowMount } from '@vue/test-utils'
import Favorite from '@/components/Favorite.vue'

describe('components/Favorite.vue', () => {
  it('has the expected html structure', () => {
    const wrapper = shallowMount(Favorite, {
      props: {
        isFavorite: true,
      },
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('has correct class when setting isFavorite', async () => {
    const wrapper = shallowMount(Favorite, {
      props: {
        isFavorite: true,
      },
    })
    expect(wrapper.find('.favorite').exists()).toBe(true)
    expect(wrapper.find('.not-favorite').exists()).toBe(false)

    await wrapper.setProps({ isFavorite: false })
    expect(wrapper.find('.favorite').exists()).toBe(false)
    expect(wrapper.find('.not-favorite').exists()).toBe(true)
  })

  it('has correct class when setting large', async () => {
    const wrapper = shallowMount(Favorite, {
      props: {
        isFavorite: true,
        large: false,
      },
    })

    expect(wrapper.find('.large').exists()).toBe(false)
    expect(wrapper.find('.small').exists()).toBe(true)

    await wrapper.setProps({ isFavorite: true, large: true })

    expect(wrapper.find('.large').exists()).toBe(true)
    expect(wrapper.find('.small').exists()).toBe(false)
  })

  it('emits when clicked', async () => {
    const wrapper = shallowMount(Favorite, {
      props: {
        isFavorite: true,
      },
    })

    expect(wrapper.emitted().click).toBeUndefined()

    await wrapper.find('.favorite').trigger('click')

    expect(wrapper.emitted().click.length).toEqual(1)
  })
})
