<template>
  <div :class="styles.container">
    <transition name="fade">
      <!-- Loading -->
      <div v-if="loading" :class="styles.loading">
        <CardSkeleton v-for="index in 3" :key="index" />
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
import { computed, defineComponent, onUnmounted, reactive, ref, useCssModule } from 'vue'
import Card from './Card.vue'
import CardSkeleton from './CardSkeleton.vue'
import { usePokemonsQuery } from '@/composables/pokemonsQuery'
import { useIntersectionObserver } from '@vueuse/core'
import { useStore } from '@/store'

export default defineComponent({
  props: {
    showOnlyFavorites: {
      type: Boolean,
      default: undefined,
    },
  },
  components: {
    Card,
    CardSkeleton,
  },
  setup(props) {
    const styles = useCssModule()
    const store = useStore()
    const search = computed(() => store.state.pokedex.query.search)
    const type = computed(() => store.state.pokedex.query.filter.type)
    const query = reactive({ limit: 30, search, filter: { type, isFavorite: props.showOnlyFavorites } })
    const { pokemonList, loading, error, fetchMore } = usePokemonsQuery(query)
    const infiniteLoading = ref(null)

    const { stop } = useIntersectionObserver(infiniteLoading, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        fetchMore({
          variables: {
            query: {
              ...query,
              offset: pokemonList.value?.edges.length,
            },
          },
        })
      }
    })

    onUnmounted(() => stop())

    return {
      styles,
      pokemons: computed(() => pokemonList.value?.edges),
      loading,
      error,
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
  display: grid;
  grid-gap: 3rem;
  grid-template-columns: repeat(auto-fill, 18.75rem);
  justify-content: center;
}
</style>
