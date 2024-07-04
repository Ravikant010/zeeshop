"use client"
import React from 'react'
import { Button } from "./ui/button"
import { signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
type Props = {}

export default function SignOut({}: Props) {
const router = useRouter()
  return (
    <Button onClick={async ()=>{
        await signOut()
        router.push('/')
        
    }}>SignOut</Button>
    
  )
}