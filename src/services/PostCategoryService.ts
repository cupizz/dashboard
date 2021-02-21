import GraphQLClient from '@/utils/GraphQLClient';
import type { FetchResult } from '@apollo/client';
import { gql } from '@apollo/client';
import type { Params } from './param';
import type { Responses } from './response';

export class PostCategoryService {
  /**
   * @summary get list question
   * @result SuccessResponse
   * @throws ResponseError
   */
  public static async getListPostCategory(): Promise<FetchResult<Responses.PostCategoryListItem>> {
    const query = gql`
      query getListPostCategories {
        postCategories {
          value
          id
          color
        }
      }
    `;
    return GraphQLClient.query({
      query,
      fetchPolicy: 'no-cache',
    });
  }

  /**
   * @summary create question
   * @param payload Params.CreatePostCategory
   * @result SuccessResponse
   * @throws ResponseError
   */
  public static async createPostCategory(
    payload: Params.CreatePostCategory,
  ): Promise<FetchResult<Responses.SuccessResponse>> {
    const mutation = gql`
      mutation createPostCategory($value: String!, $color: String = "ffffff") {
        createPostCategory(value: $value, color: $color) {
          color
          id
          value
        }
      }
    `;
    return GraphQLClient.mutate({
      mutation,
      variables: {
        value: payload.value,
        color: payload.color,
      },
    });
  }

  /**
   * @summary update question
   * @result SuccessResponse
   * @throws ResponseError
   */
  public static async updatePostCategory(
    payload: Params.UpdatePostCategory,
  ): Promise<FetchResult<Responses.SuccessResponse>> {
    const UPDATE_HOBBY = gql`
      mutation updatePostCategory($id: String!, $value: String, $color: String) {
        updatePostCategory(id: $id, value: $value, color: $color) {
          color
          id
          value
        }
      }
    `;
    return GraphQLClient.mutate({
      mutation: UPDATE_HOBBY,
      variables: {
        id: payload.id,
        value: payload.value,
        color: payload.color,
      },
    });
  }
}
