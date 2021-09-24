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
          <div :class="[styles.img, styles['inner-container']]">
            <img data-cy="img-play-audio" :src="pokemon.image" :alt="pokemon.name" @click="playAudio" />
          </div>
        </div>
        <div :class="styles.right">
          <div :class="[styles.info, styles['inner-container']]">
            <div :class="styles['id-name-audio-container']">
              <div :class="styles['name-audio-container']">
                <div :class="styles.name">{{ pokemon.name }}</div>
                <div :class="styles.audio">
                  <img data-cy="img-play-audio" src="/img/document--audio.svg" alt="pokemon audio" @click="playAudio" />
                </div>
              </div>
              <div :class="styles.id">#{{ pokemon.id }}</div>
            </div>
            <div :class="styles.classification">{{ pokemon.classification }}</div>
            <div :class="styles.stats">
              <div :class="styles.stat">
                <div :class="styles.label">Max CP</div>
                <p>{{ pokemon.maxCP }}</p>
              </div>
              <div :class="styles.stat">
                <div :class="styles.label">Max HP</div>
                <p>{{ pokemon.maxHP }}</p>
              </div>
              <div :class="styles.stat">
                <div :class="styles.label">Flee Rate</div>
                <p>{{ pokemon.fleeRate }}</p>
              </div>
              <div :class="styles.stat">
                <div :class="styles.label">Height</div>
                <p>{{ pokemon.height.minimum }} - {{ pokemon.height.maximum }}</p>
              </div>
              <div :class="styles.stat">
                <div :class="styles.label">Weight</div>
                <p>{{ pokemon.weight.minimum }} - {{ pokemon.weight.maximum }}</p>
              </div>
            </div>
            <hr :class="styles.hr" />
            <div :class="styles.attacks">
              <div :class="styles.special">
                <div :class="styles.label">Special Attacks</div>
                <div :class="styles.attack" :key="attack.name" v-for="attack in pokemon.attacks.special">
                  <img :src="`/img/types/${attack.type.toLowerCase()}.png`" :alt="attack.type" />
                  <p>{{ attack.name }}</p>
                </div>
              </div>
              <div :class="styles.fast">
                <div :class="styles.label">Fast Attacks</div>
                <div :class="styles.attack" :key="attack.name" v-for="attack in pokemon.attacks.fast">
                  <img :src="`/img/types/${attack.type.toLowerCase()}.png`" :alt="attack.type" />
                  <p>{{ attack.name }}</p>
                </div>
              </div>
            </div>
            <hr :class="styles.hr" />
            <div :class="styles['tags-container']">
              <div :class="styles.label">Types</div>
              <Tags :tags="pokemon.types" :class="styles.tags" />
            </div>
            <div :class="styles['tags-container']">
              <div :class="styles.label">Resistances</div>
              <Tags :tags="pokemon.resistant" :class="styles.tags" />
            </div>
            <div :class="styles['tags-container']">
              <div :class="styles.label">Weaknesses</div>
              <Tags :tags="pokemon.weaknesses" :class="styles.tags" />
            </div>
            <hr v-if="evolutions.length > 0" :class="styles.hr" />
            <div v-if="evolutions.length > 0" :class="styles.evolutions">
              <div :class="styles.label">Evolutions</div>
              <Evolutions :evolutions="evolutions" />
            </div>
            <hr v-if="evolutions.length > 0" :class="styles.hr" />
            <Favorite :class="styles.favorite" :large="true" :isFavorite="pokemon.isFavorite" @click="toggleFavorite" />
            <audio ref="audioRef">
              <source :src="pokemon.sound" type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      </div>
      <!-- No result -->
      <div v-else :class="styles['no-result']">No result :(</div>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useCssModule } from 'vue'
import Tags from './Tags.vue'
import Favorite from './Favorite.vue'
import { usePokemonByNameQuery } from '@/composables/pokemonByNameQuery'
import { useUnFavoritePokemonMutation } from '@/composables/unFavoritePokemonMutation'
import { useFavoritePokemonMutation } from '@/composables/favoritePokemonMutation'
import Evolutions from './Evolutions.vue'

export default defineComponent({
  components: {
    Tags,
    Favorite,
    Evolutions,
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
    const { mutate: favoritePokemon } = useFavoritePokemonMutation()
    const { mutate: unFavoritePokemon } = useUnFavoritePokemonMutation()
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

    const evolutions = computed(() => {
      if (!pokemon.value?.evolutions || pokemon.value.evolutions.length === 0) {
        return []
      }
      return [...pokemon.value?.evolutions, { id: pokemon.value?.id, name: pokemon.value?.name }].sort((a, b) => {
        if (a.id > b.id) return 1
        else if (a.id < b.id) return -1
        else return 0
      })
    })
    const backgroundColor = computed(() => pokemon.value?.rgbaster?.backgroundColor || 'inherit')
    const textColor = computed(() => pokemon.value?.rgbaster?.textColor || 'inherit')

    return {
      styles,
      pokemon,
      loading,
      error,
      backgroundColor,
      textColor,
      audioRef,
      playAudio,
      toggleFavorite,
      evolutions,
    }
  },
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error,
.no-result {
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

  @media (max-width: $break-768) {
    flex-direction: column;
  }
}

.left {
  transition: background-color 0.5s ease-in-out, color 0.5s ease-in-out;
  color: v-bind(textColor);
  background-color: v-bind(backgroundColor);
  flex: 1 1 50%;
  display: flex;
  justify-content: flex-end;
  position: sticky;
  top: 0;
  height: 100vh;

  img {
    display: block;
    width: 100%;
    height: auto;
    max-width: 40rem;
    cursor: pointer;
  }

  @media (max-width: $break-768) {
    height: auto;
    position: relative;
    border-bottom-left-radius: 50% 15%;
    border-bottom-right-radius: 50% 15%;
    img {
      max-width: 20rem;
    }
  }
}

.right {
  flex: 1 1 50%;
  display: flex;
  justify-content: flex-start;

  .info {
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
  }

  .tags-container {
    align-self: stretch;

    .tags {
      position: relative;
      padding-top: 1rem;
    }
  }

  .tags-container + .tags-container {
    padding-top: 2rem;
  }

  .label {
    font-weight: 500;
  }

  .id-name-audio-container {
    align-self: stretch;
    display: flex;
    justify-content: space-between;
    font-size: 3rem;

    @media (max-width: $break-1024) {
      flex-direction: column-reverse;
    }

    @media (max-width: $break-768) {
      flex-direction: row;
    }

    @media (max-width: $break-480) {
      flex-direction: column-reverse;
    }
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

.stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding-top: 2rem;
  border-radius: 1.5rem;
  margin-top: 2rem;

  .stat {
    .label {
      font-weight: 500;
    }

    p {
      background-color: #f3f5fa;
      padding: 1rem;
      border-radius: 25px;
      text-align: center;
    }
  }
}

.hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 2px solid #f3f5fa;
  margin: 2rem 0;
  padding: 0;
}

.attacks {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  .label {
    margin-bottom: 1rem;
  }

  .attack {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;

    img {
      width: 25px;
      height: 25px;
    }

    p {
      margin: 0;
    }
  }
}

.evolutions {
  .label {
    margin-bottom: 1rem;
  }
}

.error {
  color: red;
}
</style>
