import { ApolloClient, InMemoryCache, createHttpLink, split, DefaultOptions } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'

const httpLink = createHttpLink({
  uri: 'https://inctagram.work/api/v1/graphql',
  credentials: 'include',
})

const authLink = setContext((operation, { headers }) => {
  if (operation.operationName === 'LoginAdmin') return { headers }
  const email = localStorage.getItem('adminEmail') || ''
  const pass = localStorage.getItem('adminPassword') || ''
  const basic = btoa(`${email}:${pass}`)
  return {
    headers: {
      ...headers,
      Authorization: basic ? `Basic ${basic}` : '',
    },
  }
})

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://inctagram.work/api/v1/graphql',
    connectionParams: () => {
      const email = localStorage.getItem('adminEmail') || ''
      const pass = localStorage.getItem('adminPassword') || ''
      const basic = btoa(`${email}:${pass}`)
      return { authorization: `Basic ${basic}` }
    },
  })
)

const splitLink = split(
  ({ query }) => {
    const def = getMainDefinition(query)
    return def.kind === 'OperationDefinition' && def.operation === 'subscription'
  },
  wsLink,
  authLink.concat(httpLink)
)
const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
  },
  query: {
    fetchPolicy: 'network-only',
  },
  mutate: {
    errorPolicy: 'all',
  },
}

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  defaultOptions,
})
