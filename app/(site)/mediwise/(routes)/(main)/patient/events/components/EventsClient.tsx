import { Separator } from '@/components/ui/separator';
import { TUserRaw } from '@/schema/user'
import Event from './Event'
import React from 'react'

type EventsClientProps = {
  currentUser: TUserRaw;
}

const EventsClient:React.FC<EventsClientProps> = () => {
  return (
    <div className='w-full'>
      <h1 className='text-[13em] font-black text-center'>FORUMS</h1>

      <section className='bg-[#212121] w-full min-h-[500px] px-40 py-10 h-full'>
        <div className='gap-y-10 flex flex-col'>
          <h1 className='capitalize text-white text-3xl'>Upcoming events</h1>
          <Separator />
        </div>

        {/* events */}
        <section className='flex flex-col py-10'>
          <Event />
        </section>
      </section>
    </div>
  )
}

export default EventsClient