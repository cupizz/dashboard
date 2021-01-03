import { ConfigService } from '@/services';
import { Responses } from '@/services/response';
import Logger from '@/utils/Logger';
import { PageContainer } from '@ant-design/pro-layout';
import { FetchResult } from '@apollo/client';
import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react';

const { Column } = Table;
const Config = () => {
  const [listHobbies, setListHobbies] = useState<Responses.AppConfigItem[]>([]);

  const loadData = () => {
    ConfigService.getListAppConfig()
      .then((res: FetchResult<Responses.AppConfigListItem>) => {
        if (res.data) {
          setListHobbies(res.data.appConfigs);
        }
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <PageContainer
      extra={[
        <Button
          key="2"
          onClick={() => {
            loadData();
          }}
        >
          Refresh
        </Button>,
      ]}
    >
      {listHobbies.length ? (
        <Table rowKey="id" dataSource={listHobbies}>
          <Column
            sorter={(a: Responses.AppConfigItem, b: Responses.AppConfigItem) =>
              a.name.length - b.name.length
            }
            title="Name"
            dataIndex="name"
            key="name"
          />
          <Column
            sorter={(a: Responses.AppConfigItem, b: Responses.AppConfigItem) =>
              a.description.length - b.description.length
            }
            title="Description"
            dataIndex="description"
            key="description"
          />
          <Column title="Value" dataIndex="data" key="data" />
        </Table>
      ) : null}
    </PageContainer>
  );
};

export default Config;
