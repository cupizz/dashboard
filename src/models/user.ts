
import { UserService } from '@/services';
import { Effect, Reducer } from 'umi';

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
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: undefined,
  },

  effects: {
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
  },
};

export default UserModel;
