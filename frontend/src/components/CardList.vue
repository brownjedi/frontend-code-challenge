<template>
  <div class="apollo-example">
    <!-- Loading -->
    <div v-if="loading" class="loading apollo">Loading...</div>

    <!-- Error -->
    <div v-else-if="error" class="error apollo">An error occured</div>

    <!-- Result -->
    <div v-else-if="pokemons" class="result apollo">
      <Card
        v-for="pokemon in pokemons"
        :id="pokemon.id"
        :image="pokemon.image"
        :normalSprite="pokemon.sprites.normal"
        :animatedSprite="pokemon.sprites.animated"
        :name="pokemon.name"
        :classification="pokemon.classification"
        :types="pokemon.types"
        :key="pokemon.id"
      />
    </div>

    <!-- No result -->
    <div v-else class="no-result apollo">No result :(</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import Card from './Card.vue'
import { PokedexActions } from '@/store/modules/pokedex/actions'
import { useStore } from '@/store'

export default defineComponent({
  components: {
    Card,
  },
  setup() {
    const store = useStore()

    store.dispatch(PokedexActions.FETCH_POKEMONS)

    return {
      pokemons: computed(() => store.state.pokedex.pokemons.data),
      loading: computed(() => store.state.pokedex.pokemons.status.loading),
      error: computed(() => store.state.pokedex.pokemons.status.error),
    }
  },
})
</script>

<style scoped>
.apollo {
  padding: 12px;
}

.error {
  color: red;
}

.result {
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
</style>
