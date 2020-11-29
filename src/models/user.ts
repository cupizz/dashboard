import { query as queryUsers } from '@/services/user';
import { Effect, Reducer } from 'umi';
import { UserService } from '../services/UserService';

export type MediaFile = {
  id: string;
  thumbnail: string;
  url: string;
};

export type CurrentUserData = {
  address?: string;
  age: number;
  avatar?: MediaFile;
  birthday: string;
  cover?: any;
  introduction: string;
  gender: 'male' | 'female';
  nickName: string;
};

export type CurrentUser = {
  id: string;
  data: CurrentUserData;
};

export interface UserModelState {
  currentUser?: CurrentUser;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetch: Effect;
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    // changeNotifyCount: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: undefined,
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(UserService.getCurrentUser);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload.data.me || {},
      };
    },
    // changeNotifyCount(
    //   state,
    //   action,
    // ) {
    //   return {
    //     ...state,
    //     currentUser: {
    //       ...state?.currentUser,
    //       notifyCount: action.payload.totalCount,
    //       unreadCount: action.payload.unreadCount,
    //     },
    //   };
    // },
  },
};

export default UserModel;
