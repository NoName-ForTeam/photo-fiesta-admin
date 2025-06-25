import { avaTest } from '@/shared/assets'
import Image from 'next/image'

type ProfileAvatarProps = {
  src: string | undefined
  height?: number
  width?: number
}
export const Avatar = ({ src, height = 60, width = 60 }: ProfileAvatarProps) => {
  return (
    <Image
      alt={'avatar image'}
      height={height}
      src={src ?? avaTest}
      width={width}
      className={'rounded-full'}
    />
  )
}
