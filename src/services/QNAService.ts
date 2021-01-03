import GraphQLClient from '@/utils/GraphQLClient';
import { FetchResult, gql } from '@apollo/client';
import { Params } from './param';
import { Responses } from './response';

export class QNAService {
  /**
   * @summary get list hobby
   * @result SuccessResponse
   * @throws ResponseError
   */
  public static async getListQNA(): Promise<FetchResult<Responses.QNAListItem>> {
    const query = gql`
      query getQNAs {
        qnAs {
          id
          question
          answer
        }
      }
    `;
    return GraphQLClient.query({
      query,
      fetchPolicy: "no-cache"
    });
  }

  /**
   * @summary create hobby
   * @param payload Params.CreateQNA
   * @result SuccessResponse
   * @throws ResponseError
   */
  public static async createQNA(
    payload: Params.CreateQNA,
  ): Promise<FetchResult<Responses.SuccessResponse>> {
    const mutation = gql`
      mutation createQNA($question: String!, $answer: String!) {
        adminCreateQnA(data: {question: $question, answer: $answer}) {
          id
          answer
          question
        }
      }
    `;
    return GraphQLClient.mutate({
      mutation,
      variables: { question: payload.question, answer: payload.answer },
    });
  }

  /**
   * @summary update hobby
   * @result SuccessResponse
   * @throws ResponseError
   */
  public static async updateQNA(
    payload: Params.UpdateQNA,
  ): Promise<FetchResult<Responses.SuccessResponse>> {
    const mutation = gql`
      mutation updateQNA($id: String, $question: String, $answer: Boolean) {
        adminUpdateQnA(data: {question: {set: $question}, answer: {set: $answer}}, where: {id: $id}) {
          id
          answer
          question
        }
      }
    `;
    return GraphQLClient.mutate({
      mutation,
      variables: { id: payload.id, question: payload.question, answer: payload.answer },
    });
  }

  /**
   * @summary delete hobby
   * @param payload Params.DeleteQNA
   * @result SuccessResponse
   * @throws ResponseError
   */
  public static async deleteQNA(
    payload: Params.DeleteQNA,
  ): Promise<FetchResult<Responses.SuccessResponse>> {
    const mutation = gql`
      mutation deleteQNA($id: String) {
        adminDeleteQnA(where: {id: $id}) {
          id
          question
          answer
        }
      }
    `;
    return GraphQLClient.mutate({
      mutation,
      variables: { id: payload.id },
    });
  }
}
