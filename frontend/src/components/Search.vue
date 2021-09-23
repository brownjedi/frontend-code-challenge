<template>
  <div :class="styles.container">
    <img src="/img/search.svg" :class="styles['search-icon']" />
    <input
      type="text"
      ref="search"
      data-cy="pokemon-search"
      v-model="text"
      :class="styles.search"
      placeholder="Search Pokémons"
    />
    <img
      src="/img/close.svg"
      tabindex="0"
      :class="styles['close-icon']"
      @click="onClose"
      @keyup.enter="onClose"
      @keydown.space.prevent="onClose"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useCssModule, watch } from 'vue'
import { useDebounce } from '@vueuse/core'

export default defineComponent({
  props: {
    initialValue: {
      type: String,
    },
  },
  emits: ['onSearch'],
  setup(props, { emit }) {
    const search = ref(null)
    const text = ref(props.initialValue)
    const debounced = useDebounce(text, 600)
    const styles = useCssModule()

    function onClose() {
      text.value = ''
      const el = search.value as unknown as HTMLInputElement
      el.focus()
    }

    watch(debounced, value => emit('onSearch', value))

    return { styles, search, text, onClose }
  },
})
</script>

<style lang="scss" module>
.container {
  position: relative;
  display: flex;
  min-width: 18rem;
  height: 2rem;
  align-items: center;
  max-width: 60rem;
  margin: 0 auto;
}

.search {
  width: 100%;
  height: 100%;
  border-radius: 0.25rem;
  border: 2px solid var(--number-title-color);
  padding-left: 2rem;
  outline-color: var(--main-text-color);
}

.search-icon {
  width: 1.25rem;
  height: 1.25rem;
  display: block;
  position: absolute;
  left: 0.625rem;
}

.close-icon {
  width: 1.25rem;
  height: 1.25rem;
  display: block;
  position: absolute;
  right: 0.625rem;
  cursor: pointer;
  visibility: hidden;
}

.search:not(:placeholder-shown) + .close-icon {
  visibility: visible;
}
</style>
