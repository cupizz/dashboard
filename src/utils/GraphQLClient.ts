import { ACCESS_TOKEN } from '@/constant';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

declare let GRAPHQL_URL: string;

const httpLink = createHttpLink({
  uri: GRAPHQL_URL,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem(ACCESS_TOKEN);

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token || undefined,
    },
  };
});

const GraphQLClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    addTypename: false,
    resultCaching: false
  }),
});

export default GraphQLClient;
