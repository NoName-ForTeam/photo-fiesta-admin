'use client'

import { FlagRussia, FlagUnitedKingdom } from '@/shared/assets'
import { Select, SelectItem } from '@photo-fiesta/ui-lib'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const searchParams = useSearchParams()

  const currentLocale =
    typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : 'en'

  const languages = [
    { flag: <FlagUnitedKingdom className="w-[24px] h-[24px]" />, label: 'English', value: 'en' },
    { flag: <FlagRussia className="w-[24px] h-[24px]" />, label: 'Russian', value: 'ru' },
  ]

  const sortedLanguages = currentLocale === 'en' ? languages : languages.reverse()

  /**
   * Handles changing the current language by updating the locale in the router.
   *
   * @param {string} locale - The locale string to switch to ('ru' or 'en').
   */
  const onChangeLanguage = (locale: string) => {
    // Меняем язык, перестраивая pathname
    const segments = pathname.split('/')
    segments[1] = locale // предполагается, что локаль — это первая часть URL
    const newPath = segments.join('/')

    router.push(newPath)
  }

  return (
    <Select className={className} defaultValue={currentLocale} onValueChange={onChangeLanguage}>
      {sortedLanguages.map(({ flag, label, value }) => (
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
