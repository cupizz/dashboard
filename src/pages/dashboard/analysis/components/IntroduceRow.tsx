import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, Row, Tooltip } from 'antd';
import numeral from 'numeral';
import React from 'react';
import { FormattedMessage } from 'umi';
import { ChartCard, Field } from './Charts';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const IntroduceRow = ({
  loading,
  totalUserActive,
  totalUserOnline,
  totalUser,
  totalPost,
  newUser,
}: {
  loading: boolean;
  totalUserOnline: number;
  totalUserActive: number;
  totalUser: number;
  totalPost: number;
  newUser: number;
}) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title={
          <FormattedMessage
            id="dashboardandanalysis.analysis.totalUser"
            defaultMessage="Total User"
          />
        }
        action={
          <Tooltip
            title={
              <FormattedMessage
                id="dashboardandanalysis.analysis.totalUser"
                defaultMessage="Total User"
              />
            }
          >
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={totalUser}
        footer={
          <Field
            label={
              <FormattedMessage
                id="dashboardandanalysis.analysis.totalUser"
                defaultMessage="Total User"
              />
            }
            value={totalUser}
          />
        }
        contentHeight={46}
      >
        {/* <MiniArea color="#975FE4" data={visitData} /> */}
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title={
          <FormattedMessage
            id="dashboardandanalysis.analysis.user-online"
            defaultMessage="User online"
          />
        }
        action={
          <Tooltip
            title={
              <FormattedMessage
                id="dashboardandanalysis.analysis.introduce"
                defaultMessage="Introduce"
              />
            }
          >
            <InfoCircleOutlined />
          </Tooltip>
        }
        loading={loading}
        total={() => totalUserOnline}
        footer={
          <Field
            label={
              <FormattedMessage
                id="dashboardandanalysis.analysis.user-rates"
                defaultMessage="User rate"
              />
            }
            value={
              totalUserActive > 0
                ? `${numeral(totalUserOnline / totalUserActive).format(
                    '0,0',
                  )} % (of ${totalUserActive})`
                : `0 % (of ${totalUserActive})`
            }
          />
        }
        contentHeight={46}
      />
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title={
          <FormattedMessage
            id="dashboardandanalysis.analysis.totalPost"
            defaultMessage="Total Post"
          />
        }
        action={
          <Tooltip
            title={
              <FormattedMessage
                id="dashboardandanalysis.analysis.totalPost"
                defaultMessage="Total Post"
              />
            }
          >
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={totalPost}
        footer={
          <Field
            label={
              <FormattedMessage
                id="dashboardandanalysis.analysis.totalPost"
                defaultMessage="Total Post"
              />
            }
            value={totalPost}
          />
        }
        contentHeight={46}
      >
        {/* <MiniBar data={visitData} /> */}
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        loading={loading}
        bordered={false}
        title={
          <FormattedMessage id="dashboardandanalysis.analysis.newUser" defaultMessage="New User" />
        }
        action={
          <Tooltip
            title={
              <FormattedMessage
                id="dashboardandanalysis.analysis.newUser"
                defaultMessage="New User"
              />
            }
          >
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={newUser}
        footer={
          <Field
            label={
              <FormattedMessage
                id="dashboardandanalysis.analysis.newUser"
                defaultMessage="New User"
              />
            }
            value={newUser}
          />
        }
        contentHeight={46}
      ></ChartCard>
    </Col>
  </Row>
);

export default IntroduceRow;
