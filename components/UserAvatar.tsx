
import React, { Component, ReactNode } from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { auth } from '@/auth'
import { useSession } from 'next-auth/react'
import { date } from 'drizzle-orm/pg-core'
import { getCurrentUser } from '@/lib/session'
import { getProfile } from '@/data-access/profile'

type Props = {
  username: string,
  userId: number,
  imageBase64:string
}


export default   function UserAvatar({username, userId, imageBase64}:Props) {

    return (
      <Avatar className='ml-4'>
      <AvatarImage src={imageBase64|| ''} alt={username}  className='object-fit h-10 w-10 '/>
      <AvatarFallback>{username}</AvatarFallback>
    </Avatar>
    )
    
}