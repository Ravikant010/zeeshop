import { Stripe } from 'stripe';
import stripe from '@/lib/stripe';

export default async function PaymentSuccess({ searchParams }: { searchParams: { payment_intent_client_secret: string | undefined } }) {
  const clientSecret = searchParams.payment_intent_client_secret;

  if (!clientSecret) {
    return <h2 className='pt-32'>Error: No payment intent client secret found in the URL.</h2>;
  }

  try {
    const paymentIntentId = clientSecret.split('_secret_')[0];
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    console.log("patmentintent", paymentIntent)
    

    if (!paymentIntent) {
      return <h2 className='pt-32'>Error: Unable to retrieve payment intent.</h2>;
    }

    switch (paymentIntent.status) {
      case 'succeeded':
        const { amount, currency, description, receipt_email, status } = paymentIntent;
        return (<div className='pt-32'><h2>Payment Details</h2>
        <p><strong>Status:</strong> {status}</p>
        <p><strong>Amount:</strong> {(amount / 100).toFixed(2)} {currency.toUpperCase()}</p>
        <p><strong>Description:</strong> {description ? description : 'N/A'}</p>
        <p><strong>Receipt Email:</strong> {receipt_email ? receipt_email : 'N/A'}</p>
         <h2 className='pt-32'>Payment successful! </h2>;
         </div> )
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
