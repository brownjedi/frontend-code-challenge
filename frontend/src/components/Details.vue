<template>
  <div class="container">
    <!-- Loading -->
    <div v-if="loading" class="loading apollo">Loading...</div>

    <!-- Error -->
    <div v-else-if="error" class="error apollo">An error occured</div>

    <!-- Result -->
    <div v-else-if="pokemon" class="result apollo" :key="pokemon.id">
      <img :src="pokemon.image" :alt="pokemon.name" />
      <div>
        <p>{{ pokemon.id }}</p>
        <p>{{ pokemon.name }}</p>
        <p>{{ pokemon.number }}</p>
        <p>{{ pokemon.classification }}</p>
        <p>{{ pokemon.isFavorite }}</p>
        <p>{{ pokemon.maxCP }}</p>
        <p>{{ pokemon.maxHP }}</p>
        <p>{{ pokemon.fleeRate }}</p>
        <p>{{ pokemon.resistant }}</p>
        <audio controls>
          <source :src="pokemon.sound" type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
        <p>{{ pokemon.sound }}</p>
        <p>{{ pokemon.types }}</p>
        <p>{{ pokemon.weakness }}</p>
      </div>
    </div>

    <!-- No result -->
    <div v-else class="no-result apollo">No result :(</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue'
import { useGetDominantColors } from '@/composables/dominantColors'
import { PokedexActions } from '@/store/modules/pokedex/actions'
import { useStore } from '@/store'

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    // const { pokemon, loading, error, refetch } = usePokemonByNameQuery(props.name)
    const store = useStore()
    store.dispatch(PokedexActions.FETCH_POKEMON_BY_NAME, props.name)
    const { analyze, backgroundColor, textColor } = useGetDominantColors('#f2f2f2')

    const pokemon = computed(() => store.state.pokedex.pokemon.data)
    const loading = computed(() => store.state.pokedex.pokemon.status.loading)
    const error = computed(() => store.state.pokedex.pokemon.status.error)

    watch(pokemon, value => !!value && analyze(value.image))

    return { pokemon, loading, error, backgroundColor, textColor }
  },
})
</script>

<style scoped lang="scss">
.apollo {
  padding: 12px;
}

.container {
  transition: background-color 0.5s ease-in-out;
  background-color: v-bind(backgroundColor);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.result {
  color: v-bind(textColor);
  transition: color 0.5s ease-in-out;
  display: flex;
}

img {
  display: block;
  width: 100%;
  height: 100%;
  max-width: 25rem;
}

.error {
  color: red;
}
</style>
