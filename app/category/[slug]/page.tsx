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
import { getItemByCategory } from '@/fetch/fetchAPIS'
import { Product } from '@/interfaces/interface'
import { Item } from '@/components/Item'
type Props = {}
function BreadcrumbWithCustomSeparator({ category }: {
  category: string
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
          <BreadcrumbLink href="#">category</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>{category}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
export default async function Page({ params }: { params: { slug: string } }) {
  const ItemsByCategory = await getItemByCategory(params.slug)
  if(ItemsByCategory)
  return (<main className='pt-12 h-screen w-full'>
    <BreadcrumbWithCustomSeparator category={params.slug.replace(/%20/g, ' ')} />
    <section className="flex flex-col md:grid sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 w-full border border-black border-t-0">
      {
        ItemsByCategory && ItemsByCategory.map((e:Product, index:number) => <Item key={index} product={e} />)
      }
    </section>
  </main>
  )
}