
import Image from "next/image";
import {auth} from "../auth"
import { Combobox } from "@/components/ui/combox";
import { Item } from "@/components/Item";
import { getBrands, getFeedItems } from "@/fetch/fetchAPIS";
import MidBar from "@/components/MidBar";
import { Product } from "@/interfaces/interface";
export default async function Home() {
  const session = await auth()
  const Brands = await getBrands()
  const items = await getFeedItems()
  console.log(items)
  if(session &&  items)
    console.log(session?.user)
  return (
    <main className="flex min-h-screen flex-col items-center max-h-auto">
    <section className="grid grid-cols-2 w-full h-[600px] border border-black">
      <div className="text-24 leading-36 uppercase flex flex-col justify-between p-20">
        <p className="leading-36 text-lg font-medium">Active</p>
        <p className="mt-32 text-sm">
          The Active collection deliberately resists the current industry aesthetics of technical eye wear. We create sunglasses with meticulous craftsmanship to perform in sport and to transcend it. We want athletes of all levels to own versatile eye wear that emboldens personal style while enhancing movement from the saddle to the city, trail to town, or racing to relaxing.
        </p>
      </div>
      <div className="bg-[url('https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/25756908/2024/3/8/5d2c2c76-e897-4f53-9435-5ade656700391709875789093-Levis-Men-Jeans-5171709875788624-4.jpg')] w-full h-full bg-cover bg-no-repeat"></div>
    </section>
<MidBar />
    <section className="lg:grid-cols-5 grid w-full border border-black border-t-0">
      {items && items.map((e:Product, index:number) => (
        // <div key={e} className="bg-red-500 h-[300px] flex flex-col">
        //   {e}
        //   <Button className="w-4/5 mx-auto rounded-full bg-[#ADC5A08]">Add To Cart</Button>
        // </div>
     
     
        <Item key={index} product={e} />
      ))}
    </section>
    {/* <section className="w-full lg:grid-cols-4 grid h-32">
      <div className="w-full bg-red-500"></div>
      <div className="w-full bg-red-500"></div>
      <div className="w-full bg-red-500"></div>
      <div className="w-full bg-red-500"></div>
    </section> */}
    <section className="flex overflow-hidden w-full items-center bg-red-200"
    >
      {Brands && Brands.map((e:string) => (
        <span key={e} className="mx-4 w-fit whitespace-nowrap">{e}</span>
      ))}
    </section>
    <footer className="w-full h-72 bg-red-300 grid grid-cols-3 ">
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
