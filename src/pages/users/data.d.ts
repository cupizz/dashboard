export interface Avatar {
  id: string;
  url: string;
  thumbnail: string;
}

export interface Cover {
  id: string;
  url: string;
  thumbnail: string;
}

export interface Hobby {
  id: string;
  value: string;
}

export interface SocialProvider {
  id: string;
  type: string;
}

export interface UserTableListItem {
  id: string;
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

export enum UserStatus {
  enabled = 'enabled',
  disabled = 'disabled',
}

export enum OnlineStatus {
  online = 'online',
  away = 'away',
  offline = 'offline',
}

export interface UserTableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface UserTableListData {
  list: UserTableListItem[];
  pagination: Partial<UserTableListPagination>;
}

export interface UserTableListParams {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
