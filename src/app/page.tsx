'use client'
import { Button, Card, Input } from '@photo-fiesta/ui-lib'

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-light-500">
        Welcome to the new Project!
      </main>
      <Button>Button</Button>
      <Button variant={'secondary'}>Button</Button>
      <Button variant={'outlined'}>Button</Button>
      <Button>Button</Button>
      <Input></Input>
      <Card className={'w-[50px] h-[50px]'}></Card>
    </div>
  )
}
