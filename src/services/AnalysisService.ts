import GraphQLClient from '@/utils/GraphQLClient';
import type { FetchResult } from '@apollo/client';
import { gql } from '@apollo/client';
import type { Responses } from './response';

export class AnalysisService {
  /**
   * @summary get top like count
   * @result SuccessResponse
   * @throws ResponseError
   */
  public static async getTopLikeCount(): Promise<FetchResult<Responses.UserLikeCountListItem>> {
    const query = gql`
      query getTopLikeCount($take: Int) {
        users(orderBy: { likeCount: desc }, take: $take) {
          id
          data {
            nickName
            likeCount
          }
        }
      }
    `;
    return GraphQLClient.query({
      query,
      fetchPolicy: 'no-cache',
      variables: {
        take: 20,
      },
    });
  }

  /**
   * @summary get top dislike count
   * @result SuccessResponse
   * @throws ResponseError
   */
  public static async getTopDislikeCount(): Promise<FetchResult<Responses.UserLikeCountListItem>> {
    const query = gql`
      query getTopDislikeCount($take: Int) {
        users(orderBy: { dislikeCount: desc }, take: $take) {
          id
          data {
            nickName
            dislikeCount
          }
        }
      }
    `;
    return GraphQLClient.query({
      query,
      fetchPolicy: 'no-cache',
      variables: {
        take: 20,
      },
    });
  }
}
