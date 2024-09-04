"use client"
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useToast } from './ui/use-toast'
import { addToCart } from '@/data-access/cart'
import { getCurrentUser } from '@/lib/session'
import { UserId } from '@/use-cases/types'
import { useRouter } from 'next/navigation'

type Props = {
    handleAddToCart: (e:React.MouseEvent)=>void
}

export default function AddToCart({pd_name,pdId, css, userId}:{pd_name: string, pdId:string, css?:string, userId:UserId}) {
    const { toast } = useToast();
const size:string = localStorage.getItem("size") as string
const quantity:number  = Number(localStorage.getItem("quantity"))
const router = useRouter()
const handleAddToCart =async(e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if(!size && !quantity)
       
            return toast({
                title: "please select size and quantity to add item in cart",
                description: pd_name
                
            });
    
      
        if(userId && size && quantity)
            {
                
     const item =  await addToCart(userId, size, quantity,pdId  )
     console.log(item, "item")
      return   toast({
        title: "Item Added into Cart",
        description: pd_name
    });
            }
      
    };

  return (
    <Button 
    className={ css ? css : "py-6 font-semibold"}
    onClick={(e:React.MouseEvent)=>{
        if(userId)
        handleAddToCart(e)
    else
    {
        toast({
            title:  "login required , redirecting..",
            description: pd_name
        });
        setTimeout(()=>router.push("/sign-in"), 2000)
    }
    }}
>
    Add to Cart
</Button>
  )
}