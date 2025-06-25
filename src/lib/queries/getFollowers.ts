import { gql } from '@apollo/client'

export const GET_FOLLOWERS = gql`
  query GetFollowers($userId: Int!) {
    getFollowers(userId: $userId) {
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
