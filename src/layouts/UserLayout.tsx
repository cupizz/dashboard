import { ConnectState } from '@/models/connect';
import { getMenuData, getPageTitle, MenuDataItem } from '@ant-design/pro-layout';
import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { connect, ConnectProps, FormattedMessage, Link, SelectLang, useIntl } from 'umi';
import logo from '../assets/logo.svg';
import BaseLayout from './BaseLayout';
import styles from './UserLayout.less';

export interface UserLayoutProps extends Partial<ConnectProps> {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
}

const UserLayout: React.FC<UserLayoutProps> = (props) => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { formatMessage } = useIntl();
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  });
  return (
    <BaseLayout>
      <HelmetProvider>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={title} />
        </Helmet>

        <div className={styles.container}>
          <div className={styles.lang}>
            <SelectLang />
          </div>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <img alt="logo" className={styles.logo} src={logo} />
                  <span className={styles.title}>Ant Design</span>
                </Link>
              </div>
              <div className={styles.desc}>
                <FormattedMessage
                  id="pages.layouts.userLayout.title"
                  defaultMessage="Ant Design is the most influential Web design specification in Xihu District"
                />
              </div>
            </div>
            {children}
          </div>
          {/* <DefaultFooter /> */}
        </div>
      </HelmetProvider>
    </BaseLayout>
  );
};

export default connect(({ settings }: ConnectState) => ({ ...settings }))(UserLayout);
