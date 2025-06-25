'use client'

import { useParams, useRouter } from 'next/navigation'
import { useQuery } from '@apollo/client'
import { GET_USER } from '@/lib/queries/getUser'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger, Typography } from '@photo-fiesta/ui-lib'
import { Avatar } from '@/components/ui/avatar'
import { GET_FOLLOWING } from '@/lib/queries/getFollowings'
import { useState } from 'react'
import { GET_FOLLOWERS } from '@/lib/queries/getFollowers'
import { FollowersResponse, FollowingResponse, PaymentsByUserModel } from '@/shared/types'

import {
  SortDirection,
  SortKey,
  TableBody,
  TableBodyCell,
  TableBodyRow,
  TableHead,
  TableHeadCell,
  TableHeadRow,
  TableWrapper,
} from '@/components'
import { PostsByUserModel } from '@/shared/types'
import Image from 'next/image'
import { GET_POSTS_BY_USER } from '@/lib/queries/getPostsByUser'
import { GET_PAYMENTS_BY_USER } from '@/lib/queries/getPaymentsByUser'
import { PageSizeOption, TablePagination } from '@/components/ui/tablePagination/tablePagination'

type TabValue = 'uploaded' | 'payments' | 'followers' | 'following'

export default function UserPage() {
  const { userId } = useParams()
  const router = useRouter()
  const id = Number(userId)

  const { data, loading, error } = useQuery(GET_USER, {
    variables: { userId: id },
    skip: isNaN(id),
    fetchPolicy: 'cache-and-network',
  })

  const [activeTab, setActiveTab] = useState<'uploaded' | 'payments' | 'followers' | 'following'>(
    'uploaded'
  )

  const [pagination, setPagination] = useState<{
    pageSize: number
    pageNumber: number
    sortBy: SortKey
    sortDirection: SortDirection
  }>({
    pageSize: 10,
    pageNumber: 1,
    sortBy: 'createdAt',
    sortDirection: 'desc',
  })

  const { data: followersData, loading: followersLoading } = useQuery<FollowersResponse>(
    GET_FOLLOWERS,
    {
      variables: { userId: id },
      skip: activeTab !== 'followers',
    }
  )

  const { data: followingData, loading: followingLoading } = useQuery<FollowingResponse>(
    GET_FOLLOWING,
    {
      variables: { userId: id },
      skip: activeTab !== 'following',
    }
  )

  const { data: paymentsData, loading: paymentsLoading } = useQuery<{
    getPaymentsByUser: PaymentsByUserModel
  }>(GET_PAYMENTS_BY_USER, {
    variables: {
      userId: id,
      pageSize: pagination.pageSize,
      pageNumber: pagination.pageNumber,
      sortBy: pagination.sortBy,
      sortDirection: pagination.sortDirection,
    },
    skip: activeTab !== 'payments',
    fetchPolicy: 'cache-and-network',
  })

  const { data: postsData, loading: postsLoading } = useQuery<{
    getPostsByUser: PostsByUserModel
  }>(GET_POSTS_BY_USER, {
    variables: { userId: id },
    skip: activeTab !== 'uploaded',
    fetchPolicy: 'cache-and-network',
  })

  const pageSizeOptions: PageSizeOption[] = [8, 15, 30, 50].map(n => ({
    id: n,
    value: String(n),
    title: String(n),
  }))

  if (loading) return <div className="p-4">Loading user…</div>
  if (error) return <div className="p-4 text-red-500">Error: {error.message}</div>
  if (!data) return <div className="p-4">No data</div>

  const { getUser: user } = data
  const pag = data?.getFollowers
  const avatarUrl = user.profile.avatars[0]?.url

  return (
    <div className="p-6 space-y-6">
      <button onClick={() => router.back()} className="text-sm text-blue-400 hover:underline">
        ← Back to Users List
      </button>

      <div className="flex items-center gap-4">
        <Avatar src={avatarUrl} width={64} height={64} />
        <div>
          <Typography variant="h2">
            {user.profile.firstName} {user.profile.lastName}
          </Typography>
          <Link href={`/users/${user.id}`} legacyBehavior>
            <a className="text-white active:text-accent-100 hover:text-accent-100 underline text-sm">
              {user.userName}
            </a>
          </Link>
        </div>
      </div>

      <div className="flex flex-start gap-16">
        <div>
          <Typography variant="text14" className="text-gray-400">
            UserID
          </Typography>
          <Typography>{user.id}</Typography>
        </div>
        <div>
          <Typography variant={'text14'} className="text-gray-400">
            Profile Creation Date
          </Typography>
          <Typography>{new Date(user.createdAt).toLocaleDateString()}</Typography>
        </div>
      </div>
      {/* Табы */}
      <Tabs
        defaultValue="uploaded"
        value={activeTab}
        onValueChange={(v: string) => {
          setActiveTab(v as TabValue)
        }}
        className="w-full"
      >
        <TabsList className="w-full max-w-none grid grid-cols-4 border-b border-gray-700 mb-4 gap-4">
          <TabsTrigger
            value="uploaded"
            className="text-center pb-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-white text-gray-400"
          >
            Uploaded photos
          </TabsTrigger>
          <TabsTrigger
            value="payments"
            className="text-center pb-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-white text-gray-400"
          >
            Payments
          </TabsTrigger>
          <TabsTrigger
            value="followers"
            className="text-center pb-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-white text-gray-400"
          >
            Followers
          </TabsTrigger>
          <TabsTrigger
            value="following"
            className="text-center pb-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-white text-gray-400"
          >
            Following
          </TabsTrigger>
        </TabsList>

        <TabsContent value="uploaded">
          {postsLoading && <div>Loading photos…</div>}
          {!postsLoading && postsData?.getPostsByUser.items.length === 0 && <div>No photos</div>}

          <div className="grid grid-cols-4 gap-4">
            {postsData?.getPostsByUser.items.map(img => (
              <Image
                key={img.id}
                src={img.url}
                alt={`Photo #${img.id}`}
                width={234}
                height={228}
                className="object-cover w-full rounded"
              />
            ))}
          </div>

          {postsData && paymentsData?.getPaymentsByUser && (
            <TablePagination
              currentPage={paymentsData.getPaymentsByUser.page}
              pageSize={paymentsData.getPaymentsByUser.pageSize}
              totalCount={paymentsData.getPaymentsByUser.totalCount}
              onPageChange={num => setPagination(p => ({ ...p, pageNumber: num }))}
              onPageSizeChange={size =>
                setPagination(p => ({ ...p, pageSize: size, pageNumber: 1 }))
              }
              pageSizeOptions={pageSizeOptions}
              className="mt-4"
            />
          )}
        </TabsContent>

        <TabsContent value="payments">
          {paymentsLoading && <div>Loading payments…</div>}

          {paymentsData?.getPaymentsByUser && (
            <>
              <TableWrapper>
                <TableHead>
                  <TableHeadRow>
                    <TableHeadCell>Date of Payment</TableHeadCell>
                    <TableHeadCell>End date of payment</TableHeadCell>
                    <TableHeadCell>Amount</TableHeadCell>
                    <TableHeadCell>Subscription Type</TableHeadCell>
                    <TableHeadCell>Payment Type</TableHeadCell>
                  </TableHeadRow>
                </TableHead>
                <TableBody>
                  {paymentsData.getPaymentsByUser.items.map(s => (
                    <TableBodyRow key={s.id}>
                      <TableBodyCell>
                        {s.dateOfPayment ? new Date(s.dateOfPayment).toLocaleDateString() : '—'}
                      </TableBodyCell>
                      <TableBodyCell>
                        {s.endDate ? new Date(s.endDate).toLocaleDateString() : '—'}
                      </TableBodyCell>
                      <TableBodyCell>{s.price}</TableBodyCell>
                      <TableBodyCell>{s.type}</TableBodyCell>
                      <TableBodyCell>{s.paymentType}</TableBodyCell>
                    </TableBodyRow>
                  ))}
                </TableBody>
              </TableWrapper>

              <TablePagination
                currentPage={paymentsData.getPaymentsByUser.page}
                pageSize={paymentsData.getPaymentsByUser.pageSize}
                totalCount={paymentsData.getPaymentsByUser.totalCount}
                onPageChange={num => setPagination(p => ({ ...p, pageNumber: num }))}
                onPageSizeChange={size =>
                  setPagination(p => ({ ...p, pageSize: size, pageNumber: 1 }))
                }
                pageSizeOptions={pageSizeOptions}
                className="mt-4"
              />
            </>
          )}
        </TabsContent>

        <TabsContent value="followers">
          {followersLoading && <div>Loading followers…</div>}

          {/* Если ещё нет ни загрузки, ни данных — не рендерим таблицу и пагинацию */}
          {!followersLoading && !followersData && null}

          {/* Только когда пришли данные — безопасно рендерим всё */}
          {followersData ? (
            <>
              <TableWrapper>
                <TableHead>
                  <TableHeadRow>
                    <TableHeadCell>User ID</TableHeadCell>
                    <TableHeadCell>Profile link</TableHeadCell>
                    <TableHeadCell>Username</TableHeadCell>
                    <TableHeadCell>Subscription Date</TableHeadCell>
                  </TableHeadRow>
                </TableHead>
                <TableBody>
                  {followersData.getFollowers.items.map(f => (
                    <TableBodyRow key={f.id}>
                      <TableBodyCell>{f.userId}</TableBodyCell>
                      <TableBodyCell>
                        <Link href={`/usersList/${f.userId}`} legacyBehavior>
                          <a className="underline">{f.userName}</a>
                        </Link>
                      </TableBodyCell>
                      <TableBodyCell>
                        {f.firstName} {f.lastName}
                      </TableBodyCell>
                      <TableBodyCell>{new Date(f.createdAt).toLocaleDateString()}</TableBodyCell>
                    </TableBodyRow>
                  ))}
                </TableBody>
              </TableWrapper>

              {pag && paymentsData?.getPaymentsByUser && (
                <TablePagination
                  currentPage={paymentsData.getPaymentsByUser.page}
                  pageSize={paymentsData.getPaymentsByUser.pageSize}
                  totalCount={paymentsData.getPaymentsByUser.totalCount}
                  onPageChange={num => setPagination(p => ({ ...p, pageNumber: num }))}
                  onPageSizeChange={size =>
                    setPagination(p => ({ ...p, pageSize: size, pageNumber: 1 }))
                  }
                  pageSizeOptions={pageSizeOptions}
                  className="mt-4"
                />
              )}
            </>
          ) : null}
        </TabsContent>

        <TabsContent value="following">
          {followingLoading && <div>Loading following…</div>}
          {!followingLoading && !followingData && null}
          {followingData ? (
            <>
              <TableWrapper>
                <TableHead>
                  <TableHeadRow>
                    <TableHeadCell>User ID</TableHeadCell>
                    <TableHeadCell>Profile link</TableHeadCell>
                    <TableHeadCell>Username</TableHeadCell>
                    <TableHeadCell>Subscription Date</TableHeadCell>
                  </TableHeadRow>
                </TableHead>
                <TableBody>
                  {followingData?.getFollowing.items.map(f => (
                    <TableBodyRow key={f.id}>
                      <TableBodyCell>{f.userId}</TableBodyCell>
                      <TableBodyCell>
                        <Link href={`/usersList/${f.userId}`} legacyBehavior>
                          <a className="underline">{f.userName}</a>
                        </Link>
                      </TableBodyCell>
                      <TableBodyCell>
                        {f.firstName} {f.lastName}
                      </TableBodyCell>
                      <TableBodyCell>{new Date(f.createdAt).toLocaleDateString()}</TableBodyCell>
                    </TableBodyRow>
                  ))}
                </TableBody>
              </TableWrapper>

              {pag && paymentsData?.getPaymentsByUser && (
                <TablePagination
                  currentPage={paymentsData.getPaymentsByUser.page}
                  pageSize={paymentsData.getPaymentsByUser.pageSize}
                  totalCount={paymentsData.getPaymentsByUser.totalCount}
                  onPageChange={num => setPagination(p => ({ ...p, pageNumber: num }))}
                  onPageSizeChange={size =>
                    setPagination(p => ({ ...p, pageSize: size, pageNumber: 1 }))
                  }
                  pageSizeOptions={pageSizeOptions}
                  className="mt-4"
                />
              )}
            </>
          ) : null}
        </TabsContent>
      </Tabs>
    </div>
  )
}
