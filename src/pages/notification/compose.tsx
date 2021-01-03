import { NotificationService } from '@/services';
import { beforeUpload, getBase64 } from '@/utils/Upload';
import { LoadingOutlined, PieChartOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Menu, message, Row } from 'antd';
import React, { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './compose.less';

const { TextArea } = Input;

const Compose = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [content, setContent] = useState('');
  const inputEl = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    // Assuming only image
    if (!event.target.files) {
      return;
    }
    const file = event.target.files[0];

    const check = beforeUpload(file);
    if (!check) return;
    setImageFile(file);
    getBase64(file, (imageData) => {
      if (imageData) {
        setImage(imageData);
        setLoading(false);
      }
    });
  };
  const uploadButton = (
    <div className={styles['wrapper-btn-upload']}>
      <div
        className={styles['btn-upload-image']}
        onClick={() => {
          if (inputEl) {
            inputEl.current?.click();
          }
        }}
      >
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    </div>
  );

  const handleSubmit = (values: any) => {
    console.log(imageFile);

    NotificationService.postNotification({
      ...values,
      image: imageFile,
      content,
    })
      .then(() => {
        message.success('Thành công');
      })
      .catch(() => {
        message.error('Thất bại!!!');
      });
  };
  return (
    <Row>
      <Col span={6}>
        <Card bordered={false}>
          <div className={styles['wrapper-btn-compose']}>
            <Button className={styles['btn-compose']} shape="round">
              Compose
            </Button>
          </div>
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
            inlineCollapsed={false}
          >
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Sent
            </Menu.Item>
          </Menu>
        </Card>
      </Col>
      <Col span={18}>
        <Card bordered={false}>
          <Form name="basic" onFinish={handleSubmit}>
            {/* <Form.Item
              name="to"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input placeholder="To" />
            </Form.Item> */}

            <Form.Item
              name="title"
              rules={[{ required: true, message: 'Please input your title!' }]}
            >
              <Input placeholder="Title" />
            </Form.Item>
            {image ? (
              <img src={`${image}`} alt="avatar" className={styles['image-preview']} />
            ) : (
              uploadButton
            )}
            <input hidden ref={inputEl} type="file" accept="image/*" onChange={handleImageChange} />
            <Form.Item
              name="subtitle"
              rules={[{ required: true, message: 'Please input your subtitle!' }]}
            >
              <TextArea placeholder="Subtitle" rows={4} />
            </Form.Item>
            <Form.Item>
              <ReactQuill value={content} onChange={setContent} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Send
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Compose;
