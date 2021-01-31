import type { DashboardAnalysisModelEffectType } from '@/models/analysis';
import DashboardAnalysisModel from '@/models/analysis';
import { combineEffects, combineLoadingEffects } from '@/utils/Context';
import React, { createContext, useContext, useMemo } from 'react';
import type {
  DashboardAnalysisStateType,
  Dispatch,
  IDashboardAnalysisModelEffect,
  Loading,
} from 'umi';
import { connect, initDashboardAnalysisState } from 'umi';
import type { IProviderProps, IResultStateToProps } from '../../type';

type IDashboardAnalysisContextValue = {
  dashboardAnalysisModel: DashboardAnalysisStateType;
  dashboardAnalysisEffect?: DashboardAnalysisModelEffect;
  dashboardAnalysisLoading: boolean;
  dashboardAnalysisEffectLoading: DashboardAnalysisModelLoadingEffect;
};

export type DashboardAnalysisModelEffect = {} & IDashboardAnalysisModelEffect<Function>;
export type DashboardAnalysisModelLoadingEffect = {} & IDashboardAnalysisModelEffect<boolean>;

export const DashboardAnalysisContext = createContext<IDashboardAnalysisContextValue>({
  dashboardAnalysisModel: initDashboardAnalysisState,
  dashboardAnalysisEffect: undefined,
  dashboardAnalysisLoading: false,
  dashboardAnalysisEffectLoading: {
    fetchTopUserDislikeCount: false,
    fetchTopUserLikeCount: false,
    fetchPlatform: false,
    fetchTotalUserActive: false,
    fetchTotalUserOnline: false,
    fetchCity: false,
    fetchCountry: false,
    fetchDeviceCategory: false,
    fetchGender: false,
    fetchSessionData: false,
    fetchTimeLineData: false,
  },
});

const DashboardAnalysisProvider = (
  props: IProviderProps<
    DashboardAnalysisStateType,
    DashboardAnalysisModelLoadingEffect,
    DashboardAnalysisModelEffect
  >,
) => {
  const { children, state, effect } = props;

  const contextValue: IDashboardAnalysisContextValue = useMemo<IDashboardAnalysisContextValue>(() => {
    return {
      dashboardAnalysisModel: state.model,
      dashboardAnalysisLoading: state.loading,
      dashboardAnalysisEffect: effect,
      dashboardAnalysisEffectLoading: state.effectLoading,
    };
  }, [state, effect]);

  return (
    <DashboardAnalysisContext.Provider value={contextValue}>
      {children}
    </DashboardAnalysisContext.Provider>
  );
};

const mapStateToProps = ({
  dashboardAnalysis,
  loading,
}: {
  dashboardAnalysis: DashboardAnalysisStateType;
  loading: Loading;
}): IResultStateToProps<DashboardAnalysisStateType, DashboardAnalysisModelLoadingEffect> => ({
  state: {
    model: dashboardAnalysis,
    loading: loading.models.dashboardAnalysis,
    effectLoading: combineLoadingEffects<
      DashboardAnalysisModelLoadingEffect,
      DashboardAnalysisModelEffectType
    >(loading, DashboardAnalysisModel.effects, DashboardAnalysisModel.namespace),
  },
});

const mapDispatchToProps = (dispatch: Dispatch): { effect: DashboardAnalysisModelEffect } => ({
  effect: combineEffects<DashboardAnalysisModelEffect, DashboardAnalysisModelEffectType>(
    dispatch,
    DashboardAnalysisModel.effects,
    DashboardAnalysisModel.namespace,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardAnalysisProvider);

export const useDashboardAnalysisContext = () => useContext(DashboardAnalysisContext);
