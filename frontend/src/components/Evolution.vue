<template>
  <div :class="styles.container">
    <div v-for="evolution in props.evolutions" :key="evolution.id">
      <EvolutionItem :evolution="evolution" />
    </div>
  </div>
</template>

<script lang="ts">
import { Evolution } from '@/types'
import { defineComponent, PropType, useCssModule } from 'vue'
import EvolutionItem from './EvolutionItem.vue'
export default defineComponent({
  components: { EvolutionItem },
  props: {
    evolutions: {
      type: Object as PropType<Evolution[]>,
    },
  },
  setup(props) {
    const styles = useCssModule()
    return { styles }
  },
})
</script>

<style lang="scss" module>
.container {
}
</style>
