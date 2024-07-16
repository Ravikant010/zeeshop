import { auth } from '@/auth'
import MidBar from '@/components/MidBar'
import { Button } from '@/components/ui/button'
import { Combobox } from '@/components/ui/combox'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import SignOut from "@/components/Signout"
import { getCurrentUser } from '@/lib/session'
import { getProfile } from '@/data-access/profile'
type Props = {}
export default async function page({ }: Props) {
  const user = await getCurrentUser()
  if(!user)
   return  <></>
const profile = await getProfile(user.id)
    if (user)
        return (
            <div className='w-full min-h-screen flex flex-col items-start justify-normal'>
                <div className='flex justify-between w-full p-2'>
                    <Link href={'/'}>
                        <Button variant={'link'} className='capitalize'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"} className='mr-2'>
                                <path d="M4 12L20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8.99996 17C8.99996 17 4.00001 13.3176 4 12C3.99999 10.6824 9 7 9 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            back to home
                        </Button>
                    </Link>
                    <SignOut />
                </div>
                <div className='w-full h-[200px] border-y-[1px] border-black flex items-center px-10 '>
                    <img src={profile.image || ''} alt=''  className='rounded-full h-[100px] w-[100px] cover' />
                    <p className='ml-2 text-lg font-semibold'>{user.username}</p>
                </div>
                <div className="w-full grid grid-cols-2 p-2  content-center bg-[#fdfffc] border-b-[1px]    border-black">
                    <div className=" flex items-center">Your Orders</div>



                </div>
            </div>
        )
    return redirect('/')
}