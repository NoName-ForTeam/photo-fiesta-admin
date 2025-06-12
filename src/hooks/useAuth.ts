import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/shared'

export const useAuth = () => {
  const router = useRouter()

  const isAuthenticated =
    typeof window !== 'undefined' ? localStorage.getItem('isAdminLoggedIn') === 'true' : false

  const logout = () => {
    localStorage.removeItem('isAdminLoggedIn')
    router.push(ROUTES.LOGIN)
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && !isAuthenticated) {
      router.push(ROUTES.LOGIN)
    }
  }, [isAuthenticated, router])

  return { isAuthenticated, logout }
}
