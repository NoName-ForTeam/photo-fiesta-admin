'use client'

import React from 'react'
import { Button, Typography } from '@photo-fiesta/ui-lib'
import { redirect } from 'next/navigation'
import { ROUTES } from '@/shared'

const EMAIL = 'photophiesta@gmail.com'
const PASSWORD = 'photoPhiestaTeam'

const Page = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email === EMAIL && password === PASSWORD) {
      // авторизовать (например, сохранить флаг в localStorage и редирект)
      redirect(ROUTES.USERS_LIST)
    } else {
      alert('Invalid credentials')
    }
  }

  return (
    <div className="mx-auto mt-[108px] border border-dark-300 rounded-[3px] bg-dark-600 px-[12px] max-w-[378px] pb-[36px] pt-[23px] flex items-center justify-center flex-col">
      <Typography className="mb-[37px]" variant={'h1'}>
        Sign in
      </Typography>

      <form onSubmit={handleSubmit} className="flex flex-col text-light-900">
        <div className="mt-[37px] flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Epam@epam.com"
            id="email"
            className="min-w-[330px] py-[6px] pl-[12px] bg-transparent border border-dark-100"
            type="email"
          />
        </div>

        <div className="mt-[26px] mb-[36px] flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            id="password"
            className="py-[6px] pl-[12px] bg-transparent border border-dark-100 max-w-[330px]"
            placeholder="******************"
            type="password"
          />
        </div>

        <Button type="submit">
          <Typography className="text-light-100" variant={'h3'}>
            Sign in
          </Typography>
        </Button>
      </form>
    </div>
  )
}

export default Page
