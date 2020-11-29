import GraphQLClient from '@/utils/GraphQLClient';
import { ApolloProvider } from '@apollo/client';
import React from 'react';

const Layout: React.FC = ({ children }) => (
  <ApolloProvider client={GraphQLClient}>{children}</ApolloProvider>
);

export default Layout;
