import React from 'react';
import AuthContextProvider from './authentication';
import { DashboardAnalysisContextProvider } from './dashboard';

const contextProviders: any[] = [AuthContextProvider, DashboardAnalysisContextProvider];

const ContextProvider = ({ children }: { children: any }) => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  return contextProviders.reduceRight((memo, ContextProvider: any) => {
    return <ContextProvider>{memo}</ContextProvider>;
  }, children);
};

export default ContextProvider;
