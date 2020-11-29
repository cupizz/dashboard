export namespace Responses {
  export type Role = {
    canAccessBackOffice: boolean;
  };
  export type UserData = {
    role: Role;
  };
  export type User = {
    data: UserData;
    id: string;
  };
  export type LoginOutput = {
    login: {
      info: User;
      token: string;
    };
  };
}
