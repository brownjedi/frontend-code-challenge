<template>
  <div :class="styles.container">
    <template :class="styles.evolution">
      <template v-for="(evolution, index) in evolutions" :key="evolution.id">
        <img :class="styles.arrow" src="/img/arrow--right.svg" alt="arrow" v-if="index !== 0" />
        <Evolution :id="evolution.id" :name="evolution.name" />
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { Evolution as EvolutionType } from '@/types'
import { defineComponent, PropType, useCssModule } from 'vue'
import Evolution from './Evolution.vue'

export default defineComponent({
  components: { Evolution },
  props: {
    evolutions: {
      type: Array as PropType<EvolutionType[]>,
    },
  },
  setup() {
    const styles = useCssModule()
    return { styles }
  },
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.evolution {
  display: flex;
  justify-content: center;
  align-items: baseline;

  .arrow {
    margin: 0 2rem;
    align-self: center;
  }

  @media (max-width: 64em) {
    flex-direction: column;
    align-items: center;
    .arrow {
      transform: rotate(90deg);
      margin: 2rem 0;
    }
  }
}
</style>
