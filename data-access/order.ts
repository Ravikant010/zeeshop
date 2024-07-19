"use server"
import {db, orderItems, orders, users } from "@/db/schema"
import { UserId } from "@/use-cases/types"
import { eq } from "drizzle-orm"
import { getUserAddress } from "./address"

export async function createOrder(userId:UserId, productId:number, quantity:number, price: number){
   const [order_item] =  await db.insert(orderItems).values({
productId,
quantity,
price
    }).returning()
    const address = await getUserAddress(userId)
   const [order] =  await db.insert(orders).values({
        orderItemId: order_item.orderItemId,
        userId,
        addressId: address.id
        ,
        status: "ordered"
    }).returning()
    return order
} 