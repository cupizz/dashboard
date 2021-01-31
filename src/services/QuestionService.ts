import GraphQLClient from '@/utils/GraphQLClient';
import type { FetchResult } from '@apollo/client';
import { gql } from '@apollo/client';
import type { Params } from './param';
import type { Responses } from './response';

export class QuestionService {
  /**
   * @summary get list question
   * @result SuccessResponse
   * @throws ResponseError
   */
  public static async getListQuestion(): Promise<FetchResult<Responses.QuestionListItem>> {
    const query = gql`
      query getListQuestions {
        adminQuestions {
          color
          gradient
          id
          textColor
          content
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
   * @param payload Params.CreateQuestion
   * @result SuccessResponse
   * @throws ResponseError
   */
  public static async createQuestion(
    payload: Params.CreateQuestion,
  ): Promise<FetchResult<Responses.SuccessResponse>> {
    const CREATE_HOBBY = gql`
      mutation createQuestion(
        $content: String!
        $color: String!
        $textColor: String!
        $gradient: [String!]!
      ) {
        adminCreateQuestion(
          data: {
            content: $content
            color: $color
            textColor: $textColor
            gradient: { set: $gradient }
          }
        ) {
          color
          content
          gradient
          id
          textColor
        }
      }
    `;
    return GraphQLClient.mutate({
      mutation: CREATE_HOBBY,
      variables: {
        content: payload.content,
        color: payload.color,
        textColor: payload.textColor,
        gradient: payload.gradient,
      },
    });
  }

  /**
   * @summary update question
   * @result SuccessResponse
   * @throws ResponseError
   */
  public static async updateQuestion(
    payload: Params.UpdateQuestion,
  ): Promise<FetchResult<Responses.SuccessResponse>> {
    const UPDATE_HOBBY = gql`
      mutation updateQuestion(
        $id: String
        $content: String!
        $color: String!
        $textColor: String!
        $gradient: [String!]!
      ) {
        adminUpdateQuestion(
          data: {
            content: { set: $content }
            color: { set: $color }
            textColor: { set: $textColor }
            gradient: { set: $gradient }
          }
          where: { id: $id }
        ) {
          id
          color
          content
          gradient
          textColor
        }
      }
    `;
    return GraphQLClient.mutate({
      mutation: UPDATE_HOBBY,
      variables: {
        id: payload.id,
        content: payload.content,
        color: payload.color,
        textColor: payload.textColor,
        gradient: payload.gradient,
      },
    });
  }

  /**
   * @summary delete question
   * @param payload Params.DeleteQuestion
   * @result SuccessResponse
   * @throws ResponseError
   */
  public static async deleteQuestion(
    payload: Params.DeleteQuestion,
  ): Promise<FetchResult<Responses.SuccessResponse>> {
    const DELETE_HOBBY = gql`
      mutation deleteQuestion($id: String) {
        adminDeleteQuestion(where: { id: $id }) {
          color
          id
        }
      }
    `;
    return GraphQLClient.mutate({
      mutation: DELETE_HOBBY,
      variables: { id: payload.id },
    });
  }
}
