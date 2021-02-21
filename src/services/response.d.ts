export namespace Responses {
  export type SuccessResponse<T = any> = {
    code?: number;
    message?: string;
    data?: T;
  };

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

  export type User = {
    id: string;
    data: UserDataList;
    createdAt: string;
  };

  export type UserDataList = {
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
  };

  export type Avatar = {
    id: string;
    url: string;
    thumbnail: string;
    type: string;
  };

  export type Cover = {
    id: string;
    url: string;
    thumbnail: string;
    type: string;
  };

  export type Hobby = {
    id: string;
    value: string;
  };

  export type UserImage = {
    createdAt: string;
    id: string;
    image: Image;
  };

  export type Image = {
    id: string;
    thumbnail: string;
    type: string;
    url: string;
  };

  export type Role = {
    canAccessBackOffice: boolean;
    description: string;
    id: string;
    name: string;
    permissions: string[];
  };

  export type SocialProvider = {
    id: string;
    type: string;
  };

  export type UserCount = {
    userCount: number;
  };
  export type HobbyListItem = {
    hobbies: HobbyItem[];
  };

  export type HobbyItem = {
    id: string;
    value: string;
    isValid: boolean;
  };

  export type QuestionListItem = {
    adminQuestions: QuestionItem[];
  };

  export type QuestionItem = {
    id: string;
    content: string;
    color: string;
    textColor: string;
    gradient: string[];
  };

  export type QNAListItem = {
    qnAs: QNAItem[];
  };

  export type QNAItem = {
    id: string;
    question: string;
    answer: string;
  };

  export type AppConfigItem = {
    data: any;
    description: string;
    id: string;
    name: string;
  };
  export type AppConfigListItem = {
    appConfigs: AppConfigItem[];
  };

  export type UserLikeCountListItem = {
    users: UserLikeCount[];
  };

  export type UserLikeCount = {
    id: string;
    data: {
      nickName: string;
      likeCount: number;
    };
  };

  export type UserDislikeCountListItem = {
    users: UserDislikeCount[];
  };

  export type UserDislikeCount = {
    id: string;
    data: {
      nickName: string;
      dislikeCount: number;
    };
  };

  export type DataReportGoogleAnalyticResponse = {
    metricHeaders?: MetricHeadersEntity[] | null;
    rows: RowsEntity[];
    metadata: Metadata;
    dimensionHeaders?: DimensionHeadersEntity[] | null;
    rowCount: number;
  };
  export type MetricHeadersEntity = {
    name: string;
    type: string;
  };
  export type RowsEntity = {
    dimensionValues: DimensionValuesEntityOrMetricValuesEntity[];
    metricValues: DimensionValuesEntityOrMetricValuesEntity[];
  };
  export type DimensionValuesEntityOrMetricValuesEntity = {
    value: string;
  };
  export type Metadata = {};
  export type DimensionHeadersEntity = {
    name: string;
  };

  export type PostCategoryListItem = {
    postCategories: PostCategoryItem[];
  };

  export type PostCategoryItem = {
    id: string;
    value: string;
    color: string;
  };

  export type PostItemList = {
    category: PostCategoryItem;
    commentCount: number;
    content: string;
    createdAt: Date;
    createdBy: UserInfo;
    deletedAt?: any;
    id: number;
    updatedAt: Date;
    likeCount: number;
    isMyPost: boolean;
    images: Image[];
  };

  export type UserInfo = {
    id: string;
    data: {
      nickName: string;
      avatar: {
        thumbnail: string;
      };
    };
  };

  export type PostItem = {
    category: PostCategoryItem;
    commentCount: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    createdBy: UserInfo;
    deletedAt: string;
    id: number;
    updatedAt: string;
    likeCount: number;
    isMyPost: boolean;
    comments: Comment[];
    usersLiked: UserInfo[];
    myLikedPostType: any;
  };

  export type CommentItem = {
    content: string;
    createdAt: string;
    isMyComment: boolean;
    isIncognito: boolean;
    index: number;
    id: string;
    createdBy: UserInfo;
  };
}
