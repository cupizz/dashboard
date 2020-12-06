import { Dispatch } from 'umi';

export function combineEffects<T, K extends object>(
  dispatch: Dispatch,
  effects: K,
  namespace: string,
): T {
  const result = Object.create({});
  Object.keys(effects).forEach((key) => {
    result[key] = (payload: any) => dispatch({ type: `${namespace}/${key}`, payload });
  });
  return result;
}

export interface LoadingModelType {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: { [key: string]: boolean | undefined };
}

export function combineLoadingEffects<T, K>(
  loading: LoadingModelType,
  effects: K,
  namespace: string,
): T {
  const result = Object.create({});
  Object.keys(effects).forEach((key) => {
    result[key] = loading.effects[`${namespace}/${key}`] || false;
  });
  return result;
}
