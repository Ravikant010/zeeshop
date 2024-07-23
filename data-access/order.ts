"use server"
import {db, orderItems, orders, users } from "@/db/schema"
import { UserId } from "@/use-cases/types"
import { eq } from "drizzle-orm"
import { getUserAddress } from "./address"

export async function createOrder(userId:UserId, productId:number, quantity:number, price: number, size:string){
   const [order_item] =  await db.insert(orderItems).values({
productId,
quantity,
price:String(price),
size
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

export async function getOrdersByUserId(userId:UserId) {
    const order = await db.select().from(orders).where(eq(orders.userId, userId))
    return order;
}