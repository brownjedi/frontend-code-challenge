<template>
  <div class="apollo-example">
    <!-- Apollo watched Graphql query -->
    <ApolloQuery :query="require('../graphql/pokemons.gql')">
      <template slot-scope="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occured</div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo" v-for="pokemon in data.pokemons.edges" :key="pokemon.id">
          <router-link :to="`/${pokemon.id}`">{{ pokemon.name }}</router-link>
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
}
</script>

<style scoped>
.apollo {
  padding: 12px;
}

.error {
  color: red;
}
</style>
