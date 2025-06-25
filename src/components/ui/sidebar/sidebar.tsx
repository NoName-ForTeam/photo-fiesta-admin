'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CreditCard, Person, TrendingUp, Image } from '@/shared/assets'
import { ComponentType } from 'react'
import { ROUTES } from '@/shared'

type NavItem = {
  href: string
  label: string
  Icon: ComponentType<{ className?: string }>
}

export const Sidebar = () => {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    { href: ROUTES.USERS_LIST, label: 'Users list', Icon: Person },
    { href: ROUTES.STATISTICS, label: 'Statistics', Icon: TrendingUp },
    { href: ROUTES.PAYMENTS_LIST, label: 'Payments list', Icon: CreditCard },
    { href: ROUTES.POSTS_LIST, label: 'Posts list', Icon: Image },
  ]

  return (
    <nav className="w-60 h-screen p-4 flex flex-col border-r border-gray-700">
      {navItems.map(({ href, label, Icon }) => {
        const active = pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            className={
              `flex items-center gap-3 px-3 py-2 rounded-md mb-2 ` +
              (active ? 'text-accent-100 ' : 'hover:bg-gray-800 hover:text-white')
            }
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
