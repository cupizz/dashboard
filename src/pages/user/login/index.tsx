import { ACCESS_TOKEN } from '@/constant';
import { Params } from '@/services/param';
import { Responses } from '@/services/response';
import { Alert, Checkbox, message } from 'antd';
import React, { useState } from 'react';
import { AuthenticationStateType, connect, Dispatch, history, useModel } from 'umi';
import LoginFrom from './components/Login';
import styles from './style.less';

const { UserName, Password, Submit } = LoginFrom;
interface LoginProps {
  dispatch: Dispatch;
  authentication: AuthenticationStateType;
  submitting?: boolean;
}

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);
const saveToken = (accessToken: string) => {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
};
const Login: React.FC<LoginProps> = (props) => {
  const { authentication = {}, submitting } = props;
  const { status, type: loginType } = authentication;
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState<string>('account');

  const { refresh } = useModel('@@initialState');

  const handleSubmit = (values: Params.LoginInput) => {
    const { dispatch } = props;
    dispatch({
      type: 'authentication/login',
      payload: {
        ...values,
      },
    }).then((response: any) => {
      // eslint-disable-next-line no-console
      console.log(response);

      if (response) {
        const data = response.data as Responses.LoginOutput;
        saveToken(data.login.token);
        refresh();

        message.success('Login successfully!');

        history.replace('/');
      }
    });
  };
  return (
    <div className={styles.main}>
      <LoginFrom activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        <>
          {status === 'error' && loginType === 'account' && !submitting && (
            <LoginMessage content="Account or password error (admin/ant.design)" />
          )}

          <UserName
            name="username"
            type="email"
            placeholder="Email"
            rules={[
              {
                required: true,
                message: 'Please enter your email!',
              },
            ]}
          />
          <Password
            name="password"
            placeholder="Password"
            rules={[
              {
                required: true,
                message: 'Please enter your password! ',
              },
            ]}
          />
        </>

        <div>
          <Checkbox checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)}>
            automatic log-in
          </Checkbox>
          <a
            style={{
              float: 'right',
            }}
          >
            forget password
          </a>
        </div>
        <Submit loading={submitting}>Log in</Submit>
      </LoginFrom>
    </div>
  );
};

export default connect(
  ({
    authentication,
    loading,
  }: {
    authentication: AuthenticationStateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    authentication,
    submitting: loading.effects['authentication/login'],
  }),
)(Login);
