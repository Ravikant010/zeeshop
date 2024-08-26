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
export default async function Home() {
  // const session = await auth()
  const user = await getCurrentUser();

if(!user)
  return redirect("/sign-in")

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
      <div className="bg-[url('https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/25756908/2024/3/8/5d2c2c76-e897-4f53-9435-5ade656700391709875789093-Levis-Men-Jeans-5171709875788624-4.jpg')] md:inline-block hidden w-full h-full bg-cover bg-no-repeat"></div>
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
    <footer className="w-full h-72 grid grid-cols-3 ">
      <div className="bg-[#678d58] flex flex-col justify-around py-10 px-4 border-r-[1px] border-black">
        <p>zeeshop</p>
        <p>New Delhi</p>
        <p>8826749252</p>
        <code>ravikantyadav435@gmail.com</code>
      </div>
      <div className="bg-[#678d58] flex flex-col justify-around py-10 px-4 border-r-[1px] border-black">
        <h3 className="mb-4">About</h3>
        <p>About</p>
        <p>Terms & Conditions</p>
        <p>Find Us</p>
        <p>Stories</p>
      </div>
      <div className="bg-[#678d58] flex flex-col justify-start py-10 px-4 border-r-[1px] border-black">
        <h3 className="mb-4">Connect</h3>
        <p>Instagram</p>
        <p>X</p>
        <p>Email</p>
      </div>
    </footer>
  </main>
);
}
