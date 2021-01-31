import GraphQLClient from '@/utils/GraphQLClient';
import type { FetchResult } from '@apollo/client';
import { gql } from '@apollo/client';
import type { Params } from './param';
import type { Responses } from './response';

export class AuthenticateService {
  /**
   * @summary login
   * @param input Params.LoginInput
   * @result LoginSuccessResponse Login successfully
   * @throws ResponseError
   */
  public static async postAuthLogin(
    input: Params.LoginInput,
  ): Promise<FetchResult<Responses.LoginOutput>> {
    const AUTH_LOGIN = gql`
      mutation login($username: String, $password: String) {
        login(email: $username, password: $password) {
          token
          info {
            id
            data {
              role {
                canAccessBackOffice
              }
            }
          }
        }
      }
    `;
    return GraphQLClient.mutate({
      mutation: AUTH_LOGIN,
      variables: { username: input.username, password: input.password },
    });
  }
}
