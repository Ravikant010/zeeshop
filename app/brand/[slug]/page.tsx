import React from 'react'
import { SlashIcon } from "@radix-ui/react-icons"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getItemsByBrands } from '@/fetch/fetchAPIS'
import { Product } from '@/interfaces/interface'
import { Item } from '@/components/Item'

function BreadcrumbWithCustomSeparator({ brand }: { brand: string }) {
  return (
    <Breadcrumb className='my-4 mx-4 sm:mx-6 md:mx-8'>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Brand</BreadcrumbLink>
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
  const ItemsByBrand = await getItemsByBrands(params.slug)

  return (
    <main className='pt-12 min-h-screen w-full px-4 sm:px-6 md:px-8'>
      <BreadcrumbWithCustomSeparator brand={params?.slug?.replace(/%20/g, ' ')} />
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
        {ItemsByBrand.length > 0 && ItemsByBrand?.map((e: Product, index: number) => (
          <Item key={index} product={e} />
        ))}
      </section>
    </main>
  )
}