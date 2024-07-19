"use client"

import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Minus, Plus } from 'lucide-react'

type Props = {
  initialQuantity?: number
  minQuantity?: number
  maxQuantity?: number
  onQuantityChange?: (quantity: number) => void
}

export default function Quantity({
  initialQuantity = 1,
  minQuantity = 1,
  maxQuantity = 99,
  onQuantityChange
}: Props) {
  const [quantity, setQuantity] = useState(initialQuantity)

  const handleQuantityChange = (newQuantity: number) => {
    
    if (newQuantity >= minQuantity && newQuantity <= maxQuantity) {
      setQuantity(newQuantity)
      onQuantityChange?.(newQuantity)
  
    }

  }
useEffect(()=>{
  localStorage.setItem("quantity", String(quantity))
}, [quantity])
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const newQuantity = parseInt(e.target.value, 10)
    
    if (!isNaN(newQuantity)) {
      handleQuantityChange(newQuantity)
    }
  }

  return (
    <div className='w-auto flex items-center my-4 space-x-4'>
      <b>Quantity</b>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={quantity <= minQuantity}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type='number'
          className='w-20 text-center'
          value={quantity}
          onChange={handleInputChange}
          min={minQuantity}
          max={maxQuantity}
        />
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleQuantityChange(quantity + 1)}
          disabled={quantity >= maxQuantity}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}