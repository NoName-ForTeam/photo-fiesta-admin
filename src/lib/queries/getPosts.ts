import { gql } from '@apollo/client'

export const GET_POSTS = gql`
  query GetPosts(
    $endCursorPostId: Int
    $searchTerm: String
    $pageSize: Int = 12
    $sortBy: String = "createdAt"
    $sortDirection: SortDirection = desc
  ) {
    getPosts(
      endCursorPostId: $endCursorPostId
      searchTerm: $searchTerm
      pageSize: $pageSize
      sortBy: $sortBy
      sortDirection: $sortDirection
    ) {
      items {
        id
        images {
          id
          url
          width
          height
        }
      }
      page
      pageSize
      totalCount
      pagesCount
    }
  }
`
