import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"

  import React from 'react'
import UserAvatar from "./UserAvatar"
import { useSession } from "next-auth/react"
  
  type Props = {
    children: React.ReactNode
  }
  

  export default function SideMenu({children}: Props) {
    const session = useSession()
    return (
        <Sheet>
        <SheetTrigger>{children}</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>

            </SheetTitle>
            <SheetDescription>
<div className="flex items-center bg-[#F6F7F9]  rounded-xl mt-6  bg-opacity-80"><UserAvatar /><p className="ml-3 text-lg font-semibold">{session && session.data && session.data.user && session.data.user.name as string}</p></div>
            </SheetDescription>
          </SheetHeader>
          <ul className="mt-6 p-4 capitalize">
          {["NewArrival", "dashboard"].map(e=>
    <li className=" bg-red-50 h-14  py-6 flex items-center pl-4 rounded-lg">
{e}
    </li>

  )}
  </ul>

        </SheetContent>
      </Sheet>
      
    )
  }