"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getItemById } from '@/fetch/fetchAPIS';
import { CartItems } from '@/db/schema';

interface Product {
    brand: string;
    product: string;
    pd_picture: string;
    dscnt_price: string | null;
    pd_strike: string | null;
    pd_dscnt_price: string | null;
    item_spec: object;
    image_urls: string[];
    comments: string[] | null;
    product_id: string;
    seller_name: string;
    sizes: string[];
    product_desc: string;
    product_title: string;
    pd_material: string;
    price: string;
    ratings: string | null;
    rating_count: string | null;
    pdp_name: string;
}

interface CartItemWithDetails extends CartItems {
    productDetails: Product;
}

const CartPage = ({ cartItems }: { cartItems: CartItems[] }) => {
    const [cartItemsWithDetails, setCartItemsWithDetails] = useState<CartItemWithDetails[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const itemsWithDetails = await Promise.all(
                    cartItems.map(async (item) => {
                        const productDetails = await getItemById("", item.pdId);
                        return { ...item, productDetails };
                    })
                );
                setCartItemsWithDetails(itemsWithDetails);
         

                const newTotal = itemsWithDetails.reduce((sum, item) => {
                    const price = parseFloat(item.productDetails.price.replace(/[^0-9.-]+/g, ""));
                    return sum + price * item.quantity;
                }, 0);
                setTotal(newTotal);

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching product details:', error);
                setIsLoading(false);
            }
        };

        fetchProductDetails();
    }, [cartItems]);

    useEffect(()=>{
console.log(cartItemsWithDetails)
    }, [cartItemsWithDetails])

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            {cartItemsWithDetails.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    {cartItemsWithDetails.map((item) => (
                        <Card key={item.pdId} className="mb-4"  onClick={() => router.push(`/address/${item.productDetails.product_id}`)}>
                            <CardContent className="flex items-center p-4">
                                <Image 
                                    src={item.productDetails.image_urls[0]}
                                    alt={item.productDetails.pdp_name}
                                    width={100}
                                    height={100}
                                    className="object-cover rounded-md mr-4"
                                />
                                <div className="flex-grow">
                                    <CardTitle className="text-lg font-semibold">{item.productDetails.product_title}</CardTitle>
                                    <p className="text-sm text-gray-600">{item.productDetails.brand}</p>
                                    <p className="text-sm">Size: {item.size}</p>
                                    <p className="text-sm">Quantity: {item.quantity}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold">{item.productDetails.price}</p>
                                    {item.productDetails.dscnt_price && (
                                        <p className="text-sm text-gray-500 line-through">{item.productDetails.pd_strike}</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    <Separator className="my-4" />
                    <div className="flex justify-between items-center">
                        <p className="text-xl font-bold">Total: RS.{total.toFixed(2)}</p>
                        {/* <Button onClick={() => router.push(`/address/${pd.product_id}`)} className="bg-blue-500 hover:bg-blue-600 text-white">
                            Proceed to Checkout
                        </Button> */}
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;