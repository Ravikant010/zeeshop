// CheckComponent.tsx
"use client"

import React, { useState, useTransition } from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import Link from 'next/link';

interface Props {
  user_address: {
    streetAddress: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  } | null;
  userId: number;
  pdId: string;
  handleCreateAddress: (address: {
    streetAddress: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }) => Promise<void>
}

export function CheckComponent({ user_address, userId, pdId, handleCreateAddress }: Props) {
  const [selectedAddress, setSelectedAddress] = useState<"existing" | "new" | ''>('');
  const [newAddress, setNewAddress] = useState({
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });
  const [isPending, startTransition] = useTransition();

  const handleAddressSelection = (type: "existing" | "new") => {
    setSelectedAddress(type);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = () => {
    console.log("Submitting address:", selectedAddress === "new" ? newAddress : user_address);
    console.log("User ID:", userId);
    console.log("Product ID:", pdId);
  
    startTransition(() => {
      handleCreateAddress(selectedAddress === "new" ? newAddress : user_address!)
        .then(() => {
          // Handle successful address creation
          console.log("Address created successfully");
          // You might want to redirect or update UI here
        })
        .catch((error) => {
          // Handle error
          console.error("Error creating address:", error);
        });
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Choose Address</CardTitle>
          <CardDescription>Select an existing address or create a new one</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedAddress} onValueChange={handleAddressSelection} className="space-y-4">
            {user_address && (
              <div>
                <RadioGroupItem value="existing" id="existing" className="peer sr-only" />
                <Label
                  htmlFor="existing"
                  className="flex flex-col items-start justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span className="font-semibold w-full text-center mb-2">Use Existing Address</span>
                  <ul className='capitalize list-none'>
                    <li>street address: {user_address.streetAddress}</li>
                    <li>city: {user_address.city}</li>
                    <li>state: {user_address.state}</li>
                    <li>postal code: {user_address.postalCode}</li>
                    <li>country: {user_address.country}</li>
                  </ul>
                </Label>
              </div>
            )}
            <div>
              <RadioGroupItem value="new" id="new" className="peer sr-only" />
              <Label
                htmlFor="new"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span className="font-semibold">Create New Address</span>
              </Label>
            </div>
          </RadioGroup>
          {selectedAddress === "new" && (
            <div className="mt-4 space-y-2">
              <Input
                name="streetAddress"
                placeholder="Street Address"
                value={newAddress.streetAddress}
                onChange={handleInputChange}
              />
              <Input
                name="city"
                placeholder="City"
                value={newAddress.city}
                onChange={handleInputChange}
              />
              <Input
                name="state"
                placeholder="State"
                value={newAddress.state}
                onChange={handleInputChange}
              />
              <Input
                name="postalCode"
                placeholder="Postal Code"
                value={newAddress.postalCode}
                onChange={handleInputChange}
              />
              <Input
                name="country"
                placeholder="Country"
                value={newAddress.country}
                onChange={handleInputChange}
              />
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Link href={`/product/payment/${pdId}`} className="w-full ">
            <Button onClick={handleSubmit} className="w-full" disabled={isPending}>
              {isPending ? 'Processing...' : 'Proceed to Payment'}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default CheckComponent;