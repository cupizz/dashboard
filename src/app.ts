import { history } from 'umi';
import defaultSettings, { DefaultSettings } from '../config/defaultSettings';
import { UserService } from './services';

export async function getInitialState(): Promise<{
  currentUser?: any;
  accessToken?: string;
  settings: DefaultSettings;
}> {
  // If it is a login page, do not execute
  if (history.location.pathname !== '/user/login') {
    try {
      const currentUser = await UserService.getCurrentUser();

      return {
        currentUser,
        settings: defaultSettings,
      };
    } catch (error) {
      history.push('/user/login');
    }
  }
  return {
    settings: defaultSettings,
  };
}
