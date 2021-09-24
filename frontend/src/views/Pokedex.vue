<template>
  <div :class="styles.container">
    <Filter />
    <main :class="styles.main">
      <nav :class="styles.nav">
        <div :class="styles['nav-item']">
          <router-link to="/" :class="styles['nav-link']">All</router-link>
        </div>
        <div :class="styles['nav-item']">
          <router-link to="/favorites" :class="styles['nav-link']">Favorites</router-link>
        </div>
      </nav>
      <h1 :key="showOnlyFavorites" :class="styles.title">
        {{ showOnlyFavorites ? 'Say hi to your favorite Pokémon!' : 'What Pokémon are you looking for?' }}
      </h1>
      <Controls />
      <PokemonList :class="styles.list" :listView="listView" :showOnlyFavorites="showOnlyFavorites" />
    </main>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useCssModule } from 'vue'
import PokemonList from '@/components/PokemonList.vue'
import Controls from '@/components/Controls.vue'
import Filter from '@/components/Filter.vue'
import { useStore } from '@/store'

export default defineComponent({
  props: {
    showOnlyFavorites: {
      type: Boolean,
      default: undefined,
    },
  },
  components: {
    PokemonList,
    Controls,
    Filter,
  },
  setup() {
    const styles = useCssModule()
    const store = useStore()

    const color = computed(() => store.state.pokedex.ui.color)
    const listView = computed(() => store.state.pokedex.ui.listView)

    return { styles, color, listView }
  },
})
</script>

<style lang="scss" module>
.container {
  position: relative;
  display: flex;
  flex-direction: row;
}

.main {
  padding: 2rem;
  overflow: auto;
  max-width: 150rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.title {
  line-height: 1.25;
  align-self: center;
  transition: color 0.5s ease-in-out;
}

.list {
}

.nav {
  align-self: flex-end;
  display: inline-block;

  .nav-item {
    display: inline-block;
    line-height: 2rem;
    margin-left: 1rem;
  }

  .nav-link {
    text-decoration: none;
    color: var(--main-text-color);
    color: v-bind(color);
    font-weight: 500;
    transition: border-bottom-color 0.5s ease-in-out, color 0.5s ease-in-out;

    &:global(.router-link-active) {
      margin-bottom: -2px;
      border-bottom: 2px solid var(--main-text-color);
      /* border-bottom-color: v-bind(color); */
    }
  }
}
</style>
