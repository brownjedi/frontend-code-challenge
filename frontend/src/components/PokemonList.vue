<template>
  <div :class="styles.container">
    <transition name="fade">
      <!-- Loading -->
      <!-- disable this as it's causing weird flash of loading because of how fast -->
      <!-- data is showing up -->
      <div v-show="false" v-if="loading">
        <div v-if="listView" :class="[styles.loading, styles.list]">
          <ListSkeleton v-for="index in 3" :key="index" />
        </div>
        <div v-else :class="styles.loading">
          <CardSkeleton v-for="index in 3" :key="index" />
        </div>
      </div>

      <!-- Error -->
      <div v-else-if="error" :class="styles.error">An error occured</div>

      <!-- Result -->
      <div v-else-if="pokemons">
        <div v-if="listView" :class="[styles.result, styles.list]">
          <List
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
        <div v-else :class="styles.result">
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
        <div ref="infiniteLoading" data-cy="infinite-loading"></div>
      </div>

      <!-- No result -->
      <div v-else :class="styles['no-result']">No result :(</div>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onUnmounted, reactive, ref, useCssModule } from 'vue'
import Card from './Card.vue'
import CardSkeleton from './CardSkeleton.vue'
import List from './List.vue'
import ListSkeleton from './ListSkeleton.vue'
import { usePokemonsQuery } from '@/composables/pokemonsQuery'
import { useIntersectionObserver } from '@vueuse/core'
import { useStore } from '@/store'

export default defineComponent({
  props: {
    showOnlyFavorites: {
      type: Boolean,
      default: undefined,
    },
    listView: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Card,
    List,
    CardSkeleton,
    ListSkeleton,
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
.container {
  flex: 1 1 auto;
  display: flex;
  & > * {
    flex: 1 1 auto;
  }
}

.error {
  color: red;
}

.no-result {
  display: flex;
  justify-content: center;
  align-items: center;
}

.result,
.loading {
  display: grid;
  gap: 3rem;
  grid-template-columns: repeat(auto-fill, 18.75rem);
  justify-content: center;
}

.loading.list,
.result.list {
  grid-template-columns: unset;
  justify-content: stretch;
  gap: 1rem;
}
</style>
