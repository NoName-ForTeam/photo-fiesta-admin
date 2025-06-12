'use client'

import { Button, Typography } from '@photo-fiesta/ui-lib'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/shared'
import { FormEvent, useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN_ADMIN } from '@/lib/queries/loginAdmin'

const Page = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginAdmin, { loading, error }] = useMutation(LOGIN_ADMIN)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const { data } = await loginAdmin({
        variables: {
          email,
          password,
        },
      })

      if (data?.loginAdmin?.logged) {
        // Авторизация успешна
        // Можно сохранить факт авторизации в localStorage
        localStorage.setItem('isAdminLoggedIn', 'true')

        // Редирект на страницу пользователей
        router.push(ROUTES.USERS_LIST)
      } else {
        // Сервер вернул logged: false
        alert('Invalid credentials')
      }
    } catch (err) {
      console.error('Login error:', err)
      alert('Login failed. Please try again.')
    }
  }

  return (
    <div className="mx-auto mt-[108px] border border-dark-300 rounded-[3px] bg-dark-600 px-[12px] max-w-[378px] pb-[36px] pt-[23px] flex items-center justify-center flex-col">
      <Typography className="mb-[37px]" variant={'h1'}>
        Sign in
      </Typography>

      {loading && <p>Loading...</p>}
      {error && (
        <Typography className="mb-4 text-red-500" variant={'text14'}>
          {error.message}
        </Typography>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col text-light-900">
        <div className="mt-[37px] flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="admin@gmail.com"
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
