export interface IProviderProps<T, K, V> {
  state: { model: T; loading: boolean; effectLoading: K };
  effect: V;
  children: React.ReactChildren;
}

export interface IResultStateToProps<T, K> {
  state: {
    model: T;
    loading: boolean;
    effectLoading: K;
  };
}
