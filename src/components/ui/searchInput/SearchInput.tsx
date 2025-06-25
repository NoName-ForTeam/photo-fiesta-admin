'use client'

import { ChangeEvent, InputHTMLAttributes } from 'react'

export interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  /** Текущее значение */
  value: string
  /** Вызывается сразу по вводу */
  onChange: (value: string) => void
}

export const SearchInput = ({ value, onChange, ...rest }: SearchInputProps) => {
  return (
    <input
      {...rest}
      type="search"
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.value)
      }}
    />
  )
}
