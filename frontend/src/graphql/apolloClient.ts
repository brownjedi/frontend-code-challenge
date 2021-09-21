/* eslint-disable graphql/template-strings */
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { resolvers } from './resolvers'
import { typeDefs } from './typeDefs'

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
          merge(existing, incoming, options) {
            console.log(existing, incoming, options)
            if (!existing) {
              return incoming
            }

            const ids = new Set(existing.edges.map((d: { __ref: unknown }) => d.__ref))

            return {
              ...existing,
              count: incoming.count,
              edges: [...existing.edges, ...incoming.edges.filter((d: { __ref: unknown }) => !ids.has(d.__ref))],
            }
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
