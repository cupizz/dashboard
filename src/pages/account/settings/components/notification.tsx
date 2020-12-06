import { List, Switch } from 'antd';
import React, { Fragment } from 'react';
import { useIntl } from 'umi';

type Unpacked<T> = T extends (infer U)[] ? U : T;

const NotificationView: React.FC<{}> = () => {
  const { formatMessage } = useIntl();
  const getData = () => {
    const Action = (
      <Switch
        checkedChildren={formatMessage({ id: 'accountandsettings.settings.open' })}
        unCheckedChildren={formatMessage({ id: 'accountandsettings.settings.close' })}
        defaultChecked
      />
    );
    return [
      {
        title: formatMessage({ id: 'accountandsettings.notification.password' }, {}),
        description: formatMessage(
          { id: 'accountandsettings.notification.password-description' },
          {},
        ),
        actions: [Action],
      },
      {
        title: formatMessage({ id: 'accountandsettings.notification.messages' }, {}),
        description: formatMessage(
          { id: 'accountandsettings.notification.messages-description' },
          {},
        ),
        actions: [Action],
      },
      {
        title: formatMessage({ id: 'accountandsettings.notification.todo' }, {}),
        description: formatMessage({ id: 'accountandsettings.notification.todo-description' }, {}),
        actions: [Action],
      },
    ];
  };
  const data = getData();
  return (
    <Fragment>
      <List<Unpacked<typeof data>>
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    </Fragment>
  );
};

export default NotificationView;
