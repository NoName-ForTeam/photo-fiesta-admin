import { gql } from '@apollo/client'

export const GET_POSTS_BY_USER = gql`
  query GetPostsByUser($userId: Int!, $endCursorId: Int) {
    getPostsByUser(userId: $userId, endCursorId: $endCursorId) {
      pagesCount
      pageSize
      totalCount
      items {
        id
        url
        width
        height
        fileSize
        createdAt
      }
    }
  }
`
