import AuthenticationModel from '@/models/authentication';
import { combineEffects, combineLoadingEffects } from '@/utils/Context';
import React, { createContext, useContext, useMemo } from 'react';
import {
  AuthenticationModelEffectType,
  AuthenticationStateType,
  connect,
  Dispatch,
  IAuthenticationModelEffect,
  Loading,
} from 'umi';
import { IProviderProps, IResultStateToProps } from '../type';

interface IAuthContextValue {
  authModel: AuthenticationStateType;
  authEffect?: AuthenticationModelEffect;
  authLoading: boolean;
  authEffectLoading: AuthenticationModelLoadingEffect;
}

export interface AuthenticationModelEffect extends IAuthenticationModelEffect<Function> {}
export interface AuthenticationModelLoadingEffect extends IAuthenticationModelEffect<boolean> {}

export const AuthenticationContext = createContext<IAuthContextValue>({
  authModel: {},
  authEffect: undefined,
  authLoading: false,
  authEffectLoading: {
    login: false,
    logout: false,
  },
});

const AuthenticationProvider = (
  props: IProviderProps<
    AuthenticationStateType,
    AuthenticationModelLoadingEffect,
    AuthenticationModelEffect
  >,
) => {
  const { children, state, effect } = props;

  const contextValue: IAuthContextValue = useMemo<IAuthContextValue>(() => {
    return {
      authModel: state.model,
      authLoading: state.loading,
      authEffect: effect,
      authEffectLoading: state.effectLoading,
    };
  }, [state, effect]);

  return (
    <AuthenticationContext.Provider value={contextValue}>{children}</AuthenticationContext.Provider>
  );
};

const mapStateToProps = ({
  auth,
  loading,
}: {
  auth: AuthenticationStateType;
  loading: Loading;
}): IResultStateToProps<AuthenticationStateType, AuthenticationModelLoadingEffect> => ({
  state: {
    model: auth,
    loading: loading.models.auth,
    effectLoading: combineLoadingEffects<
      AuthenticationModelLoadingEffect,
      AuthenticationModelEffectType
    >(loading, AuthenticationModel.effects, AuthenticationModel.namespace),
  },
});

const mapDispatchToProps = (dispatch: Dispatch): { effect: AuthenticationModelEffect } => ({
  effect: combineEffects<AuthenticationModelEffect, AuthenticationModelEffectType>(
    dispatch,
    AuthenticationModel.effects,
    AuthenticationModel.namespace,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationProvider);

export const useAuthContext = () => useContext(AuthenticationContext);
