<template>
  <div :class="styles.container">
    <Search />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useCssModule, watch } from 'vue'
import { usePokemonTypesQuery } from '@/composables/pokemonsTypesQuery'
import Search from './Search.vue'

export default defineComponent({
  components: { Search },
  setup() {
    const styles = useCssModule()
    const { types, loading, error } = usePokemonTypesQuery()
    const value = ref('')

    watch(value, value => console.log(value))

    return { styles, types, value, loading }
  },
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  margin-bottom: 3rem;
}
</style>
