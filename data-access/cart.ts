"use server"
import { eq, and } from 'drizzle-orm';
import { db } from '@/db/schema'; // Assuming you have a db.ts file where you initialize your Drizzle client
import { cartItems } from '@/db/schema' // Importing the schema we defined earlier

interface CreateCartItemParams {
  userId: number;
  orderItemId: number;
  size: string;
  quantity: number;
}

export async function addToCart(userId: number, size: string, quantity: number = 1, pdId:string) {
    const [newItem] = await db.insert(cartItems).values({
      userId,
      size,
      quantity,
      pdId
    }).returning();
  
    return newItem;
  }
  
  // Function to get all cart items for a user
  export async function getCartItems(userId: number) {
    return db.select().from(cartItems).where(eq(cartItems.userId, userId));
  }
  
  // Function to update the quantity of a cart item
  export async function updateCartItemQuantity(itemId: number, quantity: number) {
    const [updatedItem] = await db
      .update(cartItems)
      .set({ quantity, updatedAt: new Date() })
      .where(eq(cartItems.id, itemId))
      .returning();
  
    return updatedItem;
  }
  
  // Function to remove an item from the cart
  export async function removeFromCart(itemId: number) {
    await db.delete(cartItems).where(eq(cartItems.id, itemId));
  }
  
  // Function to clear all items from a user's cart
  export async function clearCart(userId: number) {
    await db.delete(cartItems).where(eq(cartItems.userId, userId));
  }