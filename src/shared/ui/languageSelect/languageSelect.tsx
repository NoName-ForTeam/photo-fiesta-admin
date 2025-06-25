'use client'

import { FlagRussia, FlagUnitedKingdom } from '@/shared/assets'
import { Select, SelectItem } from '@photo-fiesta/ui-lib'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

/**
 * LanguageSelect component allows users to switch between languages.
 *
 * This component renders a dropdown selection for language options,
 * which updates the application's locale and navigates to the same
 * page with the selected language applied.
 *
 * @example
 * <LanguageSelect className="my-custom-class" />
 */

export const LanguageSelect = ({ className }: { className: string }) => {
  const router = useRouter()
  const pathname = usePathname()

  const initial = typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : 'en'

  const [locale, setLocale] = useState<string>(initial)

  useEffect(() => {
    const curr = window.location.pathname.split('/')[1]
    if (curr !== locale) setLocale(curr)
  }, [locale])

  const languages = [
    { flag: <FlagUnitedKingdom className="w-[24px] h-[24px]" />, label: 'English', value: 'en' },
    { flag: <FlagRussia className="w-[24px] h-[24px]" />, label: 'Russian', value: 'ru' },
  ]

  const sorted = locale === 'en' ? languages : [...languages].reverse()

  /**
   * Handles changing the current language by updating the locale in the router.
   *
   * @param newLocale
   */

  const onChangeLanguage = (newLocale: string) => {
    setLocale(newLocale)
    if (!pathname) return
    const seg = pathname.split('/')
    seg[1] = newLocale
    router.push(seg.join('/'))
  }

  return (
    <Select className={className} value={locale} onValueChange={onChangeLanguage}>
      {sorted.map(({ flag, label, value }) => (
        <SelectItem key={value} value={value}>
          <div className="flex gap-[12px] items-center">
            {flag}
            <span>{label}</span>
          </div>
        </SelectItem>
      ))}
    </Select>
  )
}
