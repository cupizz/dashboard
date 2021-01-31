import type { Responses } from '@/services/response';
import { PieChartOutlined, TableOutlined } from '@ant-design/icons';
import { Card, Table, Tabs } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React from 'react';
import { FormattedMessage } from 'umi';
import { Pie } from './Charts';

const { TabPane } = Tabs;

const columns: ColumnsType<any> = [
  {
    title: 'Platform',
    dataIndex: 'platform',
    key: 'platform',
  },
  {
    title: 'Active users',
    dataIndex: 'activeUsers',
    key: 'activeUsers',
  },
  {
    title: 'Engagement',
    dataIndex: 'engagement',
    key: 'engagement',
  },
  {
    title: 'Revenue',
    key: 'revenue',
    dataIndex: 'revenue',
    align: 'right',
    render: (value) => `${value} đ`,
  },
];

const ProportionPlatforms = ({
  loading,
  platformData,
}: {
  loading: boolean;
  dropdownGroup: React.ReactNode;
  platformData?: Responses.DataReportGoogleAnalyticResponse;
}) => {
  const pieData = platformData
    ? platformData.rows.map((value) => {
        return {
          x: value.dimensionValues[0].value,
          y: parseInt(value.metricValues[0].value, 10),
        };
      })
    : [];

  const tableData = platformData
    ? platformData.rows.map((value) => {
        const duration = parseInt(value.metricValues[1].value, 10);
        return {
          platform: value.dimensionValues[0].value,
          activeUsers: value.metricValues[0].value,
          engagement: `${Math.ceil(duration / 60)}m ${duration % 60}s`,
          revenue: value.metricValues[2].value,
        };
      })
    : [];
  return (
    <Card loading={loading} bordered={false}>
      <Tabs size="large" tabBarStyle={{ marginBottom: 24 }}>
        <TabPane tab={<PieChartOutlined />} key="chart">
          <div>
            <h4 style={{ marginTop: 8, marginBottom: 32 }}>
              <FormattedMessage
                id="dashboardandanalysis.analysis.platforms"
                defaultMessage="Platforms"
              />
            </h4>
            <Pie
              hasLegend
              subTitle={
                <FormattedMessage
                  id="dashboardandanalysis.analysis.devices"
                  defaultMessage="Devices"
                />
              }
              total={() => `${pieData.reduce((pre, now) => now.y + pre, 0)}`}
              data={pieData}
              valueFormat={(value) => value}
              height={248}
              lineWidth={4}
            />
          </div>
        </TabPane>
        <TabPane tab={<TableOutlined />} key="table">
          <Table columns={columns} dataSource={tableData} />
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default ProportionPlatforms;
