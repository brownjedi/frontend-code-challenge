<template>
  <div :class="styles.container">
    <Search :class="styles.search" :initialValue="searchValue" @onSearch="onSearch" />
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { PokedexMutations } from '@/store/modules/pokedex/mutations'
import { computed, defineComponent, useCssModule } from 'vue'
import Search from './Search.vue'

export default defineComponent({
  components: { Search },
  setup() {
    const styles = useCssModule()
    const store = useStore()

    const searchValue = computed(() => store.state.pokedex.query.search)
    function onSearch(search: string) {
      store.commit(PokedexMutations.SET_SEARCH, { search })
    }

    return { styles, onSearch, searchValue }
  },
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  margin-bottom: 3rem;
}

.search {
  flex: 1 1 auto;
}
</style>
