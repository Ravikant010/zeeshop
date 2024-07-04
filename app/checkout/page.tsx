'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import CheckoutForm from '@/components/CheckoutForm';
import { validateRequest } from '@/lib/validate_lucia_user';
import { redirect } from 'next/navigation';
import {useEffect, useState} from "react"
import { useRouter } from 'next/navigation';
import {useSession} from "@/lib/lucia_session_provider"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Checkout() {
  const options: StripeElementsOptions = {
    mode: 'payment',
    amount: 1000,
    currency: 'usd',
    appearance: {
      theme: 'stripe',
    },
  };
const {user} = useSession()
const router= useRouter()
if(!user)
  return router.push('/')
  return (<div className='pt-20 min-h-screen'>
    <Elements stripe={stripePromise} options={options} >
    <CheckoutForm amount={1000} />
    </Elements>
    </div>
  );
}