<template>
  <div :class="styles.container"></div>
</template>

<script lang="ts">
import { Evolution } from '@/types'
import { defineComponent, PropType, useCssModule } from 'vue'
export default defineComponent({
  props: {
    evolution: {
      type: Object as PropType<Evolution>,
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
