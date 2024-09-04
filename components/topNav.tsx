"use client"
import React, { useState, useEffect } from 'react'
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
  imageBase64: string
}

function TopNav({username, userId, imageBase64}: Props) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768)
    }
    
    window.addEventListener('resize', handleResize)
    handleResize()
    
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if(pathname.split('/')[1] === 'sign-up' || pathname.split('/')[1] === 'sign-in' || pathname.split('/')[1] === 'account')
    return null

  const navItems = [
    { name: "Category", component: <CategoryPopover text="Category" key="Category" /> },
    { name: "Brands", component: <BrandsPopover text="Brands" key="Brands" /> },
    { name: "about", link: "/about" },
    { name: "cart", link: "/cart" },
  ]

  return (
    <div className="fixed w-full z-20 bg-[#fdfffc] border-b-[1px] border-black top-0">
      <div className="w-full py-2 px-4 flex justify-between items-center">
        <Link href={"/"} className="text-lg font-bold">
          ZeeShop
        </Link>
        
        {isDesktop ? (
          <div className="flex items-center space-x-6 capitalize font-normal text-black">
            {navItems.map((item) =>
              item.component ?
                item.component :
                <Link href={item.link} key={item.name}>{item.name}</Link>
            )}
            <Link href='/account'>
              {userId && <UserAvatar username={username} userId={userId} imageBase64={imageBase64}/>}
            </Link>
          </div>
        ) : (
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-black">
            {isMobileMenuOpen ? 'Close' : 'Menu'}
          </button>
        )}
      </div>

      {!isDesktop && isMobileMenuOpen && (
        <div className="bg-[#fdfffc] border-t border-black">
          {navItems.map((item) => (
            <div key={item.name} className="py-2 px-4 capitalize">
              {item.component ?
                item.component :
                <Link href={item.link}>{item.name}</Link>
              }
            </div>
          ))}
          <div className="py-2 md:px-4">
            <Link href='/account'>
              <UserAvatar username={username} userId={userId} imageBase64={imageBase64}/>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default TopNav