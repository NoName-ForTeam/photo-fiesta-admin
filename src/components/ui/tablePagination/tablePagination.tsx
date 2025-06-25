// components/ui/TablePagination.tsx
'use client'

import { FC } from 'react'
import { Pagination, Select, SelectItem, SelectContainer } from '@photo-fiesta/ui-lib'

export interface PageSizeOption {
  id: number
  value: string // строка, т.к. Select возвращает string
  title: string
}

export interface TablePaginationProps {
  currentPage: number
  pageSize: number
  totalCount: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  pageSizeOptions: PageSizeOption[]
  /** Любые дополнительные классы для контейнера */
  className?: string
}

export const TablePagination: FC<TablePaginationProps> = ({
  currentPage,
  pageSize,
  totalCount,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions,
  className,
}) => {
  return (
    <Pagination
      currentPage={currentPage}
      pageSize={pageSize}
      totalCount={totalCount}
      onChangePage={onPageChange}
      className={`
        ${className || ''}
        [&>button]:mx-2    /* добавляем отступы между кнопками */
      `}
    >
      {/* @ts-expect-error: пока в типах библиотеки не поправили, принудительно игнорируем */}
      <SelectContainer content={['Show', 'on page']}>
        <Select
          pagination
          value={String(pageSize)}
          onValueChange={val => onPageSizeChange(Number(val))}
        >
          {pageSizeOptions.map(opt => (
            <SelectItem key={opt.id} value={opt.value}>
              {opt.title}
            </SelectItem>
          ))}
        </Select>
      </SelectContainer>
    </Pagination>
  )
}
