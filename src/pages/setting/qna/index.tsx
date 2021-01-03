import { QNAService } from '@/services';
import { Responses } from '@/services/response';
import Logger from '@/utils/Logger';
import { ExclamationCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { FetchResult } from '@apollo/client';
import { Button, Form, Input, message, Modal, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import renderHTML from 'react-render-html';

const { Column } = Table;
const { TextArea } = Input;
const QNA = () => {
  const [listQNAs, setListQNAs] = useState<Responses.QNAItem[]>([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [answer, setAnswer] = useState('');

  const [form] = Form.useForm();
  const [qnaItem, setQNAItem] = useState<Responses.QNAItem | undefined>(undefined);

  const handleAddNew = () => {
    setAnswer('');
    form.resetFields();
    setQNAItem(undefined);
    setIsModalVisible(true);
  };

  const handleUpdate = (item: Responses.QNAItem) => {
    setAnswer(item.answer);
    form.setFieldsValue({ question: item.question });
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const loadData = () => {
    QNAService.getListQNA()
      .then((res: FetchResult<Responses.QNAListItem, Record<string, any>>) => {
        console.log(res);

        if (res.data) {
          setListQNAs(res.data.qnAs);
        }
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };

  const handleSubmit = (value: any) => {
    setIsModalVisible(false);
    if (qnaItem) {
      QNAService.updateQNA({ id: qnaItem.id, ...value, answer })
        .then(() => {
          message.success('Success!');
        })
        .catch((error) => {
          message.error(error);
        })
        .finally(() => {
          loadData();
          setQNAItem(undefined);
        });
    } else {
      QNAService.createQNA({ ...value, answer })
        .then(() => {
          message.success('Success!');
        })
        .catch((error) => {
          message.error(error);
        })
        .finally(() => {
          loadData();
          setQNAItem(undefined);
        });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    loadData();
  }, []);

  console.log(qnaItem);


  const handleDelete = (item: Responses.QNAItem) => {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure about this?',
      okText: 'Oke',
      cancelText: 'Cancel',
      onOk: () => {
        QNAService.deleteQNA({
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
      {listQNAs.length ? (
        <Table rowKey="id" dataSource={listQNAs}>
          <Column
            sorter={(a: Responses.QNAItem, b: Responses.QNAItem) => a.id.length - b.id.length}
            title="ID"
            dataIndex="id"
            key="id"
          />
          <Column
            sorter={(a: Responses.QNAItem, b: Responses.QNAItem) =>
              a.question.length - b.question.length
            }
            title="Question"
            dataIndex="question"
            key="question"
          />
          <Column
            title="Answer"
            dataIndex="answer"
            key="answer"
            render={(value: string)=>(
              renderHTML(value)
            )}
          />
          <Column
            title="Action"
            key="action"
            render={(text: string, item: Responses.QNAItem) => (
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
        </Table>
      ) : null}
      <Modal
        title={qnaItem ? 'Update' : 'Add New'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <Form
          onFinish={handleSubmit}
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="question"
            label="Question"
            tooltip={{ title: 'Question', icon: <InfoCircleOutlined /> }}
            rules={[{ required: true, message: 'Please input question!' }]}
          >
            <TextArea rows={4} placeholder="Question" />
          </Form.Item>
          <Form.Item
            label="Answer"
            tooltip={{ title: 'Answer', icon: <InfoCircleOutlined /> }}
          >
            <ReactQuill value={answer} onChange={setAnswer} />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default QNA;
