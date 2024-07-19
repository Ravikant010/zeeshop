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

export async function POST(request: Request) {
  try {
    const { amount } = await request.json();
    const user = await getCurrentUser() as {username:string, id:number}
    if (!user)
      return redirect("/sign-in")
    const address = await getUserAddress(user.id)
    console.log(user)
const User = await getUser(user.id)
    // Simulate customer data for test mode
    const testCustomerData = {
      email: User.email,
      name: user.username,
      address: {
        line1: address.streetAddress,
        city: address.city,
        state: address.state,
        postal_code: address.postalCode,
        country: address.country, // Using India as the country code
      },
    };

    // Create or retrieve a test customer
    const customer = await createOrRetrieveCustomer(testCustomerData);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      description: 'Software development services',
      customer: customer.id,
      metadata: {
        order_id: `test_order_${Date.now()}`, // Generate a unique test order ID
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}

async function createOrRetrieveCustomer(customerData: any) {
  // Check if the test customer already exists
  const existingCustomers = await stripe.customers.list({
    email: customerData.email,
    limit: 1,
  });

  if (existingCustomers.data.length > 0) {
    // Customer exists, update their information
    return await stripe.customers.update(existingCustomers.data[0].id, {
      name: customerData.name,
      address: customerData.address,
    });
  } else {
    // Create a new test customer
    return await stripe.customers.create({
      email: customerData.email,
      name: customerData.name,
      address: customerData.address,
    });
  }
}