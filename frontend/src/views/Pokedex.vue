<template>
  <div :class="styles.container">
    <Filter />
    <div :class="styles.main">
      <h1 :class="styles.title">What Pokémon are you looking for?</h1>
      <Controls />
      <CardList :class="styles.list" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useCssModule } from 'vue'
import CardList from '@/components/CardList.vue'
import Controls from '@/components/Controls.vue'
import Filter from '@/components/Filter.vue'

export default defineComponent({
  components: {
    CardList,
    Controls,
    Filter,
  },
  setup() {
    const styles = useCssModule()
    return { styles }
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
  max-width: 160rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
}

.list {
}
</style>
