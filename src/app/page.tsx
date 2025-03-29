'use client'
import { Button } from '@photo-fiesta/ui-lib'

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-light-500">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start justify-center w-full max-w-xl px-4 py-8 rounded-lg shadow-md bg-white border border-gray-300 hover:border-gray-400 transition-colors duration-200 ease-in-out hover:bg-gray-50 cursor-pointer text-black text-xxl">
        <p className="text-xxl text-center sm:text-left">
          {' '}
          Hello, it`s new admin panel for Photo Fiesta!
        </p>
        <div className="w-full flex justify-center align-items-center">
          <Button onClick={() => alert('when start do something?')}>Click the Button</Button>
        </div>
      </main>
    </div>
  )
}
