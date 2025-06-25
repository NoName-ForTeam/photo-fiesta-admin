'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_PAYMENTS } from '@/lib/queries/getPayments'
import {
  TableWrapper,
  TableHead,
  TableHeadRow,
  TableHeadCell,
  TableBody,
  TableBodyRow,
  TableBodyCell,
} from '@/components/ui/table'
import { Avatar } from '@/components/ui/avatar'
import { PaymentsResponse } from '@/shared/types'
import { SearchInput } from '@/components/ui/searchInput/SearchInput'
import { PageSizeOption, TablePagination } from '@/components/ui/tablePagination/tablePagination'

export default function PaymentsList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(8)

  const pageSizeOptions: PageSizeOption[] = [8, 15, 30, 50].map(n => ({
    id: n,
    value: String(n),
    title: String(n),
  }))

  const { data, loading, error, refetch } = useQuery<PaymentsResponse>(GET_PAYMENTS, {
    variables: {
      pageSize,
      pageNumber: page,
      sortBy: 'createdAt',
      sortDirection: 'desc',
      searchTerm: searchTerm.trim() === '' ? null : searchTerm.trim(),
    },
    fetchPolicy: 'cache-and-network',
  })

  const payments = data?.getPayments

  useEffect(() => {
    if (page !== 1) setPage(1)
    refetch({
      pageSize,
      pageNumber: 1,
      searchTerm: searchTerm.trim() === '' ? null : searchTerm.trim(),
    })
  }, [searchTerm, refetch, pageSize])

  if (loading) return <div className="p-4">Loading payments…</div>
  if (error) return <div className="p-4 text-red-500">Error: {error.message}</div>

  return (
    <div className="space-y-4">
      <div className="flex w-full">
        <SearchInput
          value={searchTerm}
          onChange={value => setSearchTerm(value)}
          placeholder="Search"
          className="px-3 py-2 border border-light-900 rounded w-full bg-dark-700 text-light-900"
        />
      </div>

      <TableWrapper>
        <TableHead>
          <TableHeadRow>
            <TableHeadCell>Username</TableHeadCell>
            <TableHeadCell>Date added</TableHeadCell>
            <TableHeadCell>Amount, {payments?.items[0]?.currency}</TableHeadCell>
            <TableHeadCell>Subscription</TableHeadCell>
            <TableHeadCell>Payment Method</TableHeadCell>
          </TableHeadRow>
        </TableHead>
        <TableBody>
          {payments?.items.map(p => {
            const created = new Date(p.createdAt)
            const end = p.endDate ? new Date(p.endDate) : null
            const days =
              end != null
                ? Math.round((end.getTime() - created.getTime()) / (1000 * 60 * 60 * 24))
                : 0
            return (
              <TableBodyRow key={p.id}>
                <TableBodyCell>
                  <div className="flex items-center gap-2">
                    <Avatar src={p.avatars[0]?.url} width={36} height={36} />
                    {p.userName}
                  </div>
                </TableBodyCell>
                <TableBodyCell>{created.toLocaleDateString()}</TableBodyCell>
                <TableBodyCell>
                  {p.amount}
                  {p.currency}
                </TableBodyCell>
                <TableBodyCell>
                  {days} {days === 1 ? 'day' : 'days'}
                </TableBodyCell>
                <TableBodyCell>
                  {p.paymentMethod === 'STRIPE'
                    ? 'Stripe'
                    : p.paymentMethod === 'PAYPAL'
                      ? 'PayPal'
                      : 'Credit Card'}
                </TableBodyCell>
              </TableBodyRow>
            )
          })}
        </TableBody>
      </TableWrapper>

      {/* Пагинация */}
      {payments && (
        <TablePagination
          currentPage={payments.page}
          pageSize={payments.pageSize}
          totalCount={payments.totalCount}
          onPageChange={num => {
            setPage(num)
            refetch({ pageSize, pageNumber: num, searchTerm: searchTerm || null })
          }}
          onPageSizeChange={size => {
            setPageSize(size)
            setPage(1)
            refetch({ pageSize: size, pageNumber: 1, searchTerm: searchTerm || null })
          }}
          pageSizeOptions={pageSizeOptions}
          className="mt-4"
        />
      )}
    </div>
  )
}
