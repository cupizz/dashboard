import { QuestionService } from '@/services';
import type { Responses } from '@/services/response';
import Logger from '@/utils/Logger';
import { ExclamationCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Form, Input, message, Modal, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import type { ColorResult } from 'react-color';
import { SketchPicker } from 'react-color';
import { GradientPicker } from 'react-linear-gradient-picker';

const rgbToRgba = (rgb: string, a = 1) => rgb.replace('rgb(', 'rgba(').replace(')', `, ${a})`);

const WrappedSketchPicker = ({ onSelect, ...rest }: { onSelect: Function }) => {
  return (
    <SketchPicker
      {...rest}
      color={rgbToRgba(rest.color, rest.opacity)}
      onChange={(c) => {
        const { r, g, b, a } = c.rgb;
        onSelect(`rgb(${r}, ${g}, ${b})`, a);
      }}
    />
  );
};

function componentFromStr(numStr: string, percent: string) {
  const num = Math.max(0, parseInt(numStr, 10));
  return percent ? Math.floor((255 * Math.min(100, num)) / 100) : Math.min(255, num);
}

function rgbToHex(rgb: string) {
  const rgbRegex = /^rgb\(\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*\)$/;
  let result;
  let r;
  let g;
  let b;
  let hex = '';
  // eslint-disable-next-line no-cond-assign
  if ((result = rgbRegex.exec(rgb))) {
    r = componentFromStr(result[1], result[2]);
    g = componentFromStr(result[3], result[4]);
    b = componentFromStr(result[5], result[6]);

    // eslint-disable-next-line no-bitwise
    hex = `#${(0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }
  return hex;
}

type Palette = {
  offset: string;
  color: string;
}

const { Column } = Table;
const Question = () => {
  const [listQuestions, setListQuestions] = useState<Responses.QuestionItem[]>([]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [form] = Form.useForm();
  const [questionItem, setQuestionItem] = useState<Responses.QuestionItem | null>(null);

  const [color, setColor] = useState<string>('#fff');

  const [textColor, setTextColor] = useState<string>('#fff');

  const handleChangeTextColorComplete = (value: ColorResult) => {
    setTextColor(value.hex);
  };

  const [palette, setPalette] = useState<[Palette, Palette]>([
    { offset: '0.00', color: 'rgb(238, 241, 11)' },
    { offset: '1.00', color: 'rgb(126, 32, 207)' },
  ]);

  const handleGradientChange = (value: [Palette, Palette]) => {
    setPalette(value);
  };

  const handleChangeColorComplete = (value: ColorResult) => {
    setColor(value.hex);
  };

  const handleAddNew = () => {
    setQuestionItem(null);
    setIsModalVisible(true);
    form.resetFields();
    setColor('#fff');
    setTextColor('#fff');
    setPalette([
      { offset: '0.00', color: 'rgb(238, 241, 11)' },
      { offset: '1.00', color: 'rgb(126, 32, 207)' },
    ]);
  };

  const handleUpdate = (item: Responses.QuestionItem) => {
    setQuestionItem(item);
    form.setFieldsValue({
      ...item,
    });
    setColor(`#${item.color}`);
    setTextColor(`#${item.textColor}`);
    if (item.gradient.length > 2) {
      setPalette([
        {
          offset: '0.00',
          color: `#${item.gradient[0]}`,
        },
        {
          offset: '0.00',
          color: `#${item.gradient[1]}`,
        },
      ]);
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const loadData = () => {
    QuestionService.getListQuestion()
      .then((res) => {
        if (res.data) {

          setListQuestions(res.data.adminQuestions);
        }
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };

  const handleSubmit = (value: any) => {
    const palette1 = rgbToHex(palette[0].color);
    const palette2 = rgbToHex(palette[1].color);
    setIsModalVisible(false);
    if (questionItem) {
      QuestionService.updateQuestion({
        id: questionItem.id,
        content: value.content,
        color: color.substring(1, color.length),
        textColor: textColor.substring(1, textColor.length),
        gradient: [palette1.substring(1, palette1.length), palette2.substring(1, palette2.length)],
      })
        .then(() => {
          message.success('Success!');
        })
        .catch((error) => {
          message.error(error);
        })
        .finally(() => {
          loadData();
          setQuestionItem(null);
        });
    } else {
      QuestionService.createQuestion({
        content: value.content,
        color: color.substring(1, color.length),
        textColor: textColor.substring(1, textColor.length),
        gradient: [palette1.substring(1, palette1.length), palette2.substring(1, palette2.length)],
      })
        .then(() => {
          message.success('Success!');
        })
        .catch((error) => {
          message.error(error);
        })
        .finally(() => {
          loadData();
          setQuestionItem(null);
        });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = (item: Responses.QuestionItem) => {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure about this?',
      okText: 'Oke',
      cancelText: 'Cancel',
      onOk: () => {
        QuestionService.deleteQuestion({
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
      {listQuestions.length ? (
        <Table rowKey="id" dataSource={listQuestions}>
          <Column
            sorter={(a: Responses.QuestionItem, b: Responses.QuestionItem) =>
              a.id.length - b.id.length
            }
            title="ID"
            dataIndex="id"
            key="id"
          />
          <Column
            sorter={(a: Responses.QuestionItem, b: Responses.QuestionItem) =>
              a.content.length - b.content.length
            }
            title="Content"
            dataIndex="content"
            key="content"
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
            title="Text Color"
            dataIndex="textColor"
            key="textColor"
            render={(textColorItem: string) => {
              const colorItem = `#${textColorItem}`;
              return (
                <div
                  className="main-text-color-item"
                  style={{
                    color: colorItem,
                  }}
                >
                  <span className="main-color-text">{colorItem}</span>
                </div>
              );
            }}
          />
          <Column
            title="Gradient"
            dataIndex="gradient"
            key="gradient"
            render={(gradient: string[]) => {
              return (
                <>
                  {gradient.length > 1 ? (
                    <div
                      style={{
                        // background: `-webkit-gradient(#${gradient[0]},#${gradient[1]});`,
                        background: `linear-gradient(to right,#${gradient[0]}, #${gradient[1]})`,
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                      }}
                    >
                      <span className="main-color-text">{`#${gradient[0]}`}</span>
                      <span className="main-color-text">{`#${gradient[1]}`}</span>
                    </div>
                  ) : null}
                </>
              );
            }}
          />
          <Column
            title="Action"
            key="action"
            render={(text: string, item: Responses.QuestionItem) => (
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
        title={questionItem ? 'Update' : 'Add New'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form onFinish={handleSubmit} form={form} layout="vertical">
          <Form.Item
            name="content"
            label="Content"
            tooltip={{ title: 'Question Content?', icon: <InfoCircleOutlined /> }}
            rules={[{ required: true, message: 'Please input Question Content!' }]}
          >
            <Input placeholder="Question Content" />
          </Form.Item>
          <Form.Item label="Color">
            <SketchPicker color={color} onChangeComplete={handleChangeColorComplete} />
          </Form.Item>
          <Form.Item label="Text Color">
            <SketchPicker color={textColor} onChangeComplete={handleChangeTextColorComplete} />
          </Form.Item>
          <Form.Item label="Gradient">
            <GradientPicker
              width={320}
              maxStops={2}
              paletteHeight={32}
              palette={palette}
              onPaletteChange={handleGradientChange}
            >
              <WrappedSketchPicker />
            </GradientPicker>
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default Question;
