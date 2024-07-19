'use client';

import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { CreditCard, Loader2 } from 'lucide-react';
import { Product } from '@/interfaces/interface';

interface CheckoutFormProps {
  amount: number;
}
interface PayButtonProps {
  amount: number
  currency: string
  type:"submit" | "reset" 
  stripe:any;
  processing:boolean
}

export function PayButton({ amount, currency, type, processing, stripe }: PayButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  // const handleClick = async () => {
  //   setIsLoading(true)
  //   try {
  //     await onPayClick()
  //   } catch (error) {
  //     console.error('Payment error:', error)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  return (
    <Button
    
      type = {type}
      className={cn(
        "w-full  mt-10 py-5",
        "bg-gradient-to-r from-blue-500 to-purple-600",
        "hover:from-blue-600 hover:to-purple-700",
        "text-white font-semibold",
        "px-6",
        "rounded-full",
        "shadow-lg hover:shadow-xl",
        "transition-all duration-300",
        "flex items-center justify-center",
        "space-x-2",
        { "opacity-75 cursor-not-allowed": isLoading }
      )}
      disabled={!stripe || processing}
    >
      {processing ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          <CreditCard className="h-5 w-5" />
          <span>Pay {(amount / 100).toFixed(2)} {currency.toUpperCase()}</span>
        </>
      )}
    </Button>
  )
}

export default function CheckoutForm({ amount }: {amount:number}) {
  console.log("amount", amount)
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  const [pd, setPd] = useState<Product>()
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) return;

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message || 'An error occurred');
      setProcessing(false);
      return;
    }

    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ amount }),
    });

    const { clientSecret } = await response.json();

    const { error: paymentError } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
    });

    if (paymentError) {
      setError(paymentError.message || 'An error occurred');
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {error && <div>{error}</div>}
      {/* <button type="submit" disabled={!stripe || processing}>
        Pay
      </button> */}
      <PayButton type='submit'  currency="usd"  amount={amount} processing = {processing} stripe = {stripe} />
    </form>
  );
}