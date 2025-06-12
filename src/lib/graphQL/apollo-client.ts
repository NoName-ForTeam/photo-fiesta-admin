import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const httpLink = createHttpLink({
  uri: 'https://inctagram.work/api/v1/graphql',
})

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})
