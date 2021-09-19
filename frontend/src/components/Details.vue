<template>
  <div :class="styles.container">
    <!-- Loading -->
    <div v-if="loading" :class="styles.loading">Loading...</div>

    <!-- Error -->
    <div v-else-if="error" :class="styles.error">An error occured</div>

    <!-- Result -->
    <div v-else-if="pokemon" :class="styles.result" :key="pokemon.id">
      <div :class="styles.left">
        <div :class="[styles.img, styles.innerContainer]">
          <img :src="pokemon.image" :alt="pokemon.name" />
        </div>
      </div>
      <div :class="styles.right">
        <div :class="[styles.info, styles.innerContainer]">
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
    </div>
    <!-- No result -->
    <div v-else :class="styles.noResult">No result :(</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useCssModule } from 'vue'
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
    const styles = useCssModule()
    console.log(styles)
    const store = useStore()
    store.dispatch(PokedexActions.FETCH_POKEMON_BY_NAME, props.name)

    const backgroundColor = computed(() => store.getters.getRGBasterInfo(props.name)?.backgroundColor || 'inherit')
    const textColor = computed(() => store.getters.getRGBasterInfo(props.name)?.textColor || 'inherit')
    const pokemon = computed(() => store.getters.getPokemon)
    const loading = computed(() => store.state.pokedex.pokemon.status.loading)
    const error = computed(() => store.state.pokedex.pokemon.status.error)

    return { styles, pokemon, loading, error, backgroundColor, textColor }
  },
})
</script>

<style lang="scss" module>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.result {
  flex: 1;
  display: flex;
  align-self: stretch;

  .inner-container {
    max-width: 80rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 3rem;
  }
}

.left {
  transition: background-color 0.5s ease-in-out, color 0.5s ease-in-out;
  color: v-bind(textColor);
  background-color: v-bind(backgroundColor);
  flex: 1 1 50%;
  display: flex;
  justify-content: flex-end;

  img {
    display: block;
    width: 100%;
    height: auto;
    max-width: 40rem;
  }
}

.right {
  flex: 1 1 50%;
  display: flex;
  justify-content: flex-start;

  .info {
    flex-direction: column;
    justify-content: center;
  }
}

.error {
  color: red;
}
</style>
