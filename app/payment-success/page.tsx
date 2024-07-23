// // import { Stripe } from 'stripe';
// // import stripe from '@/lib/stripe';

// // export default async function PaymentSuccess({ searchParams }: { searchParams: { payment_intent_client_secret: string | undefined } }) {
// //   const clientSecret = searchParams.payment_intent_client_secret;

// //   if (!clientSecret) {
// //     return <h2 className='pt-32'>Error: No payment intent client secret found in the URL.</h2>;
// //   }

// //   try {
// //     const paymentIntentId = clientSecret.split('_secret_')[0];
// //     const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
// //     console.log("patmentintent", paymentIntent)
    

// //     if (!paymentIntent) {
// //       return <h2 className='pt-32'>Error: Unable to retrieve payment intent.</h2>;
// //     }

// //     switch (paymentIntent.status) {
// //       case 'succeeded':
// //         const { amount, currency, description, receipt_email, status } = paymentIntent;
// //         return (<div className='pt-32'><h2>Payment Details</h2>
// //         <p><strong>Status:</strong> {status}</p>
// //         <p><strong>Amount:</strong> {amount} {currency.toUpperCase()}</p>
// //         <p><strong>Description:</strong> {description ? description : 'N/A'}</p>
// //         <p><strong>Receipt Email:</strong> {receipt_email ? receipt_email : 'N/A'}</p>
// //          <h2 className='pt-32'>Payment successful! </h2>;
// //          </div> )
// //       case 'processing':
// //         return <h2 className='pt-32'>Payment is still processing...</h2>;
// //       case 'requires_payment_method':
// //         return <h2 className='pt-32'>Payment failed. Please try another payment method.</h2>;
// //       default:
// //         return <h2 className='pt-32'>Payment status: {paymentIntent.status}</h2>;
// //     }
// //   } catch (error) {
// //     console.error('Error retrieving payment intent:', error);
// //     return <h2 className='pt-32'>Error: Unable to retrieve payment status. Please try again later.</h2>;
// //   }
// // }
// 'use client'
// import { useState, useEffect } from 'react';
// import stripe from '@/lib/stripe';
// import { CheckCircleIcon, XCircleIcon, ClockIcon } from 'lucide-react';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";

// interface PaymentDetails {
//   status: string;
//   amount: number;
//   currency: string;
//   description: string;
//   receipt_email: string;
// }

// export default function PaymentSuccess({ searchParams }: { searchParams: { payment_intent_client_secret: string | undefined } }) {
//   const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchPaymentIntent = async () => {
//       const clientSecret = searchParams.payment_intent_client_secret;
//       if (!clientSecret) {
//         setError('No payment intent client secret found in the URL.');
//         return;
//       }

//       try {
//         const paymentIntentId = clientSecret.split('_secret_')[0];
//         const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
//         setPaymentDetails({
//           status: paymentIntent.status,
//           amount: paymentIntent.amount,
//           currency: paymentIntent.currency,
//           description: paymentIntent.description || 'N/A',
//           receipt_email: paymentIntent.receipt_email || 'N/A',
//         });
//       } catch (error) {
//         console.error('Error retrieving payment intent:', error);
//         setError('Unable to retrieve payment status. Please try again later.');
//       }
//     };

//     fetchPaymentIntent();
//   }, [searchParams.payment_intent_client_secret]);

//   if (error) {
//     return <ErrorMessage message={error} />;
//   }

//   if (!paymentDetails) {
//     return <LoadingSpinner />;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <Card className="w-full max-w-md">
//         <CardHeader>
//           <div className="flex justify-center mb-4">
//             <PaymentStatusIcon status={paymentDetails.status} />
//           </div>
//           <CardTitle className="text-2xl font-bold text-center">
//             Payment {paymentDetails.status === 'succeeded' ? 'Successful' : 'Status'}
//           </CardTitle>
//           <CardDescription className="text-center">
//             {getStatusDescription(paymentDetails.status)}
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <PaymentDetailsTable details={paymentDetails} />
//         </CardContent>
//         <CardFooter className="flex justify-center">
//           <Button>Back to Dashboard</Button>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }

// function PaymentStatusIcon({ status }: { status: string }) {
//   switch (status) {
//     case 'succeeded':
//       return <CheckCircleIcon className="h-12 w-12 text-green-500" />;
//     case 'processing':
//       return <ClockIcon className="h-12 w-12 text-yellow-500" />;
//     default:
//       return <XCircleIcon className="h-12 w-12 text-red-500" />;
//   }
// }

// function getStatusDescription(status: string) {
//   switch (status) {
//     case 'succeeded':
//       return 'Your payment has been processed successfully.';
//     case 'processing':
//       return 'Your payment is currently being processed.';
//     case 'requires_payment_method':
//       return 'The payment requires a new payment method. Please try again.';
//     default:
//       return `Payment status: ${status}`;
//   }
// }

// function PaymentDetailsTable({ details }: { details: PaymentDetails }) {
//   return (
//     <Table>
//       <TableBody>
//         {Object.entries(details).map(([key, value]) => (
//           <TableRow key={key}>
//             <TableCell className="font-medium capitalize">{key.replace('_', ' ')}</TableCell>
//             <TableCell className="text-right">
//               {key === 'amount' ? (
//                 <Badge variant="outline">
//                   {(value / 100).toFixed(2)} {details.currency.toUpperCase()}
//                 </Badge>
//               ) : key === 'status' ? (
//                 <Badge variant={getStatusVariant(value as string)}>{value}</Badge>
//               ) : (
//                 value
//               )}
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// }

// function getStatusVariant(status: string): "default" | "secondary" | "destructive" | "outline" {
//   switch (status) {
//     case 'succeeded':
//       return 'default';
//     case 'processing':
//       return 'secondary';
//     case 'requires_payment_method':
//       return 'destructive';
//     default:
//       return 'outline';
//   }
// }

// function ErrorMessage({ message }: { message: string }) {
//   return (
//     <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center p-4">
//       <Alert variant="destructive" className="max-w-md">
//         <XCircleIcon className="h-4 w-4" />
//         <AlertTitle>Error</AlertTitle>
//         <AlertDescription>{message}</AlertDescription>
//       </Alert>
//     </div>
//   );
// }

// function LoadingSpinner() {
//   return (
//     <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
//       <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
//     </div>
//   );


import { Stripe } from 'stripe';
import stripe from '@/lib/stripe';
import PaymentSuccessPage from '@/components/PaymentSuccess';

export default async function PaymentSuccess({ searchParams }: { searchParams: { payment_intent_client_secret: string | undefined } }) {
  const clientSecret = searchParams.payment_intent_client_secret;

  if (!clientSecret) {
    return <h2 className='pt-32'>Error: No payment intent client secret found in the URL.</h2>;
  }

  try {
    const paymentIntentId = clientSecret.split('_secret_')[0];
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentIntent.payment_method as string );

    console.log("patmentintent", paymentMethod)
    

    if (!paymentIntent) {
      return <h2 className='pt-32'>Error: Unable to retrieve payment intent.</h2>;
    }

    switch (paymentIntent.status) {
      case 'succeeded':
        const { amount, currency, description, receipt_email, status, metadata } = paymentIntent;
        console.log(metadata)
        return (<PaymentSuccessPage orderId = {metadata.order_id} amount = {amount} currency = {currency} description = {description || ""} status = {status} card_last_4 = {paymentMethod.card?.last4!} />)
      case 'processing':
        return <h2 className='pt-32'>Payment is still processing...</h2>;
      case 'requires_payment_method':
        return <h2 className='pt-32'>Payment failed. Please try another payment method.</h2>;
      default:
        return <h2 className='pt-32'>Payment status: {paymentIntent.status}</h2>;
    }
  } catch (error) {
    console.error('Error retrieving payment intent:', error);
    return <h2 className='pt-32'>Error: Unable to retrieve payment status. Please try again later.</h2>;
  }
}