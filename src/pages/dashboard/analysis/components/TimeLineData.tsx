import type { Responses } from '@/services/response';
import DataSet from '@antv/data-set';
import { Card } from 'antd';
import { Axis, Chart, Geom, Legend, Tooltip } from 'bizcharts';
import Slider from 'bizcharts-plugin-slider';
import React from 'react';
import { useIntl } from 'umi';
import styles from '../style.less';

const formatDate = (text: string) => {
  return `${text.substring(text.length - 2, text.length)}/${text.substring(
    text.length - 4,
    text.length - 2,
  )}/${text.substring(0, 4)}`;
};

const padding = [60, 20, 40, 40] as [number, number, number, number];
const TimeLineData = ({
  loading,
  timeLineData,
}: {
  loading: boolean;
  timeLineData?: Responses.DataReportGoogleAnalyticResponse;
}) => {
  const { formatMessage } = useIntl();

  const titleMap = {
    y1: formatMessage({
      id: 'dashboardandanalysis.analysis.activeUsers',
      defaultMessage: 'activeUsers',
    }),
    y2: formatMessage({
      id: 'dashboardandanalysis.analysis.screenPageViews',
      defaultMessage: 'screenPageViews',
    }),
    y3: formatMessage({ id: 'dashboardandanalysis.analysis.newUsers', defaultMessage: 'newUsers' }),
    y4: formatMessage({
      id: 'dashboardandanalysis.analysis.eventCount',
      defaultMessage: 'eventCount',
    }),
  };
  const data = timeLineData
    ? timeLineData.rows.map((value) => {
        return {
          x: formatDate(value.dimensionValues[0].value),
          y1: parseInt(value.metricValues[0].value, 10),
          y2: parseInt(value.metricValues[1].value, 10),
          y3: parseInt(value.metricValues[2].value, 10),
          y4: parseInt(value.metricValues[3].value, 10),
        };
      })
    : [{ x: '', y1: 0, y2: 0, y3: 0, y4: 0 }];

  let max;
  if (data[0] && data[0].y1 && data[0].y2) {
    max = Math.max(
      [...data].sort((a, b) => b.y1 - a.y1)[0].y1,
      [...data].sort((a, b) => b.y2 - a.y2)[0].y2,
      [...data].sort((a, b) => b.y3 - a.y3)[0].y3,
      [...data].sort((a, b) => b.y4 - a.y4)[0].y4,
    );
  }

  const ds = new DataSet({
    state: {
      start: data[0].x,
      end: data[data.length - 1].x,
    },
  });

  const dv = ds.createView();
  dv.source(data)
    .transform({
      type: 'filter',
      callback: (obj: { x: string }) => {
        const date = obj.x;
        return date <= ds.state.end && date >= ds.state.start;
      },
    })
    .transform({
      type: 'map',
      callback(row: { y1: string; y2: string; y3: string; y4: string }) {
        const newRow = { ...row };
        newRow[titleMap.y1] = row.y1;
        newRow[titleMap.y2] = row.y2;
        newRow[titleMap.y3] = row.y3;
        newRow[titleMap.y4] = row.y4;
        return newRow;
      },
    })
    .transform({
      type: 'fold',
      fields: [titleMap.y1, titleMap.y2, titleMap.y3, titleMap.y4], // Expand the field set
      key: 'key', // key field
      value: 'value', // value field
    });

  const SliderGen = () => (
    <Slider
      padding={[0, padding[1] + 20, 0, padding[3]]}
      width="auto"
      height={26}
      xAxis="x"
      yAxis="y1"
      data={data}
      start={ds.state.start}
      end={ds.state.end}
      backgroundChart={{ type: 'line' }}
      onChange={({ startValue, endValue }: { startValue: string; endValue: string }) => {
        ds.setState('start', startValue);
        ds.setState('end', endValue);
      }}
    />
  );

  return (
    <Card
      loading={loading}
      className={styles.offlineCard}
      bordered={false}
      style={{ marginTop: 32 }}
    >
      <div style={{ padding: '0 24px' }}>
        <div className={styles.timelineChart} style={{ height: 400 + 30 }}>
          <div>
            <Chart height={400} padding={padding} data={dv} forceFit>
              <Axis name="x" />
              <Tooltip />
              <Legend name="key" position="top" />
              <Geom type="line" position="x*value" size={2} color="key" />
            </Chart>
            <div style={{ marginRight: -20 }}>
              <SliderGen />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TimeLineData;
