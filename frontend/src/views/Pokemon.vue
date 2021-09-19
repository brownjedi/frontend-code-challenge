<template>
  <div :class="styles.container">
    <Details :name="name" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useCssModule, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Details from '@/components/Details.vue'

export default defineComponent({
  setup() {
    const styles = useCssModule()
    const router = useRouter()
    const route = useRoute()
    const name = ref(route.params.name as string)

    watch(
      () => route.params.name,
      (to, from) => {
        if (from !== to) {
          name.value = to as string
        }
      }
    )
    return {
      name,
      router,
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
