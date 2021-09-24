<template>
  <div
    :class="styles.container"
    @mouseenter="setAnimated(true)"
    @mouseleave="setAnimated(false)"
    @click="navigateToPokemon"
    data-cy="pokemon-card"
  >
    <div :class="styles.header">
      <div :class="styles.img">
        <img :src="currentSprite" :alt="name" />
      </div>
      <div :class="styles.id">#{{ id }}</div>
    </div>
    <div :class="styles.name" data-cy="pokemon-card-name">{{ name }}</div>
    <div :class="styles.classification">{{ classification }}</div>
    <Tags :tags="types" :class="styles.tags" />
    <Favorite :class="styles.favorite" :isFavorite="isFavorite" @click="toggleFavorite" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useCssModule } from 'vue'
import { useRouter } from 'vue-router'
import Tags from './Tags.vue'
import Favorite from './Favorite.vue'
import { useFavoritePokemonMutation } from '@/composables/favoritePokemonMutation'
import { useUnFavoritePokemonMutation } from '@/composables/unFavoritePokemonMutation'

export default defineComponent({
  components: {
    Tags,
    Favorite,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    normalSprite: {
      type: String,
      required: true,
    },
    animatedSprite: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    classification: {
      type: String,
      required: true,
    },
    types: {
      type: Array,
      required: true,
    },
    isFavorite: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const styles = useCssModule()
    const router = useRouter()
    const currentSprite = ref(props.normalSprite)
    const { mutate: favoritePokemon } = useFavoritePokemonMutation()
    const { mutate: unFavoritePokemon } = useUnFavoritePokemonMutation()

    function setAnimated(val: boolean) {
      currentSprite.value = val ? props.animatedSprite : props.normalSprite
    }
    function navigateToPokemon() {
      router.push(`/${props.name.toLowerCase()}`)
    }

    function toggleFavorite() {
      props.isFavorite ? unFavoritePokemon({ id: props.id }) : favoritePokemon({ id: props.id })
    }

    return { styles, currentSprite, setAnimated, navigateToPokemon, toggleFavorite }
  },
})
</script>

<style lang="scss" module>
.container {
  text-align: center;
  width: 18.75rem;
  height: 16rem;
  border-radius: 0.625rem;
  box-shadow: 10px 10px 60px var(--box-shadow-color);
  transition: transform 0.5s ease-in-out;

  &:hover {
    transform: scale(1.125);
    cursor: pointer;
  }

  display: flex;
  flex-direction: column;
}

.header {
  position: relative;
}

.id {
  color: var(--number-title-color);
  font-weight: 500;
  font-size: 6.25rem;
}

.img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 6rem;
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.name {
  font-size: 1.25rem;
  font-weight: 400;
}

.classification {
  font-size: 0.8125rem;
  font-weight: 300;
  padding-top: 0.3rem;
}

.tags {
  position: relative;
  padding-top: 1rem;
  align-self: center;
}

.favorite {
  flex: 1 1 auto;
  margin-right: 1rem;
  margin-bottom: 1rem;
  align-self: flex-end;
}
</style>
