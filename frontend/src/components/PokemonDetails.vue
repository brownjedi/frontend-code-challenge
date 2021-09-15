<template>
  <div class="apollo-example">
    <!-- Apollo watched Graphql query -->
    <ApolloQuery :query="require('../graphql/pokemonById.gql')" :variables="{ id }">
      <template slot-scope="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occured</div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo" :key="data.pokemon.id">
          <p>{{ data.pokemon.id }}</p>
          <p>{{ data.pokemon.name }}</p>
          <p>{{ data.pokemon.number }}</p>
          <p>{{ data.pokemon.classification }}</p>
          <img :src="data.pokemon.image" :alt="data.pokemon.name" />
          <p>{{ data.pokemon.isFavorite }}</p>
          <p>{{ data.pokemon.maxCP }}</p>
          <p>{{ data.pokemon.maxHP }}</p>
          <p>{{ data.pokemon.fleeRate }}</p>
          <p>{{ data.pokemon.resistant }}</p>
          <audio controls>
            <source :src="data.pokemon.sound" type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
          <p>{{ data.pokemon.sound }}</p>
          <p>{{ data.pokemon.types }}</p>
          <p>{{ data.pokemon.weakness }}</p>
        </div>

        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
export default {
  apollo: {},
  methods: {},
  data() {
    return {
      id: this.$route.params.id,
    }
  },
}
</script>

<style scoped lang="scss">
.apollo {
  padding: 12px;
}

.error {
  color: red;
}
</style>
