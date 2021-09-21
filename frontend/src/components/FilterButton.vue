<template>
  <button type="button" :class="[styles.button, active && styles.active]" @click="$emit('click', text)">
    {{ text }}
  </button>
</template>

<script lang="ts">
import { computed, defineComponent, useCssModule } from 'vue'

export default defineComponent({
  emits: ['click'],
  props: {
    text: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
    },
  },
  setup(props) {
    const styles = useCssModule()
    const btnColor = computed(() => `var(--${props.text.toLowerCase()}-text-color)`)
    const btnColorHover = computed(() => `rgba(var(--${props.text.toLowerCase()}-text-color),  0.2)`)
    return { styles, btnColor, btnColorHover }
  },
})
</script>

<style lang="scss" module>
.button {
  text-transform: uppercase;
  padding: 0.625rem 1rem;
  border: none;
  cursor: pointer;
  color: v-bind(btnColor);

  &:hover {
    background-color: v-bind(btnColor);
    color: #fff;
  }

  &.active {
    background-color: v-bind(btnColor);
    color: #fff;
  }
}
</style>
