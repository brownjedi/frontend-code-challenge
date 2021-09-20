<template>
  <div :class="styles.button">
    <skeleton />
  </div>
</template>

<script lang="ts">
import { defineComponent, useCssModule } from 'vue'
import Skeleton from './Skeleton.vue'

export default defineComponent({
  components: { Skeleton },
  setup() {
    const styles = useCssModule()
    return { styles }
  },
})
</script>

<style lang="scss" module>
.button {
  border: none;
  height: 2.375rem;
}
</style>
