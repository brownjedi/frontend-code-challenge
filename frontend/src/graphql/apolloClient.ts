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
const cache = new InMemoryCache()

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  typeDefs,
  resolvers,
})
