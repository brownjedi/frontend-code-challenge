<template>
  <div :class="styles.container">
    <transition name="fade">
      <!-- Loading -->
      <div v-if="loading" :class="styles.loading">
        <img src="/img/loading.gif" alt="loading" />
      </div>

      <!-- Error -->
      <div v-else-if="error" :class="styles.error">An error occured</div>

      <!-- Result -->
      <div v-else-if="pokemon" :class="styles.result" :key="pokemon.id">
        <div :class="styles.left">
          <div :class="[styles.img, styles.innerContainer]">
            <img :src="pokemon.image" :alt="pokemon.name" @click="playAudio" />
          </div>
        </div>
        <div :class="styles.right">
          <div :class="[styles.info, styles.innerContainer]">
            <div :class="styles.idNameAudioContainer">
              <div :class="styles.nameAudioContainer">
                <div :class="styles.name">{{ pokemon.name }}</div>
                <div :class="styles.audio">
                  <img src="/img/document--audio.svg" alt="pokemon audio" @click="playAudio" />
                </div>
              </div>
              <div :class="styles.id">#{{ pokemon.id }}</div>
            </div>
            <div :class="styles.classification">{{ pokemon.classification }}</div>
            <p>{{ pokemon.isFavorite }}</p>
            <p>{{ pokemon.maxCP }}</p>
            <p>{{ pokemon.maxHP }}</p>
            <p>{{ pokemon.fleeRate }}</p>
            <div :class="styles.tagsContainer">
              <div :class="styles.label">Resistances</div>
              <Tags :tags="pokemon.resistant" :class="styles.tags" />
            </div>
            <div :class="styles.tagsContainer">
              <div :class="styles.label">Types</div>
              <Tags :tags="pokemon.types" :class="styles.tags" />
            </div>
            <div :class="styles.tagsContainer">
              <div :class="styles.label">Weaknesses</div>

              <Tags :tags="pokemon.weaknesses" :class="styles.tags" />
            </div>
            <Favorite :class="styles.favorite" :large="true" :isFavorite="pokemon.isFavorite" @click="toggleFavorite" />
            <audio ref="audioRef">
              <source :src="pokemon.sound" type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      </div>
      <!-- No result -->
      <div v-else :class="styles.noResult">No result :(</div>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useCssModule } from 'vue'
import Tags from './Tags.vue'
import Favorite from './Favorite.vue'
import { usePokemonByNameQuery } from '@/composables/pokemonByNameQuery'
import { FAVORITE_POKEMON_MUTATION, UNFAVORITE_POKEMON_MUTATION } from '@/graphql/graphql-queries'
import { useMutation } from '@vue/apollo-composable'

export default defineComponent({
  components: {
    Tags,
    Favorite,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const styles = useCssModule()
    const audioRef = ref(null)
    const name = computed(() => props.name.toLowerCase())
    const { pokemon, loading, error } = usePokemonByNameQuery(name.value)
    const { mutate: favoritePokemon } = useMutation(FAVORITE_POKEMON_MUTATION)
    const { mutate: unFavoritePokemon } = useMutation(UNFAVORITE_POKEMON_MUTATION)

    function playAudio() {
      const el = audioRef.value as unknown as HTMLAudioElement
      el.play()
    }

    function toggleFavorite() {
      if (pokemon.value) {
        pokemon.value.isFavorite
          ? unFavoritePokemon({ id: pokemon.value.id })
          : favoritePokemon({ id: pokemon.value.id })
      }
    }

    const backgroundColor = computed(() => pokemon.value?.rgbaster?.backgroundColor || 'inherit')
    const textColor = computed(() => pokemon.value?.rgbaster?.textColor || 'inherit')

    return { styles, pokemon, loading, error, backgroundColor, textColor, audioRef, playAudio, toggleFavorite }
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
    cursor: pointer;
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

  .tags-container {
    align-self: flex-start;
    padding-top: 2rem;

    .tags {
      position: relative;
      padding-top: 1rem;
    }

    .label {
      font-weight: 500;
    }
  }

  .id-name-audio-container {
    align-self: stretch;
    display: flex;
    justify-content: space-between;
    font-size: 3rem;
  }

  .name-audio-container {
    display: flex;
  }

  .id {
    align-self: flex-end;
    color: var(--number-title-color);
    font-weight: 400;
  }

  .name {
    font-weight: 400;
    margin-right: 0.25rem;
  }

  .audio {
    cursor: pointer;
    padding-top: 0.125rem;
    img {
      width: 2rem;
      height: 2rem;
    }
  }

  .classification {
    padding-top: 0.25rem;
    align-self: flex-start;
    font-weight: 300;
  }

  .favorite {
    margin-top: 3rem;
    align-self: center;
  }
}

.error {
  color: red;
}
</style>
