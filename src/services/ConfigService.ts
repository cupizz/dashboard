import GraphQLClient from '@/utils/GraphQLClient';
import { FetchResult, gql } from '@apollo/client';
import { Responses } from './response';

export class ConfigService {
  /**
   * @summary get list hobby
   * @result SuccessResponse
   * @throws ResponseError
   */
  public static async getListAppConfig(): Promise<FetchResult<Responses.AppConfigListItem>> {
    const query = gql`
      query getListConfigs {
        appConfigs {
          data
          description
          id
          name
        }
      }
    `;
    return GraphQLClient.query({
      query,
      fetchPolicy: 'no-cache',
    });
  }
}
