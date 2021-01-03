import { UserTableListItem } from '@/pages/users/data';
import GraphQLClient from '@/utils/GraphQLClient';
import { RequestData } from '@ant-design/pro-table';
import { FetchResult, gql } from '@apollo/client';
import { SortOrder } from 'antd/lib/table/interface';
import { Params } from './param';
import { Responses } from './response';

export class UserService {
  /**
   * @summary get all users
   * @result AddressBookListResponse A JSON of array address book
   * @throws ResponseError
   */
  public static async getListUser(
    params: any & {
      pageSize?: number;
      current?: number;
      keyword?: string;
    },
    sort: {
      [key: string]: SortOrder;
    },
  ): Promise<RequestData<UserTableListItem>> {
    let orderBy: { [x: string]: string } | null = null;
    if (Object.keys(sort).length > 0) {
      const temp = {};
      Object.keys(sort).forEach((key) => {
        temp[key] = sort[key] === 'ascend' ? 'asc' : 'desc';
      });
      orderBy = temp;
    }

    let where: {} | null = null;
    if (Object.keys(params).length > 0) {
      let temp = {};
      let temp2 = Object.create({});
      let index = 0;
      Object.keys(params).forEach((key) => {
        if (!(key === 'pageSize' || key === 'current' || key === 'keyword')) {
          const obj = Object.create({});
          obj[key] = {
            contains: params[key],
          };
          temp2.AND = obj;
          temp2 = obj;
          if (!index) {
            temp = temp2;
          }
          index += 1;
        }
      });
      where = temp;
    }

    const response = await GraphQLClient.query({
      query: gql`
        query GetListUser(
          $take: Int
          $skip: Int
          $orderBy: [UserOrderByInput!]
          $where: UserWhereInput
        ) {
          userCount(where: $where)
          users(take: $take, skip: $skip, orderBy: $orderBy, where: $where) {
            id
            data {
              nickName
              avatar {
                id
                url
                thumbnail
                type
              }
              cover {
                id
                url
                thumbnail
                type
              }
              age
              birthday
              introduction
              gender
              hobbies {
                id
                value
              }
              phoneNumber
              job
              height
              address
              educationLevel
              drinking
              yourKids
              religious
              onlineStatus
              lastOnline
              distance(unit: Mile)
              distancePrefer
              educationLevelsPrefer
              genderPrefer
              lookingFors
              maxHeightPrefer
              userImages {
                createdAt
                id
                image {
                  id
                  thumbnail
                  type
                  url
                }
              }
              theirKids
              maxAgePrefer
              minAgePrefer
              mustHaveFields
              minHeightPrefer
              religiousPrefer
              role {
                canAccessBackOffice
                description
                id
                name
                permissions
              }
              smoking
              statusUpdatedAt
              socialProviders {
                id
                type
              }
              status
            }
            updatedAt
            deletedAt
            createdAt
          }
        }
      `,
      variables: {
        take: params.pageSize,
        skip: params.current - 1,
        orderBy: orderBy ? [orderBy] : [],
        where: where || undefined,
      },
      fetchPolicy: 'no-cache',
    });
    const responseData: Responses.User[] = response.data.users;
    const data: any[] = responseData.map((user) => {
      return {
        id: user.id,
        createdAt: user.createdAt,
        ...user.data,
      };
    });
    return {
      data,
      total: response.data.userCount,
      success: true,
    };
  }

  /**
   * @summary get current user
   * @result AddressBookListResponse A JSON of array address book
   * @throws ResponseError
   */
  public static async getCurrentUser(): Promise<RequestData<Responses.AdminUser>> {
    return GraphQLClient.query({
      query: gql`
        query getCurrentUser {
          me {
            id
            data {
              nickName
              avatar {
                id
                url
                thumbnail
              }
              cover {
                id
                url
                thumbnail
              }
              age
              birthday
              introduction
              gender
              hobbies {
                id
                value
              }
              phoneNumber
              job
              height
              address
              educationLevel
              smoking
              drinking
              yourKids
              religious
              minAgePrefer
              maxAgePrefer
              minHeightPrefer
              maxHeightPrefer
              genderPrefer
              distancePrefer
              friendType {
                status
              }
              onlineStatus
              lastOnline
              settings {
                allowMatching
                isPrivate
                showActive
              }
              socialProviders {
                id
                type
              }
            }
          }
        }
      `,
    });
  }

  /**
   * @summary update status
   * @result AddressBookListResponse A JSON of array address book
   * @throws ResponseError
   */
  public static async updateUserStatus(payload: {
    id: string;
    status: Params.UserStatus;
  }): Promise<FetchResult<any>> {
    const UPDATE_USER_STATUS = gql`
      mutation updateUserStatus($id: ID!, $status: UserStatus!) {
        updateUserStatus(id: $id, status: $status) {
          id
        }
      }
    `;
    return GraphQLClient.mutate({
      mutation: UPDATE_USER_STATUS,
      variables: { id: payload.id, status: payload.status },
    });
  }

  /**
   * @summary count user online
   * @result UserCount A JSON of object user count
   * @throws ResponseError
   */
  public static async getUserOnline(): Promise<FetchResult<Responses.UserCount>> {
    const UPDATE_USER_STATUS = gql`
      query getUserOnline() {
        userCount(where: { onlineStatus: { equals: online } })
      }
    `;
    return GraphQLClient.query({
      query: UPDATE_USER_STATUS,
    });
  }
}
