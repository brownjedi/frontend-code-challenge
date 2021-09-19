<template>
  <div class="details">
    <Details :name="name" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Details from '@/components/Details.vue'

export default defineComponent({
  setup() {
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
    }
  },
  components: {
    Details,
  },
})
</script>

<style lang="scss" scoped>
.details {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: stretch;
}
</style>
