
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
type Props = {}


export default function BreadcrumbComponent({ category, item }: {
  category: string,
  item: string
}) {
  return (
    <Breadcrumb className='my-4 ml-2'>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {category && <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        }
        {category &&
          <BreadcrumbItem>
            <BreadcrumbLink href="#">{category}</BreadcrumbLink>
          </BreadcrumbItem>
        }
        {item && <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        }
        {item &&
          <BreadcrumbItem>
            <BreadcrumbPage>{item}</BreadcrumbPage>
          </BreadcrumbItem>
        }
      </BreadcrumbList>
    </Breadcrumb>
  )
}


