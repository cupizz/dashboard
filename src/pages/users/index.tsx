import ProDescriptions from '@ant-design/pro-descriptions';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Drawer, Input, message } from 'antd';
import React, { useRef, useState } from 'react';
import { UserTableListItem } from './data.d';
import { removeRule } from './service';

/**
 * Delete node
 * @param selectedRows
 */
const handleRemove = async (selectedRows: UserTableListItem[]) => {
  const hide = message.loading('Deleting');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('Delete successfully, will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Deletion failed, please try again');
    return false;
  }
};

const UserTableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<UserTableListItem>();
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
      // render: (dom, entity) => {
      //   return <a onClick={() => setRow(entity)}>{dom}</a>;
      // },
      renderText: (val: string) => `${val}`,
    },
    {
      title: 'nick name',
      dataIndex: 'name',
      tip: 'name is the only key',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'Rule name is required',
          },
        ],
      },
      renderText: (val: string) => `${val}`,
    },
    {
      title: 'email',
      dataIndex: 'email',
      valueType: 'textarea',
    },
    {
      title: 'phone',
      dataIndex: 'callNo',
      sorter: true,
      hideInForm: true,
      renderText: (val: string) => `${val}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: { text: 'Close', status: 'Default' },
        1: { text: 'Running', status: 'Processing' },
        2: { text: 'Online', status: 'Success' },
        3: { text: 'Exception', status: 'Error' },
      },
    },
    {
      title: 'Created At',
      dataIndex: 'updatedAt',
      sorter: true,
      valueType: 'dateTime',
      hideInForm: true,
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');
        if (`${status}` === '0') {
          return false;
        }
        if (`${status}` === '3') {
          return <Input {...rest} placeholder="Please enter the reason for the exception!" />;
        }
        return defaultRender(item);
      },
    },
    {
      title: 'Operation',
      dataIndex: 'option',
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

  return (
    <PageContainer>
      <ProTable<UserTableListItem>
        headerTitle="List Users"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        // request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              chosen <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> item&nbsp;&nbsp;
              <span>
                Total number of service calls{' '}
                {selectedRowsState.reduce((pre, item) => pre + item.phone, 0)} 万
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
      )}
      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.nickName && (
          <ProDescriptions<UserTableListItem>
            column={2}
            title={row?.nickName}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.nickName,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default UserTableList;
