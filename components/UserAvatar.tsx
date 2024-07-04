import React from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { auth } from '@/auth'
import { useSession } from 'next-auth/react'
import { date } from 'drizzle-orm/pg-core'

type Props = {}

export default  function UserAvatar({ }: Props) {
  const session = useSession()
 console.log(session)
    if(session && session.data)
    return (
      <Avatar className='ml-4'>
      <AvatarImage src={session?.data.user?.image as string} alt={session?.data.user?.name as string}  className='object-fit h-10 w-10 '/>
      <AvatarFallback>{session.data.user?.name as string}</AvatarFallback>
    </Avatar>
    )
}