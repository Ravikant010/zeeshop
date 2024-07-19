"use client"

import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { setAddress } from "@/data-access/address"
import { UserId } from "@/use-cases/types"
import { useToast } from "./ui/use-toast"
import { useRouter } from "next/navigation"

const addressSchema = z.object({
 // Optional because it might not be present when creating a new address

  streetAddress: z.string().min(1, "Street address is required").max(255),
  city: z.string().min(1, "City is required").max(100),
  state: z.string().min(1, "State is required").max(100),
  postalCode: z.string().min(1, "Postal code is required").max(20),
  country: z.string().min(1, "Country is required").max(100),
});

export type AddressFormValues = z.infer<typeof addressSchema>;



export function AddressForm({userId}:{userId: UserId}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
const router = useRouter()
  const { toast } = useToast()
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      streetAddress: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  })

  async function onSubmit(values: AddressFormValues) {
    setIsSubmitting(true)
    try {
      const userAddress = await setAddress(userId, values)
      if (!userAddress) {
        throw new Error("Failed to set address")
      }
      console.log("Address submitted:", userAddress);
      toast({
        title: "Success",
        description: "Address submitted successfully!",
        variant: "default",
      })
    } catch (error) {
      console.error("Error submitting address:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit address. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
      router.push('/payment')
     
    }
  }

  // ... rest of the component ...


  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="streetAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Street Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St" {...field} className="w-full" />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500">
                    Enter your street address.
                  </FormDescription>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">City</FormLabel>
                  <FormControl>
                    <Input placeholder="New York" {...field} className="w-full" />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">State</FormLabel>
                  <FormControl>
                    <Input placeholder="NY" {...field} className="w-full" />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Postal Code</FormLabel>
                  <FormControl>
                    <Input placeholder="10001" {...field} className="w-full" />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel className="text-sm font-medium">Country</FormLabel>
                  <FormControl>
                    <Input placeholder="United States" {...field} className="w-full" />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  )
}