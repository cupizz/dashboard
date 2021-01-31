import type { Responses } from '@/services/response';
import { Card, DatePicker, Tabs } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import moment from 'moment';
import React from 'react';
import { FormattedMessage } from 'umi';
import styles from '../style.less';
import { Bar } from './Charts';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

type RangePickerValue = RangePickerProps<moment.Moment>['value'];
function disabledDate(current: moment.Moment) {
  // Can not select days before today and today
  return current && current > moment().endOf('day');
}
const formatDate = (text: string) => {
  return `${text.substring(text.length - 2, text.length)}/${text.substring(
    text.length - 4,
    text.length - 2,
  )}/${text.substring(0, 4)}`;
};
const VisitorCard = ({
  rangePickerValue,
  sessionData,
  isActive,
  handleRangePickerChange,
  loading,
  selectDate,
}: {
  rangePickerValue: RangePickerValue;
  isActive: (key: 'week' | 'month') => string;
  sessionData?: Responses.DataReportGoogleAnalyticResponse;
  loading: boolean;
  handleRangePickerChange: (dates: RangePickerValue, dateStrings: [string, string]) => void;
  selectDate: (key: 'week' | 'month') => void;
}) => {
  const barData = sessionData
    ? sessionData.rows.map((value) => {
        return {
          x: formatDate(value.dimensionValues[0].value),
          y: parseInt(value.metricValues[0].value, 10),
        };
      })
    : [];

  return (
    <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
      <div className={styles.salesCard}>
        <Tabs
          tabBarExtraContent={
            <div className={styles.salesExtraWrap}>
              <div className={styles.salesExtra}>
                <a className={isActive('week')} onClick={() => selectDate('week')}>
                  <FormattedMessage
                    id="dashboardandanalysis.analysis.last-week"
                    defaultMessage="Last Week"
                  />
                </a>
                {/* <a className={isActive('month')} onClick={() => selectDate('month')}>
                  <FormattedMessage
                    id="dashboardandanalysis.analysis.last-month"
                    defaultMessage="Last Month"
                  />
                </a> */}
              </div>
              <RangePicker
                value={rangePickerValue}
                onChange={handleRangePickerChange}
                style={{ width: 256 }}
                disabledDate={disabledDate}
              />
            </div>
          }
          size="large"
          tabBarStyle={{ marginBottom: 24 }}
        >
          <TabPane
            tab={
              <FormattedMessage id="dashboardandanalysis.analysis.visits" defaultMessage="Visits" />
            }
            key="views"
          >
            <div className={styles.salesBar}>
              <Bar
                height={292}
                title={
                  <FormattedMessage
                    id="dashboardandanalysis.analysis.visits-trend"
                    defaultMessage="Visits Trend"
                  />
                }
                data={barData}
              />
            </div>
          </TabPane>
        </Tabs>
      </div>
    </Card>
  );
};

export default VisitorCard;
