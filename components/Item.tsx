// "use client"
// import type { Product } from "@/interfaces/interface";
// import { useToast } from "./ui/use-toast";
// import { useState } from "react";
// import { Button } from "./ui/button";
// import { extractRating } from "@/lib/extracRating";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// export function Item({ product }: {
//     product: Product
// }) {
//     const [isHovered, setIsHovered] = useState(false);
//     const handleMouseEnter = (event: React.MouseEvent) => {
//         setIsHovered(true);
//     };
//     const handleMouseLeave = (event: React.MouseEvent) => {
//         setIsHovered(false);
//     };
//     const { toast } = useToast()

//     const route:string = usePathname()
//     console.log(route)
//     if (product)
//         return <Link className="h-full bg-[#F2F0EE] border-r-[1px] relative border-black border-b-[1px]" onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave} href = {route === "/" ? `/item/${product.pdp_name.replace(/\s/g, "-")}/${product.product_id}` :`/${route.split('/')[1]}/${product.pdp_name.replace(/\s/g, "-")}/${product.product_id}`}>
//             <div className=" relative p-4">
//                 <div className="flex ">  
//                     <div className="flex flex-col flex-1 ">
//                         <h2 className="font-semibold"> {product && product?.brand}</h2>
//                         <p className="line-clamp-1">
//                             {product && product?.product}</p>
//                     </div>
//                     <div className="flex flex-col items-end">
//                         <p>{product && product?.dscnt_price ? product?.dscnt_price : product && product?.price} </p>
//                         <p className="flex">
//                             {  //@ts-ignore
//                                 product && extractRating(product?.ratings as string)} {extractRating(product?.ratings as string) && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#F7C600"} fill={"#F7C600"}>
//                                 <path d="M13.7276 3.44418L15.4874 6.99288C15.7274 7.48687 16.3673 7.9607 16.9073 8.05143L20.0969 8.58575C22.1367 8.92853 22.6167 10.4206 21.1468 11.8925L18.6671 14.3927C18.2471 14.8161 18.0172 15.6327 18.1471 16.2175L18.8571 19.3125C19.417 21.7623 18.1271 22.71 15.9774 21.4296L12.9877 19.6452C12.4478 19.3226 11.5579 19.3226 11.0079 19.6452L8.01827 21.4296C5.8785 22.71 4.57865 21.7522 5.13859 19.3125L5.84851 16.2175C5.97849 15.6327 5.74852 14.8161 5.32856 14.3927L2.84884 11.8925C1.389 10.4206 1.85895 8.92853 3.89872 8.58575L7.08837 8.05143C7.61831 7.9607 8.25824 7.48687 8.49821 6.99288L10.258 3.44418C11.2179 1.51861 12.7777 1.51861 13.7276 3.44418Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                             </svg>
//                             }
//                         </p>
//                     </div>
//                 </div>
//             </div>
//             <div className={`  h-[500px] top-0 w-full z-0 py-10 bg-center bg-no-repeat bg-cover`} style={{
//                 backgroundImage: `url(${product && product?.image_urls[0]})`
//             }}>
//             </div>
//             {
//                 isHovered ? <Button className="bottom-5 absolute w-10/12 left-1/2 -translate-x-1/2 p-2 py-5 rounded-full text-center bg-[#a3b18a] border-[1px] border-black hover:bg-[white] hover:text-black capitalize  font-sans font-normal" onClick={() => {
//                     // AddToCart(product as Product);
//                     toast({
//                         title: "Item Added into Cart",
//                         description: product.pdp_name,
//                     })
//                 }
//                 }>
//                     Add to Cart
//                 </Button>
//                     : null
//             }
//         </Link>
//         return <></>
// }

"use client"
import React, { useState } from 'react';
import type { Product } from "@/interfaces/interface";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { extractRating } from "@/lib/extracRating";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from 'next/image';
import { addToCart } from '@/data-access/cart';
import { getCurrentUser } from '@/lib/session';
import AddToCart from './AddToCart';

export  function Item({ 
    product, 

  }: { 
    product: Product; 

  }) {
    const [isHovered, setIsHovered] = useState(false);
    const { toast } = useToast();
    const route = usePathname();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toast({
            title: "Item Added into Cart",
            description: product.pdp_name,
        });

    };

    if (!product) return null;

    const productLink = route === "/" 
        ? `/item/${product.pdp_name.replace(/\s/g, "-")}/${product.product_id}`
        : `/${route.split('/')[1]}/${product.pdp_name.replace(/\s/g, "-")}/${product.product_id}`;

    return (
        <Link 
            className="block h-full bg-[#F2F0EE] border-r border-b border-black relative"
            href={productLink}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="p-4">
                <div className="flex justify-between">
                    <div className="flex-1">
                        <h2 className="font-semibold">{product.brand}</h2>
                        <p className="line-clamp-1">{product.product}</p>
                    </div>
                    <div className="text-right">
                        <p>{product.dscnt_price || product.price}</p>
                        <p className="flex items-center">
                            {extractRating(product.ratings as string)}
                            {extractRating(product.ratings as string) && (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color="#F7C600" fill="#F7C600">
                                    <path d="M13.7276 3.44418L15.4874 6.99288C15.7274 7.48687 16.3673 7.9607 16.9073 8.05143L20.0969 8.58575C22.1367 8.92853 22.6167 10.4206 21.1468 11.8925L18.6671 14.3927C18.2471 14.8161 18.0172 15.6327 18.1471 16.2175L18.8571 19.3125C19.417 21.7623 18.1271 22.71 15.9774 21.4296L12.9877 19.6452C12.4478 19.3226 11.5579 19.3226 11.0079 19.6452L8.01827 21.4296C5.8785 22.71 4.57865 21.7522 5.13859 19.3125L5.84851 16.2175C5.97849 15.6327 5.74852 14.8161 5.32856 14.3927L2.84884 11.8925C1.389 10.4206 1.85895 8.92853 3.89872 8.58575L7.08837 8.05143C7.61831 7.9607 8.25824 7.48687 8.49821 6.99288L10.258 3.44418C11.2179 1.51861 12.7777 1.51861 13.7276 3.44418Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                        </p>
                    </div>
                </div>
            </div>
            <div className="relative w-full pt-[100%]">
                <Image 
                    src={product.image_urls[0]} 
                    alt={product.product}
                    layout="fill"
                    objectFit="cover"
                    className="absolute top-0 left-0"
                />
            </div>
            {isHovered && (
                 <Button 
                 className="absolute bottom-5 left-1/2 -translate-x-1/2 w-10/12 p-2 py-5 rounded-full text-center bg-[#a3b18a] border border-black hover:bg-white hover:text-black capitalize font-sans font-normal"
                 onClick={handleAddToCart}
             >
                 Add to Cart
             </Button>
            )}
        </Link>
    );
}