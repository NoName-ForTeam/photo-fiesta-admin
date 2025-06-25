import { gql } from '@apollo/client'

export const GET_PAYMENTS_BY_USER = gql`
  query GetPaymentsByUser(
    $userId: Int!
    $pageSize: Int = 10
    $pageNumber: Int = 1
    $sortBy: String = "createdAt"
    $sortDirection: SortDirection = desc
  ) {
    getPaymentsByUser(
      userId: $userId
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
    ) {
      page
      pageSize
      pagesCount
      totalCount
      items {
        id
        businessAccountId
        status
        dateOfPayment
        startDate
        endDate
        type
        price
        paymentType
        payments {
          id
          userId
          paymentMethod
          amount
          currency
          createdAt
          endDate
        }
      }
    }
  }
`
