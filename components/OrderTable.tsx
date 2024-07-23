// components/OrdersTable.tsx

import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { getUserAddress, getUserAddressByOrderId } from '@/data-access/address'

export type Order = {
  orderId: number
  orderItemId: number
  userId: number
  addressId: number
  orderDate: string | Date
  status: string
}

type OrdersTableProps = {
  orders: Order[]
}

const getStatusColor = (status: string): "default" | "secondary" | "destructive" | "outline" => {
  switch (status.toLowerCase()) {
    case 'ordered': return 'default'
    case 'processing': return 'secondary'
    case 'shipped': return 'outline'
    case 'delivered': return 'secondary'
    default: return 'default'
  }
}

export function OrdersTable({ orders }: OrdersTableProps) {
  if (orders.length === 0) {
    return <p className='text-gray-600'>You have no orders yet.</p>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Order Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>City</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map(async (order) => {
const address = await getUserAddressByOrderId(order.addressId)
console.log(address)
         return    (
          <TableRow key={order.orderId}>
            <TableCell className="font-medium">{order.orderId}</TableCell>
            <TableCell>{format(new Date(order.orderDate), 'PPP')}</TableCell>
            <TableCell>
            <Badge 
  variant={getStatusColor(order.status)}
  className={cn(
    order.status.toLowerCase() === 'ordered' && 'bg-blue-500 hover:bg-blue-600',
    order.status.toLowerCase() === 'processing' && 'bg-yellow-500 hover:bg-yellow-600',
    order.status.toLowerCase() === 'shipped' && 'bg-green-500 hover:bg-green-600',
    order.status.toLowerCase() === 'delivered' && 'bg-purple-500 hover:bg-purple-600'
  )}
>
  {order.status}
</Badge>
            </TableCell>
            <TableCell>{address.city}</TableCell>
          </TableRow>
        )})}
      </TableBody>
    </Table>
  )
}