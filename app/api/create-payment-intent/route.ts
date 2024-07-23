// import { NextResponse } from 'next/server';
// import stripe from '@/lib/stripe';

// export async function POST(request: Request) {
//   try {
//     const { amount } = await request.json();
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency: 'usd',
//       description: 'Software development services',

//       // automatic_payment_methods: { enabled: true },
//     });

//     return NextResponse.json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     console.log("errr", error)
//     if (error instanceof Error) {
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     }
//     return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import stripe from '@/lib/stripe';
import { getCurrentUser } from '@/lib/session';
import { getUserAddress } from '@/data-access/address';
import { redirect } from 'next/navigation'
import { getUser } from '@/data-access/users';
import { createOrder } from '@/data-access/order';

// export async function POST(request: Request) {
//   try {
//     const { amount, pdId , size, quantity} = await request.json();
//     console.log( amount, pdId , size, quantity)
//     const user = await getCurrentUser() as {username:string, id:number}
//     if (!user)
//       return redirect("/sign-in")
//     const address = await getUserAddress(user.id)
//     console.log(user)
// const User = await getUser(user.id)
//     // Simulate customer data for test mode
//     const testCustomerData = {
//       email: User.email,
//       name: user.username,
//       address: {
//         line1: address.streetAddress,
//         city: address.city,
//         state: address.state,
//         postal_code: address.postalCode,
//         country: address.country,
//       },
//     };

//     // Create or retrieve a test customer
//     const customer = await createOrRetrieveCustomer(testCustomerData);
//  const order =  await createOrder(user.id, pdId, amount, quantity, size )
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency: 'inr',
//       description: 'fashion cloth purchasing',
//       customer: customer.id,
//       metadata: {
//         order_id: `${order.orderId + Date.now()}`, // Generate a unique test order ID
//       },
//     });

//     return NextResponse.json({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     if (error instanceof Error) {
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     }
//     return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
//   }
// }

// async function createOrRetrieveCustomer(customerData: any) {
//   // Check if the test customer already exists
//   const existingCustomers = await stripe.customers.list({
//     email: customerData.email,
//     limit: 1,
//   });

//   if (existingCustomers.data.length > 0) {

//     return await stripe.customers.update(existingCustomers.data[0].id, {
//       name: customerData.name,
//       address: customerData.address,
//     });
//   } else {
//     return await stripe.customers.create({
//       email: customerData.email,
//       name: customerData.name,
//       address: customerData.address,
//     });
//   }
// }


import { z } from 'zod';
import { db, payments } from '@/db/schema';

const PaymentRequestSchema = z.object({
  amount: z.number().positive(),
  pdId: z.string(),
  size: z.string(),
  quantity: z.number().positive().int()
});

interface CustomerData {
  email: string;
  name: string;
  address: {
    line1: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedBody = PaymentRequestSchema.parse(body);
   

    const user = await getCurrentUser() as {username: string, id:number};
    if (!user) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    const { amount, pdId, size, quantity } = validatedBody;
    console.log(amount, pdId, size, quantity)
    const [address, userDetails] = await Promise.all([
      getUserAddress(user.id),
      getUser(user.id)
    ]);

    const customerData: CustomerData = {
      email: userDetails.email,
      name: user.username,
      address: {
        line1: address.streetAddress,
        city: address.city,
        state: address.state,
        postal_code: address.postalCode,
        country: address.country,
      },
    };

    const [customer, order] = await Promise.all([
      createOrRetrieveCustomer(customerData),
      createOrder(user.id, Number(pdId), amount, quantity, size)
    ]);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: (amount*100),
      currency: 'inr',
      description: 'Fashion cloth purchase',
      customer: customer.id,
      metadata: {
        order_id: `${order.orderId}-${Date.now()}`,
      },
      receipt_email: userDetails.email
    });
    
await db.insert(payments).values({
  orderId: order.orderId
  ,
  amount:String(amount),
  status: "paid"
})
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    return handleError(error);
  }
}

async function createOrRetrieveCustomer(customerData: CustomerData) {
  const existingCustomers = await stripe.customers.list({
    email: customerData.email,
    limit: 1,
  });

  if (existingCustomers.data.length > 0) {
    return existingCustomers.data[0];
  }

  return stripe.customers.create(customerData);
}

function handleError(error: unknown): NextResponse {
  console.error('Payment processing error:', error);
  
  if (error instanceof z.ZodError) {
    return NextResponse.json({ error: 'Invalid input data', details: error.errors }, { status: 400 });
  }
  
  if (error instanceof stripe.errors.StripeError) {
    return NextResponse.json({ error: error.message }, { status: error.statusCode || 500 });
  }

  return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
}