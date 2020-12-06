export namespace Params {
  export type LoginInput = {
    username: string;
    password: string;
  };

  export enum UserStatus {
    enabled = 'enabled',
    disabled = 'disabled',
  }
}
