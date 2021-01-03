
export namespace Params {
  export interface LoginInput {
    username: string;
    password: string;
  };

  export enum UserStatus {
    enabled = 'enabled',
    disabled = 'disabled',
  }
  export interface DeleteHobby {
    id: string;
  };

  export interface CreateHobby {
    value: string;
    isValid: boolean;
  };

  export interface UpdateHobby {
    id: string;
    value: string;
    isValid: boolean;
  };

  export interface DeleteQuestion {
    id: string;
  };

  export interface CreateQuestion {
    content: string;
    color: string;
    textColor: string;
    gradient?: string[];
  };

  export interface UpdateQuestion {
    id: string;
    content?: string;
    color?: string;
    textColor?: string;
    gradient?: string[];
  };

  export interface DeleteQNA {
    id: string;
  };

  export interface CreateQNA{
    question: string;
    answer: string;
  };

  export interface UpdateQNA {
    id: string;
    question: string;
    answer: string;
  };

  export interface NotificationInput {
    title: string;
    subtitle: string;
    content: string;
    image: File;
  };
}
