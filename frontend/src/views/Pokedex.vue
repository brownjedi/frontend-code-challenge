<template>
  <div class="container">
    <CardList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CardList from '@/components/CardList.vue'

export default defineComponent({
  components: {
    CardList,
  },
})
</script>

<style lang="scss" scoped>
.container {
  max-width: 160rem;
  padding: 2rem;
  margin: 0 auto;
}
</style>
