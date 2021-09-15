<template>
  <div>
    <PokemonDetails />
    <button @click="previous">Previous</button>
    <button @click="next">Next</button>
  </div>
</template>

<script>
import PokemonDetails from '@/components/PokemonDetails.vue'
export default {
  components: {
    PokemonDetails,
  },
  methods: {
    previous() {
      console.log('previous')
    },
    next() {
      console.log('next')
    },
  },
}
</script>

<style lang="scss"></style>
