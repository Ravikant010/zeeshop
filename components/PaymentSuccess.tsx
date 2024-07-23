import React from 'react';
import { Check, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

interface PaymentSuccessPageProps {
    orderId: string;
    amount: number;
    currency: string;
    description: string;
    status: string;
    card_last_4:string
  }

const PaymentSuccessPage = ({
    orderId,
    amount,
    currency,
    description,
    status,
    card_last_4
  }:PaymentSuccessPageProps
) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto my-4 bg-green-100 rounded-full p-3 w-16 h-16 flex items-center justify-center">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your fashion journey begins now!
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 mb-1">Order Id</p>
            <p className="text-lg font-semibold text-gray-700">{orderId}</p>
          </div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-sm text-gray-500">Amount paid</p>
              <p className="text-xl font-bold text-gray-800">{currency} {amount/100}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Payment method</p>
              <p className="text-gray-700">Visa ending in {card_last_4}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
            <ShoppingBag className="mr-2 h-4 w-4" /> View Order Details
          </Button>
          <Link href = "/" className="w-full" ><Button variant="outline" className="w-full" >
            Continue Shopping <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentSuccessPage;