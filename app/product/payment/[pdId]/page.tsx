"use client"
import CheckoutForm from '@/components/CheckoutForm'
import { env } from '@/env';
import { getItemById } from '@/fetch/fetchAPIS';
import { Product } from '@/interfaces/interface';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import { StripeElementsOptions } from '@stripe/stripe-js';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

type Props = { params: { pdId: string } }
const cleanupPrice = (priceString:string) => {
  // Extract only the digits from the string
  const numericString = priceString.replace(/[^0-9]/g, '');
  
  // Convert the string to a number
  const price = parseInt(numericString, 10);
  
  // Return the number, or 0 if the conversion resulted in NaN
  return isNaN(price) ? 0 : price;
};

 
const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
export default function Page({ params }: Props) {
  console.log(params.pdId)
  const [pd, setPd] = useState<Product>()
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    async function fetchPd() {
      try {
        const fetchedPd = await getItemById("", params.pdId);
        setPd(fetchedPd);
        // Extract the numeric price value
        console.log(cleanupPrice(fetchedPd.price));
        const priceValue = (cleanupPrice(fetchedPd.price) * Number(localStorage.getItem("quantity")))
        setOptions(prevOptions => ({
          ...prevOptions,
          amount: priceValue,
        }));

        console.log(fetchedPd);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }

    fetchPd();
  }, [params.pdId]);

  useEffect(()=>{
    setQuantity(Number(localStorage.getItem("quantity")) || 1)
  }, [])
  const [options, setOptions] = useState<StripeElementsOptions>({
    mode: 'payment',
    amount: 0,
    currency: 'inr',
    appearance: {
      theme: 'stripe',
    },
  })
  return (
    <div className='pt-20 px-20 grid grid-cols-2 gap-x-5 place-content-start max-w-[1000px]' >
      <div>

        <Image src={pd?.image_urls[0] || ''} width={500}
          height={500}
          alt="Picture of the author" />

      </div>
      <div className='flex flex-col  text-lg capitalize' >
        <section className='mb-10'>
          <h1>
            {pd?.brand}
          </h1>
          <h2>
            {pd?.pdp_name}
          </h2>
          <h2 ><b>quantity: </b>{quantity}</h2>
          <h2 ><b>size: </b>{localStorage.getItem("size")}</h2>
          {pd?.pd_dscnt_price &&
            <h2 className='text-red-500'>discounted price {pd?.pd_dscnt_price} <br /></h2>
          }

          <h2><b>pay:</b> <span className='text-red-500'>{pd && cleanupPrice(pd.price)* quantity}</span></h2>

        </section>
        {pd &&
          <Elements stripe={stripePromise} options={options} >
            <CheckoutForm amount={cleanupPrice(pd.price) * quantity} product={pd} />
          </Elements>
        }
      </div>
    </div>
  )
}