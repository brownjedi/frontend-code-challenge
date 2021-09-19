<template>
  <div :class="styles.container">
    <h1>What Pokémon are you looking for?</h1>
    <CardList />
  </div>
</template>

<script lang="ts">
import { defineComponent, useCssModule } from 'vue'
import CardList from '@/components/CardList.vue'

export default defineComponent({
  components: {
    CardList,
  },
  setup() {
    const styles = useCssModule()
    return { styles }
  },
})
</script>

<style lang="scss" module>
.container {
  max-width: 160rem;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
