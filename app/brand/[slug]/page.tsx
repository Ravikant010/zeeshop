
import React, { useEffect, useState } from 'react'
import { extractRating } from '@/lib/extracRating'
import { SlashIcon } from "@radix-ui/react-icons"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from '@/components/ui/button'
import { index } from 'drizzle-orm/mysql-core'
import Link from 'next/link'
import { getItemsByBrands } from '@/fetch/fetchAPIS'
import { Product } from '@/interfaces/interface'
import { Item } from '@/components/Item'
type Props = {}
function BreadcrumbWithCustomSeparator({ brand }: {
  brand: string
}) {
  return (
    <Breadcrumb className='my-4 ml-2'>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" >Brand</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>{brand}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
export default async function Page({ params }: { params: { slug: string } }) {
  const ItemsByBrand =  await getItemsByBrands(params.slug)
  return (<main className='pt-12 h-screen w-full'>
    <BreadcrumbWithCustomSeparator brand={params.slug.replace(/%20/g, ' ')} />
    <section className="grid grid-cols-4 w-full h-[600px] border border-black">
      {
        ItemsByBrand && ItemsByBrand.map((e:Product, index:number) => <Item key={index} product={e} />)
      }
    </section>
  </main>
  )
}