'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_USERS } from '@/lib/queries/getUsers'
import {
  TableWrapper,
  TableHead,
  TableHeadRow,
  TableHeadCell,
  TableBody,
  TableBodyRow,
  TableBodyCell,
} from '@/components/ui/table'
import {
  Select,
  SelectItem,
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
} from '@photo-fiesta/ui-lib'
import { MoreHorizontalOutline, PersonRemove, Block } from '../../../shared/assets/icons'
import { useRouter } from 'next/navigation'
import { useUserActionsDialog } from '@/hooks/useUserActionsDialog'
import { useDebounce } from '@/hooks/useDebounce'
import { SearchInput } from '@/components/ui/searchInput/SearchInput'
import { PageSizeOption, TablePagination } from '@/components/ui/tablePagination/tablePagination'

type UserBlockStatus = 'ALL' | 'UNBLOCKED' | 'BLOCKED'
export type SortKey = 'userName' | 'createdAt'
export type SortDirection = 'asc' | 'desc'

type User = {
  id: number
  userName: string
  email: string
  createdAt: string
  profile: {
    id: number
    userName: string
    firstName: string
    lastName: string
    city: string
    country: string
    region: string
    dateOfBirth: Date
    aboutMe: string
    createdAt: Date
    avatars: {
      url: string
      width: number
      height: number
      fileSize: number
    }
  }
  userBan: boolean
}
type UsersResponse = {
  getUsers: {
    users: User[]
    pagination: {
      pagesCount: number
      page: number
      pageSize: number
      totalCount: number
    }
  }
}

export const UsersTable = () => {
  const router = useRouter()
  const { open, Dialog } = useUserActionsDialog()

  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const [statusFilter, setStatusFilter] = useState<UserBlockStatus>('ALL')
  const [pagination, setPagination] = useState({
    pageSize: 8,
    pageNumber: 1,
    sortBy: 'createdAt' as SortKey,
    sortDirection: 'desc' as SortDirection,
  })

  useEffect(() => {
    setMounted(true)
  }, [])
  useEffect(() => {
    setPagination(p => ({
      ...p,
      pageNumber: 1,
      searchTerm: debouncedSearchTerm,
    }))
  }, [debouncedSearchTerm])

  const { loading, error, data } = useQuery<UsersResponse>(GET_USERS, {
    variables: {
      ...pagination,
      statusFilter,
    },
    skip: !mounted,
    fetchPolicy: 'cache-and-network',
  })

  if (!mounted) return <div className="h-64 flex items-center justify-center">Initializing...</div>
  if (loading) return <div className="h-64 flex items-center justify-center">Loading data...</div>
  if (error) return <div className="text-red-500 p-4">Error: {error.message}</div>

  const handleSortClick = (key: SortKey, dir: SortDirection) => {
    setPagination(p => ({
      ...p,
      sortBy: key,
      sortDirection: dir,
      pageNumber: 1,
    }))
  }

  const { users = [], pagination: pageData } = data!.getUsers

  const pageSizeOptions: PageSizeOption[] = [8, 15, 30, 50].map(n => ({
    id: n,
    value: String(n),
    title: String(n),
  }))

  function handlePageChange(page: number) {
    setPagination(p => ({ ...p, pageNumber: page }))
  }

  function handlePageSizeChange(size: number) {
    setPagination(p => ({ ...p, pageSize: size, pageNumber: 1 }))
  }

  return (
    <div className="space-y-4">
      {/* Фильтры сверху */}
      <div className="flex items-center gap-4 ">
        <SearchInput
          className="flex-1 px-3 py-2 border border-light-900 rounded bg-dark-700 text-light-900"
          placeholder="Search"
          value={searchTerm}
          onChange={setSearchTerm}
        />

        <Select
          placeholder="Status"
          onValueChange={val => {
            setStatusFilter(val as UserBlockStatus)
            setPagination(p => ({ ...p, pageNumber: 1 }))
          }}
          value={statusFilter}
          className={'w-[160px]'}
        >
          <SelectItem value="ALL">Not selected</SelectItem>
          <SelectItem value="BLOCKED">Blocked</SelectItem>
          <SelectItem value="UNBLOCKED">Not Blocked</SelectItem>
        </Select>
      </div>

      {/* Таблица */}
      <TableWrapper>
        <TableHead>
          <TableHeadRow className={'bg-dark-500'}>
            <TableHeadCell></TableHeadCell>
            <TableHeadCell>User ID</TableHeadCell>
            <TableHeadCell>
              <div className="flex items-center gap-1 select-none">
                <span>Profile link</span>
                <div className="flex flex-col ml-2">
                  <button
                    onClick={() => handleSortClick('userName', 'asc')}
                    className={`text-xs leading-none ${
                      pagination.sortBy === 'userName' && pagination.sortDirection === 'asc'
                        ? 'text-white'
                        : 'text-gray-500'
                    }`}
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => handleSortClick('userName', 'desc')}
                    className={`text-xs leading-none ${
                      pagination.sortBy === 'userName' && pagination.sortDirection === 'desc'
                        ? 'text-white'
                        : 'text-gray-500'
                    }`}
                  >
                    ▼
                  </button>
                </div>
              </div>
            </TableHeadCell>
            <TableHeadCell>Username</TableHeadCell>
            <TableHeadCell>
              <div className="flex items-center gap-1 select-none">
                <span>Date added</span>
                <div className="flex flex-col ml-2">
                  <button
                    onClick={() => handleSortClick('createdAt', 'asc')}
                    className={`text-xs leading-none ${
                      pagination.sortBy === 'createdAt' && pagination.sortDirection === 'asc'
                        ? 'text-white'
                        : 'text-gray-500'
                    }`}
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => handleSortClick('createdAt', 'desc')}
                    className={`text-xs leading-none ${
                      pagination.sortBy === 'createdAt' && pagination.sortDirection === 'desc'
                        ? 'text-white'
                        : 'text-gray-500'
                    }`}
                  >
                    ▼
                  </button>
                </div>
              </div>
            </TableHeadCell>
            <TableHeadCell></TableHeadCell>
          </TableHeadRow>
        </TableHead>
        <TableBody>
          {users.map(u => (
            <TableBodyRow key={u.id}>
              <TableBodyCell>{u.userBan ? <Block /> : ''}</TableBodyCell>
              <TableBodyCell>{u.id}</TableBodyCell>
              <TableBodyCell>{u.profile.userName}</TableBodyCell>
              <TableBodyCell>
                {u.profile.firstName}
                {u.profile.lastName}
              </TableBodyCell>
              <TableBodyCell>{new Date(u.createdAt).toLocaleDateString('ru-RU')}</TableBodyCell>
              <TableBodyCell>
                <PopoverRoot>
                  <PopoverTrigger asChild>
                    {/* кнопка-триггер — важно оборачивать в элемент, который умеет получать onClick */}
                    <button className="p-1 hover:bg-gray-700 rounded">
                      <MoreHorizontalOutline className={'w-[24px] h-[24px]'} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="bg-dark-600 border border-gray-700 rounded shadow-md w-max min-w-[200px] z-30">
                    <ul className="flex flex-col gap-1">
                      <li>
                        <button
                          className="flex items-center gap-2 w-full px-2 py-1 hover:bg-gray-700 rounded whitespace-nowrap"
                          onClick={() => open('delete', u)}
                        >
                          <PersonRemove className={'w-[24px] h-[24px]'} />
                          Delete User
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => open('ban', u)}
                          className="flex items-center gap-2 w-full px-2 py-1 hover:bg-gray-700 rounded whitespace-nowrap"
                        >
                          <Block className="w-[24px] h-[24px]" />
                          {u.userBan ? 'Unban in the system' : 'Ban in the system'}
                        </button>
                      </li>
                      <li>
                        <button
                          className="flex items-center gap-2 w-full px-2 py-1 hover:bg-gray-700 rounded"
                          onClick={() => router.push(`/usersList/${u.id}`)}
                        >
                          <MoreHorizontalOutline className={'w-[24px] h-[24px]'} />
                          More Information
                        </button>
                      </li>
                    </ul>
                  </PopoverContent>
                </PopoverRoot>
              </TableBodyCell>
            </TableBodyRow>
          ))}
        </TableBody>
      </TableWrapper>

      <TablePagination
        currentPage={pageData.page}
        pageSize={pageData.pageSize}
        totalCount={pageData.totalCount}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        pageSizeOptions={pageSizeOptions}
        className="mt-4"
      />

      <Dialog />
    </div>
  )
}
