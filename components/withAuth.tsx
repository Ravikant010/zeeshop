"use server"
import { redirect } from 'next/navigation'
import { auth } from '@/auth'  // Adjust the import path as needed
import { getCurrentUser } from '@/lib/session'

export async function WithAuth<T>(Component: React.ComponentType<any>) {
    const user = await getCurrentUser()
    if (!user) {
        redirect('/login')
      }
}