
import { usePathname } from 'next/navigation'
import React from 'react'

type Props = {}

// export default function Page({}: Props) {
//     const pathname = usePathname()
//    console.log(pathname.split("/")[2])
//   return (
//     <div className=''>{pathname.split("/")[2]}</div>
//   )
// }


import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import CheckoutForm from '@/components/CheckoutForm';
import { validateRequest } from '@/lib/validate_lucia_user';
import { redirect } from 'next/navigation';
import {useEffect, useState} from "react"
import { useRouter } from 'next/navigation';
import {useSession} from "@/lib/lucia_session_provider"
import { getCurrentUser } from '@/lib/session';
import { AddressForm } from '@/components/adressForm';
import CheckComponent from '@/components/CheckComponent';
import { getUserAddress } from '@/data-access/address';


export default async function AddressPage({params}:{params:{pdId:string}}) {

const user = await  getCurrentUser()
// const router= useRouter()
if(!user)
  return redirect('/sign-in')
const user_address = await getUserAddress(user.id)

// const user_address= await 
  return (
    <CheckComponent user_address = {user_address} userId = {user.id} pdId={params.pdId} />
    
  );
}