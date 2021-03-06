import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Select, Upload } from 'antd';
import React from 'react';
import { connect, FormattedMessage, useIntl } from 'umi';
import { CurrentUser } from '../data.d';
import styles from './BaseView.less';
import GeographicView from './GeographicView';
import PhoneView from './PhoneView';

const { Option } = Select;

// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar }: { avatar: string }) => (
  <>
    <div className={styles.avatar_title}>
      <FormattedMessage id="accountandsettings.basic.avatar" defaultMessage="Avatar" />
    </div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload showUploadList={false}>
      <div className={styles.button_view}>
        <Button>
          <UploadOutlined />
          <FormattedMessage
            id="accountandsettings.basic.change-avatar"
            defaultMessage="Change avatar"
          />
        </Button>
      </div>
    </Upload>
  </>
);
interface SelectItem {
  label: string;
  key: string;
}

const validatorGeographic = (
  _: any,
  value: {
    province: SelectItem;
    city: SelectItem;
  },
  callback: (message?: string) => void,
) => {
  const { province, city } = value;
  if (!province.key) {
    callback('Please input your province!');
  }
  if (!city.key) {
    callback('Please input your city!');
  }
  callback();
};

const validatorPhone = (rule: any, value: string, callback: (message?: string) => void) => {
  const values = value.split('-');
  if (!values[0]) {
    callback('Please input your area code!');
  }
  if (!values[1]) {
    callback('Please input your phone number!');
  }
  callback();
};

interface BaseViewProps {
  currentUser?: CurrentUser;
}

const BaseView: React.FC<BaseViewProps> = ({ currentUser }) => {
  const { formatMessage } = useIntl();

  const getAvatarURL = () => {
    if (currentUser) {
      if (currentUser.avatar) {
        return currentUser.avatar;
      }
      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }
    return '';
  };

  const handleFinish = () => {
    message.success(formatMessage({ id: 'accountandsettings.basic.update.success' }));
  };

  return (
    <div className={styles.baseView}>
      <div className={styles.left}>
        <Form
          layout="vertical"
          onFinish={handleFinish}
          initialValues={currentUser}
          hideRequiredMark
        >
          <Form.Item
            name="email"
            label={formatMessage({ id: 'accountandsettings.basic.email' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'accountandsettings.basic.email-message' }, {}),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label={formatMessage({ id: 'accountandsettings.basic.nickname' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'accountandsettings.basic.nickname-message' }, {}),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="profile"
            label={formatMessage({ id: 'accountandsettings.basic.profile' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'accountandsettings.basic.profile-message' }, {}),
              },
            ]}
          >
            <Input.TextArea
              placeholder={formatMessage({ id: 'accountandsettings.basic.profile-placeholder' })}
              rows={4}
            />
          </Form.Item>
          <Form.Item
            name="country"
            label={formatMessage({ id: 'accountandsettings.basic.country' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'accountandsettings.basic.country-message' }, {}),
              },
            ]}
          >
            <Select style={{ maxWidth: 220 }}>
              <Option value="China">中国</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="geographic"
            label={formatMessage({ id: 'accountandsettings.basic.geographic' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'accountandsettings.basic.geographic-message' }, {}),
              },
              {
                validator: validatorGeographic,
              },
            ]}
          >
            <GeographicView />
          </Form.Item>
          <Form.Item
            name="address"
            label={formatMessage({ id: 'accountandsettings.basic.address' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'accountandsettings.basic.address-message' }, {}),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label={formatMessage({ id: 'accountandsettings.basic.phone' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'accountandsettings.basic.phone-message' }, {}),
              },
              { validator: validatorPhone },
            ]}
          >
            <PhoneView />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              <FormattedMessage
                id="accountandsettings.basic.update"
                defaultMessage="Update Information"
              />
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className={styles.right}>
        <AvatarView avatar={getAvatarURL()} />
      </div>
    </div>
  );
};

export default connect(
  ({ accountAndsettings }: { accountAndsettings: { currentUser: CurrentUser } }) => ({
    currentUser: accountAndsettings.currentUser,
  }),
)(BaseView);
