// AddressPage.tsx
"use server"

import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/session';
import { getUserAddress, setAddress } from '@/data-access/address';
import CheckComponent from '@/components/CheckComponent';

export default async function AddressPage({params}:{params:{pdId:string}}) {
  const user = await getCurrentUser()
  
  if(!user)
    return redirect('/sign-in')
  
  const user_address = await getUserAddress(user.id)

  async function handleCreateAddress(address: {
    streetAddress: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }){
    'use server'
    if(user)
      await setAddress(user.id, address)  
  }

  return (
    <CheckComponent 
      user_address={user_address} 
      userId={user.id} 
      pdId={params.pdId} 
      handleCreateAddress={handleCreateAddress} 
    />
  );
}