export namespace Responses {
  export interface SuccessResponse<T = any> {
    code?: number;
    message?: string;
    data?: T;
  }

  export type UserData = {
    role: Role;
  };
  export type AdminUser = {
    data: UserData;
    id: string;
  };
  export type LoginOutput = {
    login: {
      info: AdminUser;
      token: string;
    };
  };

  export enum UserStatus {
    enabled = 'enabled',
    disabled = 'disabled',
  }

  export enum OnlineStatus {
    online = 'online',
    away = 'away',
    offline = 'offline',
  }

  export interface User {
    id: string;
    data: UserDataList;
    createdAt: string;
  }

  export interface UserDataList {
    nickName: string;
    avatar: Avatar;
    cover: Cover;
    age: number;
    birthday: string;
    introduction: string;
    gender: string;
    hobbies: Hobby[];
    phoneNumber: string;
    job: string;
    height: number;
    address?: string;
    educationLevel: any;
    drinking: any;
    yourKids: any;
    religious: any;
    onlineStatus?: OnlineStatus;
    lastOnline?: string;
    distance: string;
    distancePrefer: number;
    educationLevelsPrefer: any[];
    genderPrefer: string[];
    lookingFors: any[];
    maxHeightPrefer: number;
    userImages: UserImage[];
    theirKids: any;
    maxAgePrefer: number;
    minAgePrefer: number;
    mustHaveFields: string[];
    minHeightPrefer: number;
    religiousPrefer: any[];
    role: Role;
    smoking: any;
    statusUpdatedAt: string;
    socialProviders: SocialProvider[];
    status: UserStatus;
  }

  export interface Avatar {
    id: string;
    url: string;
    thumbnail: string;
    type: string;
  }

  export interface Cover {
    id: string;
    url: string;
    thumbnail: string;
    type: string;
  }

  export interface Hobby {
    id: string;
    value: string;
  }

  export interface UserImage {
    createdAt: string;
    id: string;
    image: Image;
  }

  export interface Image {
    id: string;
    thumbnail: string;
    type: string;
    url: string;
  }

  export interface Role {
    canAccessBackOffice: boolean;
    description: string;
    id: string;
    name: string;
    permissions: string[];
  }

  export interface SocialProvider {
    id: string;
    type: string;
  }

  export interface UserCount {
    data: {
      userCount: number;
    };
  }
  export interface HobbyListItem {
    hobbies: HobbyItem[];
  }

  export interface HobbyItem {
    id: string;
    value: string;
    isValid: boolean;
  }

  export interface QuestionListItem {
    adminQuestions: QuestionItem[];
  }

  export interface QuestionItem {
    id: string;
    content: string;
    color: string;
    textColor: string;
    gradient: string[];
  }

  export interface QNAListItem {
    qnAs: QNAItem[];
  }

  export interface QNAItem {
    id: string;
    question: string;
    answer: string;
  }

  export interface AppConfigItem {
    data: any;
    description: string;
    id: string;
    name: string;
  }
  export interface AppConfigListItem {
    appConfigs: AppConfigItem[];
  }
}
