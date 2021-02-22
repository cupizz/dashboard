import { AnalysisService, GoogleAnalyticsService, PostService, UserService } from '@/services';
import type { Responses } from '@/services/response';
import type { FetchResult } from '@apollo/client';
import type { Effect, Reducer } from 'umi';
import type { UserLikeCountType } from './data';

export type DashboardAnalysisStateType = {
  platformData?: Responses.DataReportGoogleAnalyticResponse;
  cityData?: Responses.DataReportGoogleAnalyticResponse;
  genderData?: Responses.DataReportGoogleAnalyticResponse;
  deviceCategoryData?: Responses.DataReportGoogleAnalyticResponse;
  countryCategoryData?: Responses.DataReportGoogleAnalyticResponse;
  totalUserActive: number;
  totalUserOnline: number;
  timeLineData?: Responses.DataReportGoogleAnalyticResponse;
  totalUser: number;
  sessionData?: Responses.DataReportGoogleAnalyticResponse;
  topUserLikeCount: UserLikeCountType[];
  topUserDislikeCount: UserLikeCountType[];
  totalPost: number;
};

export type IDashboardAnalysisModelEffect<T> = {
  fetchTopUserLikeCount: T;
  fetchTopUserDislikeCount: T;
  fetchTotalUserOnline: T;
  fetchTotalUserActive: T;
  fetchTotalUser: T;
  fetchPlatform: T;
  fetchGender: T;
  fetchCity: T;
  fetchDeviceCategory: T;
  fetchCountry: T;
  fetchSessionData: T;
  fetchTimeLineData: T;
  fetchTotalPost: T;
};

export type DashboardAnalysisModelEffectType = {} & IDashboardAnalysisModelEffect<Effect>;

export type DashboardAnalysisModelType = {
  namespace: 'dashboardAnalysis';
  state: DashboardAnalysisStateType;
  effects: DashboardAnalysisModelEffectType;
  reducers: {
    save: Reducer<DashboardAnalysisStateType>;
    clear: Reducer<DashboardAnalysisStateType>;
  };
};

export const initDashboardAnalysisState: DashboardAnalysisStateType = {
  platformData: undefined,
  topUserLikeCount: [],
  topUserDislikeCount: [],
  totalUserActive: 0,
  totalUserOnline: 0,
  totalUser: 0,
  totalPost: 0,
};

const DashboardAnalysisModel: DashboardAnalysisModelType = {
  namespace: 'dashboardAnalysis',

  state: initDashboardAnalysisState,

  effects: {
    *fetchTopUserLikeCount(_, { call, put }) {
      const response: FetchResult<Responses.UserLikeCountListItem> = yield call(
        AnalysisService.getTopLikeCount,
      );
      yield put({
        type: 'save',
        payload: {
          topUserLikeCount: response.data?.users.map((item, index) => {
            const data: UserLikeCountType = {
              id: item.id,
              count: item.data.likeCount,
              index,
              nickName: item.data.nickName,
            };
            return data;
          }),
        },
      });
    },
    *fetchTopUserDislikeCount(_, { call, put }) {
      const response: FetchResult<Responses.UserDislikeCountListItem> = yield call(
        AnalysisService.getTopDislikeCount,
      );
      yield put({
        type: 'save',
        payload: {
          topUserDislikeCount: response.data?.users.map((item, index) => {
            const data: UserLikeCountType = {
              id: item.id,
              count: item.data.dislikeCount,
              index,
              nickName: item.data.nickName,
            };
            return data;
          }),
        },
      });
    },
    *fetchTotalUserActive(_, { call, put }) {
      const response: FetchResult<Responses.UserCount> = yield call(UserService.getTotalUserActive);
      const payload: Partial<DashboardAnalysisStateType> = {
        totalUserActive: response.data?.userCount,
      };
      yield put({
        type: 'save',
        payload,
      });
    },
    *fetchTotalUser(_, { call, put }) {
      const response: FetchResult<Responses.UserCount> = yield call(UserService.getTotalUser);
      const payload: Partial<DashboardAnalysisStateType> = {
        totalUser: response.data?.userCount,
      };
      yield put({
        type: 'save',
        payload,
      });
    },
    *fetchTotalPost(_, { call, put }) {
      const response: number = yield call(PostService.getTotalPost);
      const payload: Partial<DashboardAnalysisStateType> = {
        totalPost: response,
      };
      yield put({
        type: 'save',
        payload,
      });
    },
    *fetchTotalUserOnline(_, { call, put }) {
      const response: FetchResult<Responses.UserCount> = yield call(UserService.getTotalUserOnline);

      const payload: Partial<DashboardAnalysisStateType> = {
        totalUserOnline: response.data?.userCount,
      };
      yield put({
        type: 'save',
        payload,
      });
    },
    *fetchPlatform(_, { call, put }) {
      const response: Responses.SuccessResponse<Responses.DataReportGoogleAnalyticResponse> = yield call(
        GoogleAnalyticsService.getPlatform,
      );
      yield put({
        type: 'save',
        payload: {
          platformData: response.data,
        },
      });
    },
    *fetchCity(_, { call, put }) {
      const response: Responses.SuccessResponse<Responses.DataReportGoogleAnalyticResponse> = yield call(
        GoogleAnalyticsService.getCity,
      );
      yield put({
        type: 'save',
        payload: {
          cityData: response.data,
        },
      });
    },
    *fetchCountry(_, { call, put }) {
      const response: Responses.SuccessResponse<Responses.DataReportGoogleAnalyticResponse> = yield call(
        GoogleAnalyticsService.getCountry,
      );
      yield put({
        type: 'save',
        payload: {
          countryCategoryData: response.data,
        },
      });
    },
    *fetchDeviceCategory(_, { call, put }) {
      const response: Responses.SuccessResponse<Responses.DataReportGoogleAnalyticResponse> = yield call(
        GoogleAnalyticsService.getDeviceCategory,
      );
      yield put({
        type: 'save',
        payload: {
          deviceCategoryData: response.data,
        },
      });
    },
    *fetchGender(_, { call, put }) {
      const response: Responses.SuccessResponse<Responses.DataReportGoogleAnalyticResponse> = yield call(
        GoogleAnalyticsService.getGender,
      );
      yield put({
        type: 'save',
        payload: {
          genderData: response.data,
        },
      });
    },
    *fetchSessionData({ payload }, { call, put }) {
      const response: Responses.SuccessResponse<Responses.DataReportGoogleAnalyticResponse> = yield call(
        GoogleAnalyticsService.getSession,
        {
          startDate: payload.startDate,
          endDate: payload.endDate,
        },
      );
      yield put({
        type: 'save',
        payload: {
          sessionData: response.data,
        },
      });
    },
    *fetchTimeLineData(_, { call, put }) {
      const response: Responses.SuccessResponse<Responses.DataReportGoogleAnalyticResponse> = yield call(
        GoogleAnalyticsService.getTimeLine,
      );
      yield put({
        type: 'save',
        payload: {
          timeLineData: response.data,
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return initDashboardAnalysisState;
    },
  },
};

export default DashboardAnalysisModel;
