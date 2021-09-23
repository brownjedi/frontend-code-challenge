<template>
  <div :class="styles.container">
    <Search :class="styles.search" :initialValue="searchValue" @onSearch="onSearch" />
    <ToggleLayout @click="onLayoutClick" :isList="isListLayout" />
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { PokedexMutations } from '@/store/modules/pokedex/mutations'
import { computed, defineComponent, useCssModule } from 'vue'
import Search from './Search.vue'
import ToggleLayout from './ToggleLayout.vue'

export default defineComponent({
  components: { Search, ToggleLayout },
  setup() {
    const styles = useCssModule()
    const store = useStore()

    const searchValue = computed(() => store.state.pokedex.query.search)
    const isListLayout = computed(() => store.state.pokedex.ui.listView)
    function onSearch(search: string) {
      store.commit(PokedexMutations.SET_SEARCH, { search })
    }

    function onLayoutClick() {
      store.commit(PokedexMutations.SET_VIEW, { listView: !isListLayout.value })
    }

    return { styles, onSearch, searchValue, onLayoutClick, isListLayout }
  },
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  margin-bottom: 3rem;
  align-items: center;
  gap: 1rem;
  max-width: 60rem;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.search {
  flex: 1 1 60rem;
}
</style>
