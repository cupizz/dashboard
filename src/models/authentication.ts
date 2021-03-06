import { AuthenticateService } from '@/services/AuthenticationService';
import { setAuthority } from '@/utils/authority';
import Logger from '@/utils/Logger';
import { getPageQuery } from '@/utils/utils';
import { stringify } from 'querystring';
import { Effect, history, Reducer } from 'umi';
import { ACCESS_TOKEN } from '../constant/index';

export interface AuthenticationStateType {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface IAuthenticationModelEffect<T> {
  login: T;
  logout: T;
}

export interface AuthenticationModelEffectType extends IAuthenticationModelEffect<Effect> {}

export interface AuthenticationModelType {
  namespace: 'authentication';
  state: AuthenticationStateType;
  effects: AuthenticationModelEffectType;
  reducers: {
    changeLoginStatus: Reducer<AuthenticationStateType>;
  };
}

const removeToken = () => {
  localStorage.removeItem(ACCESS_TOKEN);
};

const AuthenticationModel: AuthenticationModelType = {
  namespace: 'authentication',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      try {
        const response = yield call(AuthenticateService.postAuthLogin, payload);
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
        return response;
      } catch (error) {
        Logger.error(error);
        return null;
      }

      // Login successfully
      // if (response.status === 'ok') {
      //   const urlParams = new URL(window.location.href);
      //   const params = getPageQuery();
      //   message.success('🎉 🎉 🎉 Login successfully!');
      //   let { redirect } = params as { redirect: string };
      //   if (redirect) {
      //     const redirectUrlParams = new URL(redirect);
      //     if (redirectUrlParams.origin === urlParams.origin) {
      //       redirect = redirect.substr(urlParams.origin.length);
      //       if (redirect.match(/^\/.*#/)) {
      //         redirect = redirect.substr(redirect.indexOf('#') + 1);
      //       }
      //     } else {
      //       window.location.href = '/';
      //       return;
      //     }
      //   }
      //   history.replace(redirect || '/');
      // }
    },

    logout() {
      const { redirect } = getPageQuery();
      removeToken();
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};

export default AuthenticationModel;
