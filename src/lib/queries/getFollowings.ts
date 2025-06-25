import { gql } from '@apollo/client'

export const GET_FOLLOWING = gql`
  query GetFollowing($userId: Int!) {
    getFollowing(userId: $userId) {
      items {
        id
        userId
        userName
        firstName
        lastName
        createdAt
      }
      pagesCount
      page
      pageSize
      totalCount
    }
  }
`
