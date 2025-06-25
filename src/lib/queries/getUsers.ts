import { gql } from '@apollo/client'

export const GET_USERS = gql`
  query GetUsers(
    $pageSize: Int = 10
    $pageNumber: Int = 1
    $sortBy: String = "createdAt"
    $sortDirection: SortDirection = desc
    $searchTerm: String
    $statusFilter: UserBlockStatus = ALL
  ) {
    getUsers(
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
      searchTerm: $searchTerm
      statusFilter: $statusFilter
    ) {
      users {
        id
        userName
        email
        createdAt
        profile {
          id
          userName
          firstName
          lastName
          city
          country
          region
          dateOfBirth
          aboutMe
          createdAt
          avatars {
            url
            width
            height
            fileSize
          }
        }
        userBan {
          reason
          createdAt
        }
      }
      pagination {
        pagesCount
        page
        pageSize
        totalCount
      }
    }
  }
`
