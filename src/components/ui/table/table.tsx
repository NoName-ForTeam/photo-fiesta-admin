import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import clsx from 'clsx'

export const TableWrapper = forwardRef<HTMLTableElement, ComponentPropsWithoutRef<'table'>>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <table
        className={clsx('w-full border-collapse border border-dark-500 rounded-sm', className)}
        {...restProps}
        ref={ref}
      >
        {children}
      </table>
    )
  }
)

TableWrapper.displayName = 'TableWrapper'

export const TableHead = forwardRef<ElementRef<'thead'>, ComponentPropsWithoutRef<'thead'>>(
  ({ children, ...restProps }, ref) => {
    return (
      <thead className="text-s leading-m font-semibold text-light-100" {...restProps} ref={ref}>
        {children}
      </thead>
    )
  }
)

TableHead.displayName = 'TableHead'

export const TableHeadRow = forwardRef<ElementRef<'tr'>, ComponentPropsWithoutRef<'tr'>>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <tr className={clsx('text-s leading-m font-regular', className)} {...restProps} ref={ref}>
        {children}
      </tr>
    )
  }
)

TableHeadRow.displayName = 'TableHeadRow'

export const TableHeadCell = forwardRef<ElementRef<'th'>, ComponentPropsWithoutRef<'th'>>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <th
        className={clsx('m-0 py-1.5 px-6 text-left border-b border-dark-500', className)}
        {...restProps}
        ref={ref}
      >
        {children}
      </th>
    )
  }
)

TableHeadCell.displayName = 'TableHeadCell'

export const TableBody = forwardRef<ElementRef<'tbody'>, ComponentPropsWithoutRef<'tbody'>>(
  ({ children, ...restProps }, ref) => {
    return (
      <tbody {...restProps} ref={ref}>
        {children}
      </tbody>
    )
  }
)

TableBody.displayName = 'TableBody'

export const TableBodyRow = forwardRef<ElementRef<'tr'>, ComponentPropsWithoutRef<'tr'>>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <tr className={clsx('text-s leading-m font-regular', className)} {...restProps} ref={ref}>
        {children}
      </tr>
    )
  }
)

TableBodyRow.displayName = 'TableBodyRow'

export const TableBodyCell = forwardRef<ElementRef<'td'>, ComponentPropsWithoutRef<'td'>>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <td
        className={clsx(
          'm-0 py-1.5 px-6 text-left border-b border-dark-500',
          'last:py-3 last:px-6',
          '[&:last-child]:py-3 [&:last-child]:px-6',
          className
        )}
        {...restProps}
        ref={ref}
      >
        {children}
      </td>
    )
  }
)

TableBodyCell.displayName = 'TableBodyCell'
