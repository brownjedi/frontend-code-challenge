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
        <FilterButton type="button" :class="styles.button" text="All">All</FilterButton>
        <FilterButton type="button" :class="styles.button" v-for="type in types" :key="type" :text="type" />
      </div>

      <!-- No result -->
      <div v-else :class="styles.noResult">No result :(</div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, useCssModule } from 'vue'
import { usePokemonTypesQuery } from '@/composables/pokemonsTypesQuery'
import FilterButton from './FilterButton.vue'
import FilterButtonSkeleton from './FilterButtonSkeleton.vue'

export default defineComponent({
  components: { FilterButton, FilterButtonSkeleton },
  setup() {
    const styles = useCssModule()
    const { types, loading, error } = usePokemonTypesQuery()

    return { styles, types, loading, error }
  },
})
</script>

<style lang="scss" module>
.container {
  height: 100vh;
  box-shadow: 0 0 40px #e9e8e7;
  position: sticky;
  top: 0;
  flex: 0 0 auto;
  padding: 0 0.625rem;
  overflow: auto;
}

.loading,
.result {
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
