"use client"
import React from 'react'
import { Button } from "./ui/button"
import {SignOutAction} from "@/use-cases/sign-out"
import { useRouter } from 'next/navigation'
import { UserId } from '@/use-cases/types'
type Props = {}

export default function SignOut({userId}: {userId:UserId}) {
const router = useRouter()
  return (
    <Button onClick={async ()=>{
      await SignOutAction()
        router.push('/')
        
    }}>SignOut</Button>
    
  )
}