<template>
  <div :class="styles['favorite-container']">
    <div
      :class="[
        isFavorite ? styles.favorite : styles['not-favorite'],
        large ? styles.large : styles.small,
        animated && styles.gelatine,
      ]"
      @click.stop="handleClick"
      @animationend="animated = false"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useCssModule } from 'vue'

export default defineComponent({
  props: {
    isFavorite: {
      type: Boolean,
      required: true,
    },
    large: {
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
.favorite-container {
  align-self: flex-end;
  display: flex;
  align-items: flex-end;
  cursor: pointer;

  & > * {
    flex: 1;
  }

  .small {
    width: 1.75rem;
    height: 1.75rem;
  }

  .large {
    width: 2.75rem;
    height: 2.75rem;
  }

  .favorite {
    background: url('/img/pokeball_color.svg') no-repeat;
  }

  .not-favorite {
    background: url('/img/pokeball_bw.svg') no-repeat;
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
