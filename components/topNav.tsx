"use client"
import React from 'react'
import { usePathname } from 'next/navigation'
import BrandsPopover from './brandspopoever'
import CategoryPopover from './categorypopever'
import Link from 'next/link'
type Props = {}

function TopNav({}: Props) {
    const pathname = usePathname()
    console.log(pathname.split('/'))
    if(pathname.split('/')[1]=== 'sign-up' || pathname.split('/')[1]=== 'sign-in' )
        return null
  return (          <div className="fixed w-full z-20 bg-[#fdfffc] border-b-[1px] border-black">
    <div className="w-full py-2 bg-red-0 grid  grid-cols-2 place-content-center text-lg ">
<div className=" px-2">  
ZeeShop
</div>
<div className="flex justify-end px-6 capitalize font-normal text-black">
{
["Category", "Brands", "shop active", "about", "search", "cart"].map(e=> e== "Brands" ? <BrandsPopover text={e} key = {e}/> :  e == "Category" ? <CategoryPopover text={e} key={e}/> : <Link href={e} key={e} className="ml-8" >{e}</Link>)
}
</div>
    </div>
    </div>
  )
}

export default TopNav