import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, User, Package, Settings, CreditCard } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import SignOut from "@/components/Signout"
import { getCurrentUser } from '@/lib/session'
import { getProfile } from '@/data-access/profile'
import { getOrdersByUserId } from '@/data-access/order'
import { OrdersTable } from '@/components/OrderTable'

type Props = {}

export default async function ProfilePage({ }: Props) {
  const user = await getCurrentUser()

  if (!user) return null
  const orders= await  getOrdersByUserId(user.id)
  console.log(orders)
  const profile = await getProfile(user.id)

  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 absolute -top-14'>
      <header className='sticky top-0 z-10 flex justify-between items-center w-full p-4 bg-white/80 backdrop-blur-sm shadow-sm'>
        <Link href='/' className='h-full w-full'>
          <Button variant='ghost' className='flex items-center space-x-2 text-indigo-600 hover:text-indigo-800'>
            <ChevronLeft className='h-4 w-4' />
            <span className='hidden sm:inline'>Back to Home</span>
          </Button>
        </Link>
        <SignOut />
      </header>

      <main className='container mx-auto px-4 py-8'>
        <Card className='mb-8 overflow-hidden bg-white/50 backdrop-blur-sm'>
          <div className='h-32 bg-gradient-to-r from-indigo-500 to-purple-600'></div>
          <CardHeader className='flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 -mt-16 relative'>
            <Avatar className='h-32 w-32 ring-4 ring-white'>
              <AvatarImage src={profile.image || ''} alt={user.username} />
              <AvatarFallback><User className='h-16 w-16' /></AvatarFallback>
            </Avatar>
            <div className='text-center sm:text-left'>
              <CardTitle className='text-2xl font-bold'>{user.username}</CardTitle>
              <p className='text-sm text-gray-600'>Member since {new Date().getFullYear()}</p>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="orders" className='bg-white rounded-lg shadow'>
          <TabsList className='w-full justify-start border-b'>
            <TabsTrigger value="orders" className='flex items-center space-x-2'>
              <Package className='h-4 w-4' />
              <span>Orders</span>
    
            </TabsTrigger>
            <TabsTrigger value="settings" className='flex items-center space-x-2'>
              <Settings className='h-4 w-4' />
              <span>Settings</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className='flex items-center space-x-2'>
              <CreditCard className='h-4 w-4' />
              <span>Billing</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="orders" className='p-4'>
            <h3 className='text-lg font-semibold mb-4'>

<OrdersTable orders={orders} />

            </h3>
            {/* Add your orders content here */}
            {/* <p className='text-gray-600'>You have no orders yet.</p> */}
          </TabsContent>
          <TabsContent value="settings" className='p-4'>
            <h3 className='text-lg font-semibold mb-4'>Account Settings</h3>
            {/* Add settings content here */}
            <p className='text-gray-600'>Manage your account settings here.</p>
          </TabsContent>
          <TabsContent value="billing" className='p-4'>
            <h3 className='text-lg font-semibold mb-4'>Billing Information</h3>
            {/* Add billing content here */}
            <p className='text-gray-600'>Manage your billing information and subscriptions.</p>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}