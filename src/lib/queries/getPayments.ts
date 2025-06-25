import { gql } from '@apollo/client'

export const GET_PAYMENTS = gql`
  query GetPayments(
    $pageSize: Int
    $pageNumber: Int
    $sortBy: String
    $sortDirection: SortDirection
    $searchTerm: String
  ) {
    getPayments(
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
      searchTerm: $searchTerm
    ) {
      pagesCount
      page
      pageSize
      totalCount
      items {
        id
        userId
        userName
        paymentMethod
        amount
        currency
        createdAt
        endDate
        type
        avatars {
          url
          width
          height
          fileSize
        }
      }
    }
  }
`
