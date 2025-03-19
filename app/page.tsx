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
