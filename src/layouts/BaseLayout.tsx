import ContextProvider from '@/contexts';
import GraphQLClient from '@/utils/GraphQLClient';
import { ApolloProvider } from '@apollo/client';
import React from 'react';

const BaseLayout: React.FC<{
  children?: any;
}> = ({ children }) => {
  return (
    <ApolloProvider client={GraphQLClient}>
      <ContextProvider>{children} </ContextProvider>
    </ApolloProvider>
  );
};

export default BaseLayout;
