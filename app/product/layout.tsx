import { getCurrentUser } from '@/lib/session'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {children:React.ReactNode}

export default async function Layout({children}: Props) {
    const user = await getCurrentUser()
    if(!user)
        return redirect("/sign-in")
  return (
    <div>{children}</div>
  )
}