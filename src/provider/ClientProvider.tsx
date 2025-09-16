import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { apiUrl, baseUrl, ERXES_APP_TOKEN } from '@constants';
import { createClient } from 'graphql-ws';
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev';

// WebSocket link
const wsLink = new GraphQLWsLink(
  createClient({
    url: `wss://${baseUrl}/graphql`,
    retryAttempts: 1000,
    retryWait: async () => new Promise(res => setTimeout(res, 5000)),
    on: {
      connected: () => console.log('✅ WebSocket connected'),
      closed: () => console.log('⚠️ WebSocket closed'),
      error: err => console.error('❌ WebSocket error:', err),
    },
  }),
);

// HTTP link
const httpLink = new HttpLink({
  uri: `${apiUrl}/graphql`,
  headers: { 'erxes-app-token': ERXES_APP_TOKEN },
});

// Split based on operation type
const splitLink = ApolloLink.split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);
if (__DEV__) {
  loadDevMessages();
  loadErrorMessages();
}

export const createApolloClient = () =>
  new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: { fetchPolicy: 'network-only' },
    },
  });

export default createApolloClient;
