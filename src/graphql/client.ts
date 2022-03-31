import {
  ApolloClient,
  HttpLink,
  InMemoryCache
} from '@apollo/client'

export const apolloClient = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: new HttpLink({
    uri: process.env.API_URL
  }),
  cache: new InMemoryCache()
})
