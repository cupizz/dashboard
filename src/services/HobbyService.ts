import GraphQLClient from '@/utils/GraphQLClient';
import { FetchResult, gql } from '@apollo/client';
import { Params } from './param';
import { Responses } from './response';

export class HobbyService {
  /**
   * @summary get list hobby
   * @result SuccessResponse
   * @throws ResponseError
   */
  public static async getListHobby(): Promise<FetchResult<Responses.HobbyListItem>> {
    const query = gql`
      query getListHobbies {
        hobbies {
          id
          value
          isValid
        }
      }
    `;
    return GraphQLClient.query({
      query,
      fetchPolicy: 'no-cache',
    });
  }

  /**
   * @summary create hobby
   * @param payload Params.CreateHobby
   * @result SuccessResponse
   * @throws ResponseError
   */
  public static async createHobby(
    payload: Params.CreateHobby,
  ): Promise<FetchResult<Responses.SuccessResponse>> {
    const CREATE_HOBBY = gql`
      mutation createHobby($value: String!, $isValid: Boolean!) {
        adminCreateHobby(data: { value: $value, isValid: $isValid }) {
          id
          value
        }
      }
    `;
    return GraphQLClient.mutate({
      mutation: CREATE_HOBBY,
      variables: { value: payload.value, isValid: payload.isValid },
    });
  }

  /**
   * @summary update hobby
   * @result SuccessResponse
   * @throws ResponseError
   */
  public static async updateHobby(
    payload: Params.UpdateHobby,
  ): Promise<FetchResult<Responses.SuccessResponse>> {
    const UPDATE_HOBBY = gql`
      mutation updateHobby($id: String, $value: String, $isValid: Boolean) {
        adminUpdateHobby(
          data: { value: { set: $value }, isValid: { set: $isValid } }
          where: { id: $id }
        ) {
          id
          value
        }
      }
    `;
    return GraphQLClient.mutate({
      mutation: UPDATE_HOBBY,
      variables: { id: payload.id, value: payload.value, isValid: payload.isValid },
    });
  }

  /**
   * @summary delete hobby
   * @param payload Params.DeleteHobby
   * @result SuccessResponse
   * @throws ResponseError
   */
  public static async deleteHobby(
    payload: Params.DeleteHobby,
  ): Promise<FetchResult<Responses.SuccessResponse>> {
    const DELETE_HOBBY = gql`
      mutation deleteHobby($id: String) {
        adminDeleteHobby(where: { id: $id }) {
          id
          value
        }
      }
    `;
    return GraphQLClient.mutate({
      mutation: DELETE_HOBBY,
      variables: { id: payload.id },
    });
  }
}
