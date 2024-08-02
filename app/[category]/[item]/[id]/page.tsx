import BreadcrumbComponent from '@/components/BreadCrumb'
import { Separator } from '@/components/ui/separator'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { extractRating } from '@/lib/extracRating'
import { getItemById, getItemByCategory } from '@/fetch/fetchAPIS'
import { Item } from '@/components/Item'
import { Comment, Product } from '@/interfaces/interface'
import Quantity from '@/components/quantity'
import { SizeSelector } from '@/components/Sizes'
import AddToCart from '@/components/AddToCart'
import { getCurrentUser } from '@/lib/session'
import { redirect } from 'next/navigation'
type Props = { params: { category: string, id: string, item: string } }
export default async function Page({ params }: Props) {
    const pd: Product = await getItemById(params.category, params.id)
    const ItemByCategory = await getItemByCategory(params.category)
    const user = await getCurrentUser()
    if(!user)
        return redirect("/login")
    return (
        <div className='pt-12'>
            <BreadcrumbComponent category={params.category} item={params.item} />
            <section className='w-full lg:grid lg:grid-cols-2 px-20 h-full flex flex-col'>
                <div className=' w-full h-full grid grid-cols-2 gap-4  capitalize place-content-start self-center justify-center justify-items-center'>
                    <img src={pd && pd['image_urls'][0] ? pd['image_urls'][0] : ''} alt="" className='max-h-[500px]    w-full object-cover' />
                    <img src={pd && pd['image_urls'][1] ? pd['image_urls'][1] : ''} alt='' className='max-h-[500px]   w-full object-cover' />
                    <img src={pd && pd['image_urls'][2] ? pd['image_urls'][2] : ''} alt="" className='max-h-[500px]   w-full object-cover' />
                    <img src={pd && pd['image_urls'][3] ? pd['image_urls'][3] : ''} alt='' className='max-h-[500px]   w-full object-cover' />
                </div>
                <div className='flex flex-col px-10 capitalize'>
                    <h1 className='lg:text-[24px]'>{pd?.product_title}</h1>
                    <p className='lg:text-[20px]'> {pd && pd.pdp_name} </p>
                    {pd && pd.ratings !== null ?
                        <div className='flex items-center space-x-4 text-sm border border-black max-w-fit p-2 my-4 justify-center hover:border-[#FF527B] transition-all ease-in cursor-default'>{pd && pd.ratings !== null ? pd.ratings!.split("|")[0] : null} <Separator orientation="vertical" className=' mx-3' color='black' />{pd && pd.ratings !== null ? pd.ratings!.split("|")[1] : null}</div>
                        : null}
                    <Separator orientation='horizontal' />
                    <div className='lg:text-[24px] my-4'>{pd && pd.price} </div>
                    <SizeSelector sizes={pd.sizes} />
                    {/* <div className='text-lg flex  lg:full justify-between items-center font-semibold'>select size <div className='flex-1 flex pl-10'>{pd && pd.sizes.map((e:string) => <Button key={e} className='w-14 h-14 rounded-full border-2 flex items-center justify-center mr-6 text-sm font-normal bg-transparent text-black  hover:border-[#FF527B] hover:bg-transparent'>{e.split(".")[0]} </Button>)}</div></div> */}
                    <Quantity />
                    <div className='grid grid-cols-2 gap-2 mt-6'>
                        <AddToCart pd_name={pd.pdp_name} pdId={pd.product_id} userId = {user.id} />
                        <Link href={`/address/${pd.product_id}`} className='w-full'>

                            <Button className='py-6 font-semibold w-full'>Buy</Button></Link>
                    </div>
                    <div className='mt-6 lg:text-lg py-2 font-semibold'>product details</div>
                    <Separator orientation='horizontal' />
                    <p className='py-2'>
                        {pd && pd.product_desc}
                    </p>
                    <div className='font-semibold '>material</div>
                    <ul className='list-none'>
                        {pd && pd.pd_material.split("\n").map((e: string, index: number) =>
                            e ? <li key={index} className='my-2'>{e}</li> : null
                        )}
                    </ul>
                    <div className='font-semibold mb-2'>Specifications</div>
                    <div className='grid grid-cols-2 gap-x-2 gap-y-4'>
                        {
                            pd && Object.keys(pd.item_spec).map(e => <div className='flex flex-col justify-center items-start w-full border-b-[1px]'><p className='text-zinc-500 text-sm'>{e}</p> <p>{
                                //@ts-ignore
                                pd?.item_spec[e]}</p></div>)
                        }
                    </div>
                    <div className='my-2'>
                        <div className='my-2'>
                            <code> product code:</code>
                            {pd && pd.product_id}
                        </div>
                        <div className='my-2'>
                            seller: <span className='text-[#FF527B] font-semibold'>{pd && pd.seller_name}</span>
                        </div>
                    </div>
                    {pd && pd.comments !== null ? <>
                        <div className='font-semibold my-2'>Customer Reviews</div>
                        <ScrollArea className="h-[400px] w-full rounded-md border p-4 flex flex-col">
                            {//@ts-ignore
                                pd && pd.comments.map((e: Comment) => <div key={e?.user_name} className='mb-4'>
                                    <div className='font-semibold'>{e.user_name}
                                        <Separator orientation='horizontal' />
                                    </div>
                                    <p className='my-2'>
                                        {e.comment}
                                    </p>
                                    <div className='w-full text-right text-sm'>  {e.date}</div>
                                </div>)
                            }
                        </ScrollArea>
                    </>
                        : null}
                </div>
            </section>
            <div className='grid grid-cols-4 mt-6'>
                {
                    ItemByCategory && ItemByCategory.map((e: Product, index: number) => <Item key={index} product={e} />)
                }
            </div>
        </div>
    )
}
const CommentUser = () => <Avatar>
    <AvatarImage src="https://github.com/shadcn.png" />
    <AvatarFallback>CN</AvatarFallback>
</Avatar>
