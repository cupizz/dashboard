import GraphQLClient from '@/utils/GraphQLClient';
import { gql } from '@apollo/client';

export class UserService {
  /**
   * @summary get all users
   * @result AddressBookListResponse A JSON of array address book
   * @throws ResponseError
   */
  public static async getListUser(): Promise<any> {
    return GraphQLClient.query({
      query: gql`
        query GetRates {
          rates(currency: "USD") {
            currency
          }
        }
      `,
    });
  }

  /**
   * @summary get current user
   * @result AddressBookListResponse A JSON of array address book
   * @throws ResponseError
   */
  public static async getCurrentUser(): Promise<any> {
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
              lookingFor
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
}
