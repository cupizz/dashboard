import GraphQLClient from '@/utils/GraphQLClient';
import type { RequestData } from '@ant-design/pro-table';
import type { FetchResult } from '@apollo/client';
import { gql } from '@apollo/client';
import type { SortOrder } from 'antd/lib/table/interface';
import type { Responses } from './response';

export class PostService {
  /**
   * @summary get all posts
   * @result A JSON of pagination posts
   * @throws ResponseError
   */
  public static async getListPosts(
    params: any & {
      pageSize?: number;
      current?: number;
      keyword?: string;
    },
    sort: Record<string, SortOrder>,
  ): Promise<RequestData<Responses.PostItemList>> {
    let orderBy: Record<string, string> | null = null;
    if (Object.keys(sort).length > 0) {
      const temp = {};
      Object.keys(sort).forEach((key) => {
        temp[key] = sort[key] === 'ascend' ? 'asc' : 'desc';
      });
      orderBy = temp;
    }

    let where: Record<string, any> | null = null;
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
        query adminPosts(
          $where: PostWhereInput
          $orderBy: [PostOrderByInput!]
          $take: Int
          $skip: Int
        ) {
          adminPostCount(where: $where)
          adminPosts(skip: $skip, take: $take, where: $where, orderBy: $orderBy) {
            category {
              color
              value
              id
            }
            commentCount
            content
            createdAt
            createdBy {
              id
              data {
                nickName
                avatar {
                  thumbnail
                }
              }
            }
            deletedAt
            id
            updatedAt
            likeCount: likeCount(type: like)
            hahaCount: likeCount(type: haha)
            loveCount: likeCount(type: love)
            wowCount: likeCount(type: wow)
            angryCount: likeCount(type: angry)
            sadCount: likeCount(type: sad)
            isMyPost
            images(skip: 0, take: 10) {
              url
              type
              thumbnail
              id
            }
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
    const responseData: Responses.PostItemList[] = response.data.adminPosts;
    return {
      data: responseData,
      total: response.data.adminPostCount,
      success: true,
    };
  }

  /**
   * @summary delete post
   * @result AddressBookListResponse A JSON of array address book
   * @throws ResponseError
   */
  public static async deletePost(payload: { id: number }): Promise<FetchResult<any>> {
    const mutation = gql`
      mutation updateUserStatus(id: Int!) {
        deletePost(id: 10) {
          id
        }
      }
    `;
    return GraphQLClient.mutate({
      mutation,
      variables: { id: payload.id },
    });
  }

  /**
   * @summary delete comment
   * @result AddressBookListResponse A JSON of array address book
   * @throws ResponseError
   */
  public static async deleteComment(payload: { id: string }): Promise<FetchResult<any>> {
    const mutation = gql`
      mutation {
        deleteComment(id: "${payload.id}") {
          id
        }
      }
    `;
    return GraphQLClient.mutate({
      mutation,
      variables: { id: payload.id },
    });
  }

  /**
   * @summary get comments by post id
   * @result List comments of post
   * @throws ResponseError
   */
  public static async getCommentsPost(payload: {
    id: number;
    take: number;
    skip: number;
  }): Promise<Responses.CommentItem[]> {
    const query = gql`
    {
      adminPosts(where: {id: {equals: ${payload.id}}}) {
        comments(take: ${payload.take}, skip: ${payload.skip}) {
          content
          createdAt
          isMyComment
          isIncognito
          index
          id
          createdBy {
            id
            data {
              avatar {
                thumbnail
              }
              nickName
            }
          }
        }
      }
    }
    `;
    const res = await GraphQLClient.query({
      query,
      fetchPolicy: 'no-cache',
    });

    return res.data.adminPosts[0].comments;
  }

  /**
   * @summary get user liked by post id
   * @result List user liked of post
   * @throws ResponseError
   */
  public static async getUserLikedPost(payload: {
    id: number;
    page: number;
  }): Promise<Responses.UserInfo[]> {
    const query = gql`
    {
      adminPosts(where: {id: {equals: ${payload.id}}}) {
        usersLiked(page: ${payload.page}) {
          id
          data {
            avatar {
              thumbnail
            }
            nickName
          }
        }
      }
    }
    `;
    const res = await GraphQLClient.query({
      query,
      fetchPolicy: 'no-cache',
    });

    return res.data.adminPosts[0].usersLiked;
  }
}
