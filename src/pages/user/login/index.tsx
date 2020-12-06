import { Params } from '@/services/param';
import { Alert, Checkbox, message } from 'antd';
import React, { useState } from 'react';
import { history } from 'umi';
import LoginFrom from './components/Login';
import { useLogin } from './hook/useLogin';
import styles from './style.less';

const { UserName, Password, Submit } = LoginFrom;

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

const Login: React.FC<{}> = () => {
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState<string>('account');
  const [status, setStatus] = useState<string>('ready');
  const [loginMessage, SetLoginMessage] = useState<string | undefined>(undefined);

  const {
    methods: { handleLoginAccount },
    loading: { submitting },
  } = useLogin();

  const handleSubmit = (values: Params.LoginInput) => {
    handleLoginAccount(values)
      .then((response: any) => {
        if (response) {
          message.success('Login successfully!');
          history.replace('/');
        }
      })
      .catch((error: any) => {
        setStatus('error');
        if (error && error.errors) {
          SetLoginMessage(error.errors.message);
        } else {
          SetLoginMessage('Account or password error (cuppizz.fc)');
        }
      });
  };
  return (
    <div className={styles.main}>
      <LoginFrom activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        <>
          {status === 'error' && loginMessage && !submitting && (
            <LoginMessage content={loginMessage} />
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
              {
                min: 8,
                message: 'Password at least 8 characters! ',
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

export default Login;
