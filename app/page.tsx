"use server"
import Image from "next/image";
import {auth} from "../auth"
import { Combobox } from "@/components/ui/combox";
import { Item } from "@/components/Item";
import { getBrands, getFeedItems } from "@/fetch/fetchAPIS";
import MidBar from "@/components/MidBar";
import { Product } from "@/interfaces/interface";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { getProfile } from "@/data-access/profile";
import { addToCart } from "@/data-access/cart";
import Link from "next/link";
import { InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { Mail } from "lucide-react";
import Footer from "@/components/footer";
export default async function Home() {
  // const session = await auth()
  const user = await getCurrentUser();

// if(!user)
//   return redirect("/sign-in")

  const Brands = await getBrands()
  const items = await getFeedItems()
  // console.log('session',session)

  // if(session &&  items)
  //   console.log(session?.user)
  async function  add_cart_function(){

    // const size = localStorage.getItem("size")
    // const quantity = localStorage.getItem("size")
    // if(size && quantity)
    //   await addToCart(user?.id!, size, quantity,pdId )
  }
  if(!items)
    return <>loading</>
  return (
    <main className="flex min-h-screen flex-col items-center max-h-auto w-full">
    <section className="grid md:grid-cols-2 grid-cols-1 w-full h-[600px] border border-black">
      <div className="text-24 leading-36 uppercase flex flex-col justify-between p-20">
        <p className="leading-36 text-lg font-medium">Active</p>
        <p className="mt-32 text-sm">
          The Active collection deliberately resists the current industry aesthetics of technical eye wear. We create sunglasses with meticulous craftsmanship to perform in sport and to transcend it. We want athletes of all levels to own versatile eye wear that emboldens personal style while enhancing movement from the saddle to the city, trail to town, or racing to relaxing.
        </p>
      </div>
      <div className="bg-[url('https://images.unsplash.com/photo-1659735636797-3af40dc61131?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] md:inline-block hidden w-full h-full bg-cover bg-no-repeat bg-center"></div>
    </section>
{/* <MidBar /> */}
<section className="flex flex-col md:grid sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 w-full border border-black border-t-0">
      {items && items.map((product: Product, index: number) => (
        <Item key={product.product_id || index} product={product} />
      ))}
    </section>
    {/* <section className="w-full lg:grid-cols-4 grid h-32">
      <div className="w-full bg-red-500"></div>
      <div className="w-full bg-red-500"></div>
      <div className="w-full bg-red-500"></div>
      <div className="w-full bg-red-500"></div>
    </section> */}
    <section className="flex overflow-hidden w-full items-center "
    >
      {Brands && Brands.map((e:string) => (
        <span key={e} className="mx-4 w-fit whitespace-nowrap">{e}</span>
      ))}
    </section>
 
  <Footer/>
  </main>
);
}

// import { NavbarDemo } from "@/components/navbar";
// import { Button } from "@/components/ui/button";
// import React from "react";
// import Link from "next/link";
// import { Instagram, Mail, Twitter } from "lucide-react";

// type Props = {};

// export default function page({}: Props) {
//   return (
//     <div className="bg-[#E6E9E4] h-auto">
//       <NavbarDemo/>
//       {/* <div className="w-full flex h-16 items-center">
//         <div>Logo</div>
//         <div className="flex flex-1 justify-center rounded-2xl border-2 h-1/2"></div>
//         <div>login</div>
//       </div> */}

//       <div className="bg-[url('/bg.png')] h-[800px] w-full bg-cover bg-center  flex items-center justify-center ">
//         <div className="flex-col flex lg:max-w-screen-lg text-center font-della text-white">
//           <p className=" self-center m-auto  text-[8rem]">ZeeShop</p>
//           <p className="text-2xl tracking-normal">
//             your ultimate destination for premium fashion. We curate an
//             extensive collection of world-renowned brands and cutting-edge
//             styles, making fashion accessible to everyone who values quality and
//             style.
//           </p>
//         </div>
//       </div>
//       <section className="flex flex-col">
//         {["collections", "arrivals", "seasonal"].map((e) => (
//           <div
//             className="w-full flex h-[1000px] items-center capitalize justify-center"
//             key={e}
//           >
//             <div className="font-della text-[4rem] self-center align-middle">
//               {e}
//             </div>
//           </div>
//         ))}
//       </section>

//       <section>
// <div className="w-full h-auto flex flex-col">
// {
//   ["women", "men", "kids"].map(e=><div className="h-[1000px] bg-red-500 flex justify-between mb-2"> <div className=" w-1/2 items-start flex flex-col justify-center text-[4rem] mx-10" >
//     {e}

//  <div className="text-lg">
//  ultimate destination for all things fashion-forward and timeless. Explore a curated range of clothing, footwear, accessories, and more, designed to celebrate every woman's individuality. From chic casual wear to elegant evening outfits, we have everything you need to elevate your wardrobe
//  </div> 

 
//  <Button variant={"outline"} className="rounded-full text-lg px-10 py-6  align-bottom place-items-end mt-10">View</Button>
 
//  </div>
 
//  <div className="bg-blue-300 h-full w-1/2">dfd</div></div>)
// }
// </div>

//       </section>

//       <section className="h-[1000px] ">
//         <div className="text-center text-[4rem]">
//           Brands
//         </div>

//       </section>

//       <footer className="py-20 bg-gray-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
//             <div className="scroll-reveal">
//               <h3 className="text-xl font-light mb-6">About ZeeShop</h3>
//               <p className="text-gray-600">
//                 Curating the finest in fashion since 2024. We believe in
//                 quality, style, and sustainability.
//               </p>
//             </div>
//             <div className="scroll-reveal">
//               <h3 className="text-xl font-light mb-6">Quick Links</h3>
//               <ul className="space-y-4">
//                 <li>
//                   <a href="#" className="text-gray-600 hover:text-black">
//                     New Arrivals
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="text-gray-600 hover:text-black">
//                     Best Sellers
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="text-gray-600 hover:text-black">
//                     Our Story
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="text-gray-600 hover:text-black">
//                     Contact
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div className="scroll-reveal">
//               <h3 className="text-xl font-light mb-6">Customer Care</h3>
//               <ul className="space-y-4">
//                 <li>
//                   <a href="#" className="text-gray-600 hover:text-black">
//                     Shipping Info
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="text-gray-600 hover:text-black">
//                     Returns
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="text-gray-600 hover:text-black">
//                     Size Guide
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="text-gray-600 hover:text-black">
//                     FAQ
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div className="scroll-reveal">
//               <h3 className="text-xl font-light mb-6">Contact Us</h3>
//               <ul className="space-y-4 text-gray-600">
//                 <li>1234 Fashion Street</li>
//                 <li>New York, NY 10001</li>
//                 <li>contact@zeeshop.com</li>
//                 <li>+1 (234) 567-8900</li>
//               </ul>
//             </div>
//           </div>
//           <div className="border-t border-gray-200 mt-16 pt-8 text-center text-gray-600">
//             <p>&copy; 2024 ZeeShop. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }
