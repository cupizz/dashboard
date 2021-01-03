import { HobbyService } from '@/services';
import { Responses } from '@/services/response';
import Logger from '@/utils/Logger';
import { ExclamationCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Form, Input, message, Modal, Radio, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';

const { Column } = Table;
const Hobby = () => {
  const [listHobbies, setListHobbies] = useState<Responses.HobbyItem[]>([]);
  console.log(listHobbies);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [form] = Form.useForm();
  const [hobbyItem, setHobbyItem] = useState<Responses.HobbyItem | null>(null);

  const handleAddNew = () => {
    setHobbyItem(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleUpdate = (item: Responses.HobbyItem) => {
    setHobbyItem(item);
    form.setFieldsValue({
      ...item
    });
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const loadData = () => {
    HobbyService.getListHobby()
      .then((res) => {
        console.log(res);

        if (res.data) {
          setListHobbies(res.data.hobbies);
        }
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };

  const handleSubmit = (value: any) => {
    setIsModalVisible(false);
    if (hobbyItem) {
      HobbyService.updateHobby({ id: hobbyItem.id, ...value })
        .then(() => {
          message.success('Success!');
        })
        .catch((error) => {
          message.error(error);
        })
        .finally(() => {
          loadData();
          setHobbyItem(null);
        });
    } else {
      HobbyService.createHobby({ ...value })
        .then(() => {
          message.success('Success!');
        })
        .catch((error) => {
          message.error(error);
        })
        .finally(() => {
          loadData();
          setHobbyItem(null);
        });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = (item: Responses.HobbyItem) => {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure about this?',
      okText: 'Oke',
      cancelText: 'Cancel',
      onOk: () => {
        HobbyService.deleteHobby({
          id: item.id,
        })
          .then(() => {
            message.success('Success!');
            loadData();
          })
          .catch((error: any) => {
            message.error(error);
          });
      },
    });
  };

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
        <Button
          onClick={() => {
            handleAddNew();
          }}
          key="1"
          type="primary"
        >
          Add New
        </Button>,
      ]}
    >
      {listHobbies.length ? <Table rowKey="id" dataSource={listHobbies}>
        <Column
          sorter={(a: Responses.HobbyItem, b: Responses.HobbyItem) => a.id.length - b.id.length}
          title="ID"
          dataIndex="id"
          key="id"
        />
        <Column
          sorter={(a: Responses.HobbyItem, b: Responses.HobbyItem) =>
            a.value.length - b.value.length
          }
          title="Value"
          dataIndex="value"
          key="value"
        />
        <Column
          title="Is Valid"
          dataIndex="isValid"
          key="isValid"
          render={(isValid: boolean) => {
            return isValid ? 'True' : 'False';
          }}
        />
        <Column
          title="Action"
          key="action"
          render={(text: string, item: Responses.HobbyItem) => (
            <Space size="middle">
              <a
                onClick={() => {
                  handleUpdate(item);
                }}
              >
                Update
              </a>
              /
              <a
                onClick={() => {
                  handleDelete(item);
                }}
              >
                Delete
              </a>
            </Space>
          )}
        />
      </Table>: null}
      <Modal
        title={hobbyItem ? 'Update' : 'Add New'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          onFinish={handleSubmit}
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="value"
            label="Value"
            tooltip={{ title: 'Hobby Name', icon: <InfoCircleOutlined /> }}
            rules={[{ required: true, message: 'Please input Hobby Name!' }]}
          >
            <Input placeholder="Hobby Name" />
          </Form.Item>
          <Form.Item label="Is Valid" name="isValid">
            <Radio.Group>
              <Radio.Button value>True</Radio.Button>
              <Radio.Button value={false}>False</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default Hobby;
