<template>
  <div :class="styles.container">
    <Filter />
    <div :class="styles.main">
      <nav :class="styles.nav">
        <div :class="styles.navItem">
          <router-link to="/" :class="styles.navLink">All</router-link>
        </div>
        <div :class="styles.navItem">
          <router-link to="/favorites" :class="styles.navLink">Favorites</router-link>
        </div>
      </nav>
      <h1 :class="styles.title">What Pokémon are you looking for?</h1>
      <Controls />
      <CardList :class="styles.list" :showOnlyFavorites="showOnlyFavorites" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useCssModule } from 'vue'
import CardList from '@/components/CardList.vue'
import Controls from '@/components/Controls.vue'
import Filter from '@/components/Filter.vue'

export default defineComponent({
  props: {
    showOnlyFavorites: {
      type: Boolean,
      default: undefined,
    },
  },
  components: {
    CardList,
    Controls,
    Filter,
  },
  setup() {
    const styles = useCssModule()
    function onSearch(val: string) {
      console.log('hahahaha', val)
    }
    return { styles, onSearch }
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
    font-weight: 500;

    &:global(.router-link-active) {
      margin-bottom: -2px;
      border-bottom: 2px solid var(--fire-text-color);
    }
  }
}
</style>
