import { PostCategoryService } from '@/services';
import type { Responses } from '@/services/response';
import Logger from '@/utils/Logger';
import { InfoCircleOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Form, Input, message, Modal, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import type { ColorResult } from 'react-color';
import { SketchPicker } from 'react-color';

const { Column } = Table;
const PostCategory = () => {
  const [listPostCategories, setListPostCategories] = useState<Responses.PostCategoryItem[]>([]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [form] = Form.useForm();
  const [categoryItem, setPostCategoryItem] = useState<Responses.PostCategoryItem | null>(null);

  const [color, setColor] = useState<string>('#fff');
  const handleChangeColorComplete = (value: ColorResult) => {
    setColor(value.hex);
  };

  const handleAddNew = () => {
    setPostCategoryItem(null);
    setIsModalVisible(true);
    form.resetFields();
    setColor('#fff');
  };

  const handleUpdate = (item: Responses.PostCategoryItem) => {
    setPostCategoryItem(item);
    form.setFieldsValue({
      ...item,
    });
    setColor(`#${item.color}`);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const loadData = () => {
    PostCategoryService.getListPostCategory()
      .then((res) => {
        if (res.data) {
          console.log(res);

          setListPostCategories(res.data.postCategories);
        }
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };

  const handleSubmit = (value: any) => {
    setIsModalVisible(false);
    if (categoryItem) {
      PostCategoryService.updatePostCategory({
        id: categoryItem.id,
        value: value.value,
        color: color.substring(1, color.length),
      })
        .then(() => {
          message.success('Success!');
        })
        .catch((error) => {
          message.error(error);
        })
        .finally(() => {
          loadData();
          setPostCategoryItem(null);
        });
    } else {
      PostCategoryService.createPostCategory({
        value: value.value,
        color: color.substring(1, color.length),
      })
        .then(() => {
          message.success('Success!');
        })
        .catch((error) => {
          message.error(error);
        })
        .finally(() => {
          loadData();
          setPostCategoryItem(null);
        });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
      {listPostCategories.length ? (
        <Table rowKey="id" dataSource={listPostCategories}>
          <Column
            sorter={(a: Responses.PostCategoryItem, b: Responses.PostCategoryItem) =>
              a.id.length - b.id.length
            }
            title="ID"
            dataIndex="id"
            key="id"
          />
          <Column
            sorter={(a: Responses.PostCategoryItem, b: Responses.PostCategoryItem) =>
              a.value.length - b.value.length
            }
            title="Value"
            dataIndex="value"
            key="value"
          />
          <Column
            title="Color"
            dataIndex="color"
            key="color"
            render={(backgroundColor: string) => {
              const backgroundColorItem = `#${backgroundColor}`;
              return (
                <div
                  className="main-color-item"
                  style={{
                    backgroundColor: backgroundColorItem,
                  }}
                >
                  <span className="main-color-text">{backgroundColorItem}</span>
                </div>
              );
            }}
          />
          <Column
            title="Action"
            key="action"
            render={(text: string, item: Responses.PostCategoryItem) => (
              <Space size="middle">
                <a
                  onClick={() => {
                    handleUpdate(item);
                  }}
                >
                  Update
                </a>
              </Space>
            )}
          />
        </Table>
      ) : null}
      <Modal
        title={categoryItem ? 'Update' : 'Add New'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form onFinish={handleSubmit} form={form} layout="vertical">
          <Form.Item
            name="value"
            label="Value"
            tooltip={{ title: 'Post Category Value?', icon: <InfoCircleOutlined /> }}
            rules={[{ required: true, message: 'Please input Post Category Value!' }]}
          >
            <Input placeholder="Post Category Value" />
          </Form.Item>
          <Form.Item label="Color">
            <SketchPicker color={color} onChangeComplete={handleChangeColorComplete} />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default PostCategory;
