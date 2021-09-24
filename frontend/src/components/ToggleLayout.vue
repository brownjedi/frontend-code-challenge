<template>
  <div :class="styles.container">
    <div
      :class="[isList ? styles.list : styles.card, animated && styles.gelatine, styles.inner]"
      @click.stop="handleClick"
      @animationend="animated = false"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useCssModule } from 'vue'

export default defineComponent({
  props: {
    isList: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['click'],
  setup(_, { emit }) {
    const styles = useCssModule()
    const animated = ref(false)

    function handleClick() {
      animated.value = true
      emit('click')
    }

    return { styles, handleClick, animated }
  },
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  align-items: flex-end;
  cursor: pointer;

  .inner {
    width: 1.5rem;
    height: 1.5rem;
    padding: 0.25rem;
  }

  & > * {
    flex: 1;
  }

  .list {
    background: url('/img/show-data--cards.svg') no-repeat;
  }

  .card {
    background: url('/img/thumbnail--2.svg') no-repeat;
  }

  .gelatine {
    animation: gelatine 0.5s;
  }

  @keyframes gelatine {
    from,
    to {
      transform: scale(1, 1);
    }
    25% {
      transform: scale(0.9, 1.1);
    }
    50% {
      transform: scale(1.1, 0.9);
    }
    75% {
      transform: scale(0.95, 1.05);
    }
  }
}
</style>
