import React from 'react'
import InventoryClient from './components/InventoryClient'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'

const page = async () => {

  const session = await getSession()
  if(!session?.user) {
    return redirect('/')
  }

  return (
    <div className='h-full'>
      <InventoryClient currentUser={session?.user} />
    </div>
  )
}

export default page