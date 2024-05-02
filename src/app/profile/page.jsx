import React from 'react'
import { auth } from '@/auth';

export default async function Profile() {
  const session = await auth()
  return (
    <main className="max-w-[1280px] m-auto p-4">
        {JSON.stringify(session)}
    </main>
  )
}
