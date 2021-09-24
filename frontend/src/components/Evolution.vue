<template>
  <div :class="styles.container">
    <transition name="fade">
      <!-- Loading -->
      <div v-if="loading" :class="styles.loading">
        <img src="/img/pokeball_bw.svg" alt="loading" />
      </div>

      <!-- Error -->
      <div v-else-if="error" :class="styles.error">An error occured</div>

      <!-- Result -->
      <div v-show="imgLoaded" v-else-if="pokemon" :class="styles.result" :key="pokemon.id" @click="navigateToPokemon">
        <img :src="pokemon.image" :alt="name" @load="onLoad" />
        <p :class="styles.id">#{{ pokemon.id }}</p>
        <p :class="styles.name">{{ pokemon.name }}</p>
      </div>
      <!-- No result -->
      <div v-else :class="styles['no-result']">No result :(</div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useCssModule, watch } from 'vue'
import { useRouter } from 'vue-router'
import { usePokemonByNameQuery } from '@/composables/pokemonByNameQuery'
export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const styles = useCssModule()
    const router = useRouter()
    const imgLoaded = ref(false)
    const { pokemon, loading, error } = usePokemonByNameQuery(props.name.toLowerCase())

    watch(loading, val => !!val && (imgLoaded.value = false))

    function onLoad() {
      imgLoaded.value = true
    }

    function navigateToPokemon() {
      router.push(`/${props.name.toLowerCase()}`)
    }
    return { styles, pokemon, loading, error, navigateToPokemon, onLoad, imgLoaded }
  },
})
</script>

<style lang="scss" module>
.container {
}

.loading,
.result {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    display: block;
    max-width: 8rem;
    height: auto;
    width: 100%;
  }

  p {
    margin: 0;
  }
}

.result {
  cursor: pointer;

  .id {
    margin-top: 1rem;
    margin-bottom: 0.35rem;
    font-weight: 500;
  }
}

.no-result {
  display: flex;
}

.error {
  color: red;
}
</style>
