import { useDashboardAnalysisContext } from '@/contexts/dashboard';
import { EllipsisOutlined } from '@ant-design/icons';
import { GridContent, PageLoading } from '@ant-design/pro-layout';
import { Col, Dropdown, Menu, Row } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import type moment from 'moment';
import React, { Suspense, useEffect, useState } from 'react';
import styles from './style.less';
import { getTimeDistance } from './utils/utils';

const IntroduceRow = React.lazy(() => import('./components/IntroduceRow'));
const VisitorCard = React.lazy(() => import('./components/VisitorCard'));
const TopLikeOrDislike = React.lazy(() => import('./components/TopLikeOrDislike'));
const ProportionPlatforms = React.lazy(() => import('./components/ProportionPlatforms'));
const TimeLineData = React.lazy(() => import('./components/TimeLineData'));

type RangePickerValue = RangePickerProps<moment.Moment>['value'];

const Analysis: React.FC<{}> = () => {
  const {
    dashboardAnalysisModel: {
      sessionData,
      topUserDislikeCount,
      topUserLikeCount,
      totalUserActive,
      totalUserOnline,
      platformData,
      timeLineData,
      totalUser,
      totalPost,
    },
    dashboardAnalysisLoading,
    dashboardAnalysisEffect,
    dashboardAnalysisEffectLoading,
  } = useDashboardAnalysisContext();

  const [loadingIntroduce, SetLoadingIntroduce] = useState<boolean>(false);

  const [rangePickerValue, SetRangePickerValue] = useState<RangePickerValue>(
    getTimeDistance('week'),
  );

  useEffect(() => {
    dashboardAnalysisEffect?.fetchTopUserDislikeCount();
    dashboardAnalysisEffect?.fetchTopUserLikeCount();
    dashboardAnalysisEffect?.fetchTotalUserOnline();
    dashboardAnalysisEffect?.fetchTotalUserActive();
    dashboardAnalysisEffect?.fetchCountry();
    dashboardAnalysisEffect?.fetchCity();
    dashboardAnalysisEffect?.fetchPlatform();
    dashboardAnalysisEffect?.fetchGender();
    dashboardAnalysisEffect?.fetchTimeLineData();
    dashboardAnalysisEffect?.fetchTotalUser();
    dashboardAnalysisEffect?.fetchTotalPost();
  }, []);

  useEffect(() => {
    SetLoadingIntroduce(
      dashboardAnalysisEffectLoading.fetchTotalUserOnline ||
        dashboardAnalysisEffectLoading.fetchTotalUserActive ||
        dashboardAnalysisEffectLoading.fetchTotalUser ||
        dashboardAnalysisEffectLoading.fetchTotalPost ||
        dashboardAnalysisEffectLoading.fetchTimeLineData,
    );
  }, [
    dashboardAnalysisEffectLoading.fetchTotalUserOnline,
    dashboardAnalysisEffectLoading.fetchTotalUserActive,
    dashboardAnalysisEffectLoading.fetchTotalUser,
    dashboardAnalysisEffectLoading.fetchTotalPost,
    dashboardAnalysisEffectLoading.fetchTimeLineData,
  ]);

  const getSessionData = () => {
    if (rangePickerValue) {
      dashboardAnalysisEffect?.fetchSessionData({
        startDate: rangePickerValue[0]?.valueOf(),
        endDate: rangePickerValue[1]?.valueOf(),
      });
    }
  };

  useEffect(() => {
    getSessionData();
  }, [rangePickerValue]);

  const handleRangePickerChange = (rangeValue: RangePickerValue) => {
    SetRangePickerValue(rangeValue);
  };

  const selectDate = (type: 'week' | 'month') => {
    SetRangePickerValue(getTimeDistance(type));
  };

  const isActive = (type: 'week' | 'month') => {
    if (!rangePickerValue) {
      return '';
    }
    const value = getTimeDistance(type);
    if (!value) {
      return '';
    }
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0] as moment.Moment, 'day') &&
      rangePickerValue[1].isSame(value[1] as moment.Moment, 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  };
  const menu = (
    <Menu>
      <Menu.Item>Operation one</Menu.Item>
      <Menu.Item>Operation two</Menu.Item>
    </Menu>
  );

  const dropdownGroup = (
    <span className={styles.iconGroup}>
      <Dropdown overlay={menu} placement="bottomRight">
        <EllipsisOutlined />
      </Dropdown>
    </span>
  );
  const newUser = timeLineData
    ? parseInt(timeLineData.rows[timeLineData.rows.length - 1].metricValues[2].value, 10)
    : 0;
  return (
    <GridContent>
      <React.Fragment>
        <Suspense fallback={<PageLoading />}>
          <IntroduceRow
            loading={loadingIntroduce}
            totalUserActive={totalUserActive}
            totalUserOnline={totalUserOnline}
            totalUser={totalUser}
            totalPost={totalPost}
            newUser={newUser}
          />
        </Suspense>
        <Suspense fallback={null}>
          <VisitorCard
            rangePickerValue={rangePickerValue}
            isActive={isActive}
            handleRangePickerChange={handleRangePickerChange}
            loading={dashboardAnalysisEffectLoading.fetchSessionData}
            selectDate={selectDate}
            sessionData={sessionData}
          />
        </Suspense>
        <Row
          gutter={24}
          style={{
            marginTop: 24,
          }}
        >
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <TopLikeOrDislike
                loading={
                  dashboardAnalysisEffectLoading.fetchTopUserLikeCount ||
                  dashboardAnalysisEffectLoading.fetchTopUserLikeCount
                }
                topUserDislikeCount={topUserDislikeCount}
                topUserLikeCount={topUserLikeCount}
                dropdownGroup={dropdownGroup}
              />
            </Suspense>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <ProportionPlatforms
                dropdownGroup={dropdownGroup}
                loading={dashboardAnalysisEffectLoading.fetchPlatform}
                platformData={platformData}
              />
            </Suspense>
          </Col>
        </Row>
        <Suspense fallback={null}>
          <TimeLineData loading={dashboardAnalysisLoading} timeLineData={timeLineData} />
        </Suspense>
      </React.Fragment>
    </GridContent>
  );
};

export default Analysis;
