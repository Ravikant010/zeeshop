"use client"
import React from 'react'
import { usePathname } from 'next/navigation'
import BrandsPopover from './brandspopoever'
import CategoryPopover from './categorypopever'
import Link from 'next/link'
import UserAvatar from './UserAvatar'
import { SessionProvider } from "next-auth/react"
import SideMenu from './SideMenu'
type Props = {
  username: string,
  userId: number,
  imageBase64:string
}


function TopNav({username, userId, imageBase64}: Props) {
    const pathname = usePathname()
    console.log(pathname.split('/'))
    if(pathname.split('/')[1]=== 'sign-up' || pathname.split('/')[1]=== 'sign-in'  || pathname.split('/')[1]=== 'account' )
        return null
  return (          <div className="fixed w-full z-20 bg-[#fdfffc] border-b-[1px] border-black top-0">
    <div className="w-full py-2 bg-red-0 grid  grid-cols-2 place-content-center text-lg ">
<div className=" px-2">  
ZeeShop
</div>
<div className="flex justify-end px-4 capitalize font-normal text-black items-center">
{
["Category", "Brands", "shop active", "about", "search", "cart"].map(e=> e== "Brands" ? <BrandsPopover text={e} key = {e}/> :  e == "Category" ? <CategoryPopover text={e} key={e}/> : <Link href={e} key={e} className="ml-8" >{e}</Link>)
}

  <Link href={'/account'}><UserAvatar username={username} userId={userId} imageBase64={imageBase64}/></Link>
</div>
    </div>
    </div>
  )
}

export default TopNav