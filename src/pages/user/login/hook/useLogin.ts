import { ACCESS_TOKEN } from '@/constant';
import { useAuthContext } from '@/contexts';
import { Params } from '@/services/param';
import { Responses } from '@/services/response';
import { useModel } from 'umi';

export interface LoginAccountFormValue {
  username: string;
  password: string;
  remember: boolean;
  phoneNumber: string;
}

const saveToken = (accessToken: string) => {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
};

export interface UseLoginType {
  loading: {
    submitting: boolean;
  };
  data: {};
  methods: {
    handleLoginAccount: (values: Params.LoginInput) => Promise<any>;
  };
}

export const useLogin = (): UseLoginType => {
  const { authEffect, authEffectLoading } = useAuthContext();
  const { refresh } = useModel('@@initialState');

  const handleLoginAccount = (values: Params.LoginInput) => {
    return authEffect
      ?.login({
        ...values,
      })
      .then((response: any) => {
        // eslint-disable-next-line no-console
        console.log(response);

        if (response) {
          const data = response.data as Responses.LoginOutput;
          saveToken(data.login.token);
          refresh();
        }
        return response;
      });
  };

  return {
    loading: {
      submitting: authEffectLoading.login,
    },
    data: {},
    methods: {
      handleLoginAccount,
    },
  };
};
