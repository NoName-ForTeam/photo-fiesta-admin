'use client'
import { Button } from '@photo-fiesta/ui-lib'

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-light-500">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start text-black text-xxl">
        Welcome to the new Project!
        <Button>Click the Button</Button>
      </main>
    </div>
  )
}
