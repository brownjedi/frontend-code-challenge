<template>
  <div :class="styles.container">
    <Details :name="name" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useCssModule } from 'vue'
import { useRoute } from 'vue-router'
import Details from '@/components/Details.vue'

export default defineComponent({
  setup() {
    const styles = useCssModule()
    const route = useRoute()
    const name = ref(route.params.name as string)

    return {
      name,
      styles,
    }
  },
  components: {
    Details,
  },
})
</script>

<style lang="scss" module>
.container {
}
</style>
