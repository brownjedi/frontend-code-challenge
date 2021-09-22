/* eslint-disable graphql/template-strings */
import { PokemonList } from '@/types'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { resolvers } from './resolvers'
import { typeDefs } from './typeDefs'
import produce from 'immer'

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:4000/graphql',
})

// Cache implementation
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        pokemons: {
          keyArgs: ['query', ['search', 'filter', ['type', 'isFavorite']]],
          merge(existing: PokemonList, incoming: PokemonList, { args }) {
            if (!existing) {
              return incoming
            }

            const offset = args?.query?.offset || 0
            const nextState = produce(existing, draftState => {
              for (let i = 0; i < incoming.edges.length; ++i) {
                draftState.edges[offset + i] = incoming.edges[i]
              }
            })

            return nextState
          },
        },
      },
    },
  },
})

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  typeDefs,
  resolvers,
  defaultOptions: {
    watchQuery: {
      refetchWritePolicy: 'overwrite',
    },
  },
})
