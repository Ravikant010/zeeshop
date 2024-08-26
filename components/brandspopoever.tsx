"use client"
import React, { useState, useEffect } from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Brands } from "@/lib/brands";
import Link from "next/link";

type Props = {
  text: string
}

export default function BrandsPopover({ text }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggle = () => {
    if (!isDesktop) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <HoverCard open={isDesktop ? undefined : isOpen} onOpenChange={setIsOpen}>
      <HoverCardTrigger 
        className="md:ml-4 cursor-pointer"
        onClick={handleToggle}
      >
        {text}
      </HoverCardTrigger>
      <HoverCardContent className="w-[90vw] md:w-[70vw] lg:w-[50vw] max-h-[80vh] overflow-y-auto z-40 p-4">
        <h3 className="text-lg font-semibold mb-4">Brands</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Brands && Brands.map((brand: string) => (
            <Link
              href={`/brand/${brand.replace(/\s/g, "-")}`}
              key={brand}
              className="hover:text-red-500 transition-colors duration-200 text-sm"
            >
              {brand}
            </Link>
          ))}
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}