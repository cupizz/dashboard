import GraphQLClient from '@/utils/GraphQLClient';
import { FetchResult, gql } from '@apollo/client';
import { Params } from './param';

export class NotificationService {
  /**
   * @summary push notification for user
   * @param input Params.NotificationInput
   * @result SuccessResponse successfully
   * @throws ResponseError
   */
  public static async postNotification(
    input: Params.NotificationInput,
  ): Promise<FetchResult<any>> {
    const mutation = gql`
      mutation adminSendNotification($title: String!, $subtitle: String, $content: String!, $image: Upload) {
        adminSendNotification(
          userIds: []
          title: $title
          subtitle: $subtitle
          content: $content
          image: $image
        )
      }
    `;
    return GraphQLClient.mutate({
      mutation,
      variables: { ...input },
    });
  }
}
