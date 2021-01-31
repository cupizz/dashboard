import { UserLikeCountType } from '@/models/data';
import { Card, Table, Tabs } from 'antd';
import React from 'react';
import { FormattedMessage } from 'umi';
import styles from '../style.less';

const { TabPane } = Tabs;

const columns = [
  {
    title: <FormattedMessage id="dashboardandanalysis.table.rank" defaultMessage="Rank" />,
    dataIndex: 'index',
    key: 'index',
  },
  {
    title: <FormattedMessage id="dashboardandanalysis.table.user" defaultMessage="User" />,
    dataIndex: 'nickName',
    key: 'nickName',
    render: (text: React.ReactNode) => <a href="#">{text}</a>,
  },
  {
    title: <FormattedMessage id="dashboardandanalysis.table.count" defaultMessage="Count" />,
    dataIndex: 'count',
    key: 'count',
    sorter: (a: { count: number }, b: { count: number }) => a.count - b.count,
    className: styles.alignRight,
  },
];

const TopLikeOrDislike = ({
  loading,
  topUserLikeCount,
  topUserDislikeCount,
  dropdownGroup,
}: {
  loading: boolean;
  dropdownGroup: React.ReactNode;
  topUserLikeCount: UserLikeCountType[];
  topUserDislikeCount: UserLikeCountType[];
}) => (
  <Card
    loading={loading}
    bordered={false}
    title={
      <FormattedMessage
        id="dashboardandanalysis.analysis.online-top-like-or-dislike"
        defaultMessage="Top User Like Or Dislike"
      />
    }
    extra={dropdownGroup}
    style={{
      height: '100%',
    }}
  >
    <Tabs>
      <TabPane
        tab={<FormattedMessage id="dashboardandanalysis.analysis.like" defaultMessage="Likes" />}
        key="like"
      >
        <Table<any>
          rowKey={(record) => record.index}
          size="small"
          columns={columns}
          dataSource={topUserLikeCount}
          pagination={{
            style: { marginBottom: 0 },
            pageSize: 5,
          }}
        />
      </TabPane>
      <TabPane
        tab={
          <FormattedMessage id="dashboardandanalysis.analysis.dislike" defaultMessage="Dislikes" />
        }
        key="dislike"
      >
        <Table<any>
          rowKey={(record) => record.index}
          size="small"
          columns={columns}
          dataSource={topUserDislikeCount}
          pagination={{
            style: { marginBottom: 0 },
            pageSize: 5,
          }}
        />
      </TabPane>
    </Tabs>
  </Card>
);

export default TopLikeOrDislike;
