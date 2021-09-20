<template>
  <div :class="styles.container">
    <transition name="fade">
      <!-- Loading -->
      <div v-if="loading" :class="styles.loading">
        <CardSkeleton v-for="index in 12" :key="index" />
      </div>

      <!-- Error -->
      <div v-else-if="error" :class="styles.error">An error occured</div>

      <!-- Result -->
      <div v-else-if="pokemons">
        <div :class="styles.result">
          <Card
            v-for="pokemon in pokemons"
            :id="pokemon.id"
            :image="pokemon.image"
            :normalSprite="pokemon.sprites.normal"
            :animatedSprite="pokemon.sprites.animated"
            :name="pokemon.name"
            :classification="pokemon.classification"
            :types="pokemon.types"
            :isFavorite="pokemon.isFavorite"
            :key="pokemon.id"
          />
        </div>
        <div ref="infiniteLoading"></div>
      </div>

      <!-- No result -->
      <div v-else :class="styles.noResult">No result :(</div>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useCssModule } from 'vue'
import Card from './Card.vue'
import CardSkeleton from './CardSkeleton.vue'
import { usePokemonsQuery } from '@/composables/pokemonsQuery'
import { useIntersectionObserver } from '@vueuse/core'

export default defineComponent({
  components: {
    Card,
    CardSkeleton,
  },
  setup() {
    const styles = useCssModule()
    const { pokemonList, loading, error, fetchMore } = usePokemonsQuery({ limit: 30 })
    const infiniteLoading = ref(null)

    const { stop } = useIntersectionObserver(infiniteLoading, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        loadMore()
      }
    })

    function loadMore() {
      fetchMore({
        variables: {
          query: {
            offset: pokemonList.value?.edges.length,
          },
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult || fetchMoreResult.pokemons.edges.length === 0) {
            stop()
            return prevResult
          }

          return {
            pokemons: {
              ...prevResult.pokemons,
              edges: [...prevResult.pokemons.edges, ...fetchMoreResult.pokemons.edges],
            },
          }
        },
      })
    }

    return {
      styles,
      pokemons: computed(() => pokemonList.value?.edges),
      loading,
      error,
      loadMore,
      infiniteLoading,
    }
  },
})
</script>

<style lang="scss" module>
.error {
  color: red;
}

.result,
.loading {
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
</style>
