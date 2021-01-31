import { UserService } from '@/services';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ProDescriptions from '@ant-design/pro-descriptions';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { ApolloError } from '@apollo/client';
import { Badge, Drawer, Image, message, Modal, Space, Tooltip, Typography } from 'antd';
import { SortOrder } from 'antd/lib/table/interface';
import React, { useRef, useState } from 'react';
import { OnlineStatus, UserStatus, UserTableListItem } from './data.d';

const { Title } = Typography;

const UserTableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<UserTableListItem>();

  const handleUpdateStatus = (user: UserTableListItem) => {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có muốn thay đổi trạng thái user này ko?',
      okText: 'Oke',
      cancelText: 'Cancel',
      onOk: () => {
        UserService.updateUserStatus({
          id: user.id,
          status: user.status === UserStatus.enabled ? UserStatus.disabled : UserStatus.enabled,
        })
          .then(() => {
            message.success('Cập nhật trạng thái thành công');
            actionRef.current?.reload();
          })
          .catch((error: ApolloError) => {
            message.error(error.message);
          });
      },
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedRowsState, setSelectedRows] = useState<UserTableListItem[]>([]);
  const columns: ProColumns<UserTableListItem>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'Rule name is required',
          },
        ],
      },
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>;
      },
    },
    {
      title: 'nick name',
      dataIndex: 'nickName',
      tip: 'nick name is the only key',
      sorter: true,
    },
    {
      title: 'gender',
      dataIndex: 'gender',
      sorter: true,
    },
    {
      title: 'birthday',
      dataIndex: 'birthday',
      sorter: true,
      filters: true,
    },
    {
      title: 'phone',
      dataIndex: 'phoneNumber',
      sorter: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      filters: true,
      valueType: 'select',
      valueEnum: {
        enabled: { text: 'enabled', status: 'enabled' },
        disabled: {
          text: 'disabled',
          disabled: 'disabled',
        },
      },
      sorter: true,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      sorter: true,
      valueType: 'dateTime',
      hideInForm: true,
      sortOrder: 'descend',
    },
    {
      title: 'Operation',
      valueType: 'option',
      render: (_, entity) => (
        <>
          <a
            onClick={() => {
              handleUpdateStatus(entity);
            }}
          >
            Update status
          </a>
        </>
      ),
    },
  ];

  const columnsDescription: ProColumns<UserTableListItem>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'Rule name is required',
          },
        ],
      },
      render: (dom) => {
        return <a>{dom}</a>;
      },
    },
    {
      title: 'avatar',
      dataIndex: 'avatar',
      render: (_, entity) => {
        return entity.avatar ? (
          <Image width={64} height={64} src={entity.avatar.thumbnail} />
        ) : null;
      },
    },
    {
      title: 'introduction',
      dataIndex: 'introduction',
    },
    {
      title: 'birthday',
      dataIndex: 'birthday',
      valueType: 'dateTime',
    },
    {
      title: 'age',
      dataIndex: 'age',
      renderText: (val: string) => `${val} tuổi`,
    },
    {
      title: 'gender',
      dataIndex: 'gender',
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Job',
      dataIndex: 'job',
    },
    {
      title: 'Height',
      dataIndex: 'height',
      renderText: (val: string) => `${val} cm`,
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Gender Prefer',
      dataIndex: 'genderPrefer',
      valueType: 'code',
      renderText: (_dom, entity) => {
        let text = '';
        entity.genderPrefer.forEach((gender) => {
          text += `${gender}\n`;
        });
        return text;
      },
    },
    {
      title: 'Max Age Prefer',
      dataIndex: 'maxAgePrefer',
    },
    {
      title: 'Min Age Prefer',
      dataIndex: 'minAgePrefer',
    },
    {
      title: 'Last Online',
      dataIndex: 'lastOnline',
      valueType: 'dateTime',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Status Updated At',
      dataIndex: 'statusUpdatedAt',
      valueType: 'dateTime',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
    },
    {
      title: 'Deleted At',
      dataIndex: 'deletedAt',
      valueType: 'dateTime',
    },
    {
      title: 'Hobbies',
      dataIndex: 'hobbies',
      valueType: 'code',
      renderText: (_dom, entity) => {
        let text = '';
        entity.hobbies.forEach((hobby) => {
          text += `${hobby.value}\n`;
        });
        return text;
      },
    },
    {
      title: 'Images',
      dataIndex: 'userImages',
      render: (_, entity) => {
        return (
          <Space>
            {entity.userImages.map((userImage) => {
              return userImage.image ? (
                <Image width={64} height={64} src={userImage.image.url} />
              ) : null;
            })}
          </Space>
        );
      },
    },
    {
      title: 'Operation',
      valueType: 'option',
      render: () => (
        <>
          <a
            onClick={() => {
              // handleUpdateModalVisible(true);
              // setStepFormValues(record);
            }}
          >
            Update status
          </a>
        </>
      ),
    },
  ];

  const queryListUser = async (
    params: any & {
      pageSize?: number;
      current?: number;
      keyword?: string;
    },
    sort: {
      [key: string]: SortOrder;
    },
    filter: {
      [key: string]: React.ReactText[];
    },
  ) => {
    console.log(params, sort, filter);
    const res = await UserService.getListUser(params, sort);
    return res;
  };

  const renderStatusOnline = (status?: OnlineStatus) => {
    if (status) {
      if (status === OnlineStatus.online) {
        return (
          <Tooltip title="online">
            <Badge color="green" />
          </Tooltip>
        );
      }
      if (status === OnlineStatus.away) {
        return (
          <Tooltip title="away">
            <Badge color="orange" />{' '}
          </Tooltip>
        );
      }
    }
    return (
      <Tooltip title="offline">
        <Badge color="red" />
      </Tooltip>
    );
  };

  const renderTitle = (user: UserTableListItem) => {
    return (
      <div>
        <Title>{user.nickName}</Title>
        <span>Online: {renderStatusOnline(user.onlineStatus)}</span>
      </div>
    );
  };

  return (
    <PageContainer>
      <ProTable<UserTableListItem>
        headerTitle="List Users"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={(params, sort, filter) => queryListUser(params, sort, filter)}
        columns={columns}

        // rowSelection={{
        //   onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        // }}
      />
      {/* {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              chosen <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> item&nbsp;&nbsp;
              <span>
                Total number of service calls
                {selectedRowsState.reduce((pre, item) => pre + item.data.phoneNumber, 0)}
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            batch deletion
          </Button>
          <Button type="primary">Batch approval</Button>
        </FooterToolbar>
      )} */}
      <Drawer
        width={1000}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row && (
          <ProDescriptions<UserTableListItem>
            column={2}
            title={renderTitle(row)}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.id,
            }}
            columns={columnsDescription}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default UserTableList;
