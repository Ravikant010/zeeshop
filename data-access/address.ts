"use server"
import { AddressFormValues } from "@/components/adressForm";
import { Address, addresses, db, users } from "@/db/schema"
import { UserId } from "@/use-cases/types"
import { eq } from "drizzle-orm"

export async function getUserAddress(userId:UserId){
    const [address] = await db.select().from(addresses).where(eq(addresses.userId, userId))
    return address;
    }

    export async function getUserAddressByOrderId(addressId:number){
      const [address] = await db.select().from(addresses).where(eq(addresses.id, addressId))
      return address;
      }

    export async function setAddress(userId: UserId, addressData: AddressFormValues) {
        // First, check if the user already has an address
        const existingAddress = await getUserAddress(userId);
      
        if (existingAddress) {
          // If address exists, update it
          const [updatedAddress] = await db
            .update(addresses)
            .set({
              
              streetAddress: addressData.streetAddress,
              city: addressData.city,
              state: addressData.state,
              postalCode: addressData.postalCode,
              country: addressData.country,
            })
            .where(eq(addresses.userId, userId))
            .returning();
      
          return updatedAddress;
        } else {
          // If address doesn't exist, insert a new one
          const [newAddress] = await db
            .insert(addresses)
            .values({
              userId: userId,
              streetAddress: addressData.streetAddress,
              city: addressData.city,
              state: addressData.state,
              postalCode: addressData.postalCode,
              country: addressData.country,
            })
            .returning();
      
          return newAddress;
        }
      }