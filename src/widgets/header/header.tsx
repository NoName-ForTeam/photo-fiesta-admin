import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { ROUTES } from '@/shared/config'
import { LanguageSelect } from '@/shared/ui'
import Link from 'next/link'

export type HeaderProps = ComponentPropsWithoutRef<'div'>

/**
 * Header component for the Photo Fiesta application.
 *
 * @component
 * @example
 *       <Header isAuth={true} className="custom-header" />
 */

// eslint-disable-next-line react/display-name
export const Header = forwardRef<ElementRef<'div'>, HeaderProps>(
  (
    {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      className,
      ...rest
    },
    ref
  ) => {
    // const classNames = {
    //   buttonsContainer: styles.buttonsContainer,
    //   flag: styles.flag,
    //   lang: styles.lang,
    //   loginButtons: styles.loginButtons,
    //   logo: styles.logo,
    //   more: styles.more,
    //   select: styles.select,
    //   selectItem: styles.selectItem,
    // } as const

    return (
      <div className="w-full border-b border-gray-700">
        <div
          className="mx-auto flex items-center justify-between max-w-[1280px] h-header px-[64px] py-[12px]
         mobile:px-[15px] after:content-[''] after:absolute after:right-[20px] after:left-[20px] after:bottom-0
         after:h-px mobile:after:right-0 mobile:after:left-0"
          ref={ref}
          {...rest}
        >
          <Link
            className="no-underline text-xxl leading-l font-semibold
             mobile:text-l mobile:leading-m mobile:font-bold"
            href={ROUTES.USERS_LIST}
          >
            Photo Phiesta
            <span className="text-s font-extrabold">
              <span className="font-extralight">Super</span>Admin
            </span>
          </Link>
          <div className="flex gap-[45px] items-center mobile:gap-[12px]">
            <LanguageSelect className="ml-5 flex gap-[100px] items-center min-w-[163px] min-h-[36px]" />
          </div>
        </div>
      </div>
    )
  }
)
