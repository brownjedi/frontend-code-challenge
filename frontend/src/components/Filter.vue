<template>
  <div :class="styles.container">
    <transition name="fade">
      <!-- Loading -->
      <div v-if="loading" :class="styles.loading">
        <FilterButtonSkeleton v-for="index in 18" :key="index" :class="styles.button" />
      </div>

      <!-- Error -->
      <div v-else-if="error" :class="styles.error">An error occured</div>

      <!-- Result -->
      <div v-else-if="types" :class="styles.result">
        <FilterButton
          type="button"
          :class="styles.button"
          @click="(val, clr) => onClick('', clr)"
          :active="selectedType === ''"
          text="All"
        />
        <FilterButton
          type="button"
          :class="styles.button"
          @click="(val, clr) => onClick(val, clr)"
          :active="selectedType === type"
          v-for="type in types"
          :key="type"
          :text="type"
        />
      </div>

      <!-- No result -->
      <div v-else :class="styles['no-result']">No result :(</div>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useCssModule } from 'vue'
import { usePokemonTypesQuery } from '@/composables/pokemonsTypesQuery'
import FilterButton from './FilterButton.vue'
import FilterButtonSkeleton from './FilterButtonSkeleton.vue'
import { useStore } from '@/store'
import { PokedexMutations } from '@/store/modules/pokedex/mutations'

export default defineComponent({
  components: { FilterButton, FilterButtonSkeleton },
  setup() {
    const styles = useCssModule()
    const store = useStore()
    const selectedType = computed(() => store.state.pokedex.query.filter.type)
    const { types, loading, error } = usePokemonTypesQuery()

    function onClick(type: string, color: string) {
      store.commit(PokedexMutations.SET_TYPE, { type })
      store.commit(PokedexMutations.SET_COLOR, { color })
    }

    return { styles, types, loading, error, selectedType, onClick }
  },
})
</script>

<style lang="scss" module>
.container {
  height: 100vh;
  box-shadow: 0 0 40px var(--box-shadow-color);
  position: sticky;
  top: 0;
  flex: 0 0 auto;
  padding: 0 0.625rem;
  overflow: auto;
}

.loading,
.result,
.error,
.no-result {
  display: flex;
  flex-direction: column;
}

.button {
  flex: 0 0 auto;
  width: 6.75rem;
}

.button + .button {
  margin-top: 0.625rem;
}

.button:first-child {
  margin-top: 0.625rem;
}

.button:last-child {
  margin-bottom: 0.625rem;
}
</style>
