// "use client"
// import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
// // import { useStateStore } from '@/store/Provider'
// import { SlashIcon } from '@radix-ui/react-icons'
// import React, { useState } from 'react'

// type Props = {}

// function BreadcrumbWithCustomSeparator({ category }: {
//     category: string
//   }) {
//     return (
//       <Breadcrumb className='my-4 ml-2'>
//         <BreadcrumbList>
//           <BreadcrumbItem>
//             <BreadcrumbLink href="/">Home</BreadcrumbLink>
//           </BreadcrumbItem>
//           <BreadcrumbSeparator>
//             <SlashIcon />
//           </BreadcrumbSeparator>
//           <BreadcrumbItem>
//             <BreadcrumbLink href="#">category</BreadcrumbLink>
//           </BreadcrumbItem>
//           <BreadcrumbSeparator>
//             <SlashIcon />
//           </BreadcrumbSeparator>
//           <BreadcrumbItem>
//             <BreadcrumbPage>{category}</BreadcrumbPage>
//           </BreadcrumbItem>
//         </BreadcrumbList>
//       </Breadcrumb>
//     )
//   }

// export default function Page({}: Props) {

//     function Item({ index }: {
//         index: number
//       }) {
//         const [isHovered, setIsHovered] = useState(false);
//         const handleMouseEnter = (event: React.MouseEvent) => {
//           setIsHovered(true);
//         };
//         const handleMouseLeave = (event: React.MouseEvent) => {
//           setIsHovered(false);
//         };
  
      
//         return <div className="h-full bg-[#F2F0EE] border-r-[1px] relative border-black border-b-[1px]" onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}>
//           <div className=" relative p-4">
//             <div className="flex ">
//               <div className="flex flex-col flex-1 ">
//                 <h2 className="font-semibold"> {cart && cart[index]?.brand}</h2>
//                 <p className="line-clamp-1">
//                   {cart && cart[index]?.product}</p>
//               </div>
//               <div className="flex flex-col items-end">
//                 <p>{cart && cart[index]?.dscnt_price ? cart[index]?.dscnt_price : cart && cart[index]?.price} </p>
//                 <p className="flex">
//                   {  //@ts-ignore
//                     cart && extractRating(cart[index]?.ratings as string)} {extractRating(cart[index]?.ratings as string) && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#F7C600"} fill={"#F7C600"}>
//                       <path d="M13.7276 3.44418L15.4874 6.99288C15.7274 7.48687 16.3673 7.9607 16.9073 8.05143L20.0969 8.58575C22.1367 8.92853 22.6167 10.4206 21.1468 11.8925L18.6671 14.3927C18.2471 14.8161 18.0172 15.6327 18.1471 16.2175L18.8571 19.3125C19.417 21.7623 18.1271 22.71 15.9774 21.4296L12.9877 19.6452C12.4478 19.3226 11.5579 19.3226 11.0079 19.6452L8.01827 21.4296C5.8785 22.71 4.57865 21.7522 5.13859 19.3125L5.84851 16.2175C5.97849 15.6327 5.74852 14.8161 5.32856 14.3927L2.84884 11.8925C1.389 10.4206 1.85895 8.92853 3.89872 8.58575L7.08837 8.05143C7.61831 7.9607 8.25824 7.48687 8.49821 6.99288L10.258 3.44418C11.2179 1.51861 12.7777 1.51861 13.7276 3.44418Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                     </svg>
//                   }
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className={`  h-[500px] top-0 w-full z-0 py-10 bg-center bg-no-repeat bg-cover`} style={{
//             backgroundImage: `url(${cart && cart[index]?.image_urls[0]})`
//           }}>
//           </div>
//           {/* {
//             isHovered ? <Button className="bottom-5 absolute w-10/12 left-1/2 -translate-x-1/2 p-2 py-5 rounded-full text-center bg-[#a3b18a] border-[1px] border-black hover:bg-[white] hover:text-black capitalize  font-sans font-normal" onClick={()=>{AddToCart(cart[index] as Product);
//                toast({
            
//               title: "Item Added into Cart",
//               description: cart[index].pdp_name,
//             })}
//           }>
//               Add to Cart
//             </Button>
//               : null
//           } */}
//         </div>
//       }


//   return (
//     <div className='pt-12 h-screen w-full'>

// <BreadcrumbWithCustomSeparator category={"cart"} />
// <section className="grid grid-cols-4 w-full h-[600px] border border-black">
//       {
//         cart && cart.map((e, index) => <Item key={index} index={index} />)
//       }
//     </section>

//     </div>
//   )
// }

import React from 'react'
import CartPage from './cartCp'
import { getCartItems } from '@/data-access/cart'
import { getCurrentUser } from '@/lib/session'
import { redirect } from 'next/navigation'

type Props = {}

export default async function page({}: Props) {
  const user = await getCurrentUser()
  if(!user)
    return redirect('/login')
  
  const cartItems = await getCartItems(user.id)
  console.log(cartItems)
  return (
   <CartPage cartItems = {cartItems}/>
  )
}