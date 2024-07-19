"use client"
import React, { useEffect, useState } from 'react'
import { AddressForm } from './adressForm'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js'
import { Address } from '@/db/schema'
import { UserId } from '@/use-cases/types'
import { usePathname, useRouter } from 'next/navigation'
import { Separator } from '@radix-ui/react-separator'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from './ui/input'
import { Label } from './ui/label'
import { getItemById } from '@/fetch/fetchAPIS'
import Image from 'next/image'
import { Product } from '@/interfaces/interface'
type Props = {
  user_address: Address;
  userId: UserId;
  pdId: string
}


export default function CheckComponent({ user_address, userId, pdId }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<"db" | "add new" | ''>('');
  console.log(user_address)
  const [pd, setPd] = useState<Product>()
  useEffect(() => {
    async function fetchPd() {
      const pd = await getItemById("", pdId)
      setPd(pd)
    }
    fetchPd()
  }, [])

  function isAddressSelected(type: "db" | "add new") {
    setSelectedAddress(type)
  }
  const router = useRouter()
  return (
    <div className='pt-20 min-h-screen px-20'>
      {
        selectedAddress === "add new" && <AddressForm userId={userId} />
      }
      {/* {
        selectedAddress === "db" && <>
          <h1>{pd?.brand}</h1>
          <Image src={pd?.image_urls[0] || ''} width={500}
            height={500}
            alt="Picture of the author" />
        </>
      } */}
      {!selectedAddress && user_address ?
        <div className='w-full h-full grid grid-cols-2 gap-x-5'>
          <Card className="w-[350px]  hover:border-green-500 hover:border-2" onClick={() => {
        router.push(`/product/payment/${pdId}`)
          }}>
            <CardHeader>
              <CardTitle>Your Addresses</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className='capitalize list-none'>
                <li>street address: {user_address.streetAddress}</li>
                <li>city: {user_address.city}</li>
                <li>state: {user_address.state}</li>
                <li>postal code: {user_address.postalCode}</li>
                <li>country: {user_address.country}</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="w-[350px] hover:border-green-500 hover:border-2" onClick={() => {
            isAddressSelected("add new")
          }}>
            <CardHeader className='w-full h-full '>
              <CardTitle className='text-center  w-full h-full flex items-center justify-center'>Add New</CardTitle>
            </CardHeader>
          </Card>
        </div> :
        (selectedAddress !== "add new" && selectedAddress !== "db") &&
        <AddressForm userId={userId} />}

    </div>
  )
}