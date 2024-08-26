import BreadcrumbComponent from '@/components/BreadCrumb'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import Link from 'next/link'
import { getItemById, getItemsByBrands } from '@/fetch/fetchAPIS'
import { Item } from '@/components/Item'
import { Comment, Product } from '@/interfaces/interface'
import Quantity from '@/components/quantity'
import { SizeSelector } from '@/components/Sizes'

type Props = { params: { pdname: string, pdid: string } }

export default async function Page({ params }: Props) {
    const pd: Product = await getItemById('', params.pdid)
    const ItemsByBrands = await getItemsByBrands(pd.brand)

    return (
        <div className='pt-12 px-4 sm:px-6 lg:px-8'>
            <BreadcrumbComponent category={''} item={pd.pdp_name} />
            <section className='w-full flex flex-col md:flex-row gap-8 mt-6'>
                <div className='w-full lg:w-1/2 grid grid-cols-2 gap-4 capitalize bg-red md:h-52 m:max-h-64'>
                    {pd['image_urls'].slice(0, 4).map((url, index) => (
                        <img key={index} src={url} alt="" className='w-full h-64 sm:h-80 object-cover ' />
                    ))}
                </div>
                <div className='w-full lg:w-1/2 flex flex-col capitalize'>
                    <h1 className='text-xl sm:text-2xl lg:text-3xl'>{pd?.product_title}</h1>
                    <p className='text-lg sm:text-xl lg:text-2xl mt-2'>{pd.pdp_name}</p>
                    {pd.ratings && (
                        <div className='flex items-center space-x-4 text-sm border border-black max-w-fit p-2 my-4 justify-center hover:border-[#FF527B] transition-all ease-in cursor-default'>
                            {pd.ratings.split("|")[0]} <Separator orientation="vertical" className='mx-3' color='black' />{pd.ratings.split("|")[1]}
                        </div>
                    )}
                    <Separator orientation='horizontal' />
                    <div className='text-xl sm:text-2xl lg:text-3xl my-4'>{pd.price}</div>
                    <SizeSelector sizes={pd.sizes} />
                    <Quantity />
                    <div className='grid grid-cols-2 gap-4 mt-6'>
                        <Button className='py-4 sm:py-6 font-semibold'>Add To Cart</Button>
                        <Button className='py-4 sm:py-6 font-semibold w-full'>Buy</Button>
                    </div>
                    <div className='mt-6 text-lg sm:text-xl py-2 font-semibold'>product details</div>
                    <Separator orientation='horizontal' />
                    <p className='py-2'>{pd.product_desc}</p>
                    <div className='font-semibold mt-4'>material</div>
                    <ul className='list-none'>
                        {pd.pd_material.split("\n").map((e: string, index: number) =>
                            e ? <li key={index} className='my-2'>{e}</li> : null
                        )}
                    </ul>
                    <div className='font-semibold mb-2 mt-4'>Specifications</div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-4'>
                        {Object.entries(pd.item_spec).map(([key, value], i) => (
                            <div className='flex flex-col justify-center items-start w-full border-b-[1px]' key={i}>
                                <p className='text-zinc-500 text-sm'>{key}</p>
                                <p>{value as string}</p>
                            </div>
                        ))}
                    </div>
                    <div className='my-4'>
                        <div className='my-2'>product code: {pd.product_id}</div>
                        <div className='my-2'>seller: <span className='text-[#FF527B] font-semibold'>{pd.seller_name}</span></div>
                    </div>
                    {pd.comments && (
                        <>
                            <div className='font-semibold my-2'>Customer Reviews</div>
                            <ScrollArea className="h-64 sm:h-80 w-full rounded-md border p-4 flex flex-col">
                             
                                {  //@ts-ignore
                                pd.comments.map((e: Comment) => (
                                    <div key={e?.user_name} className='mb-4'>
                                        <div className='font-semibold'>{e.user_name}
                                            <Separator orientation='horizontal' />
                                        </div>
                                        <p className='my-2'>{e.comment}</p>
                                        <div className='w-full text-right text-sm'>{e.date}</div>
                                    </div>
                                ))}
                            </ScrollArea>
                        </>
                    )}
                </div>
            </section>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8'>
                {ItemsByBrands && ItemsByBrands.map((e: Product, index: number) => (
                    <Item key={index} product={e} />
                ))}
            </div>
        </div>
    )
}