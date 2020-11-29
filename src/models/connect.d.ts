import { MenuDataItem, Settings as ProSettings } from '@ant-design/pro-layout';
import { AuthenticationStateType } from './authentication';
import { GlobalModelState } from './global';
import { UserModelState } from './user';

export { GlobalModelState, UserModelState };

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    login?: boolean;
  };
}

export interface ConnectState {
  global: GlobalModelState;
  loading: Loading;
  settings: ProSettings;
  user: UserModelState;
  login: AuthenticationStateType;
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}