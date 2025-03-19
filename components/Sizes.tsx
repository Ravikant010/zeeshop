// // components/SizeSelector.tsx
// "use client"

// import React, { useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { useSize } from './uesSize';

// interface SizeSelectorProps {
//   sizes: string[];
//   onSizeSelect?: (size: string | null) => void;
// }

// export function SizeSelector({ sizes }: SizeSelectorProps) {
//   const { availableSizes, selectedSize, selectSize, updateAvailableSizes } = useSize(sizes);

//   useEffect(() => {
//     updateAvailableSizes(sizes);
//     selectSize(sizes[0])
   

//   }, [sizes]);
// useEffect(()=>{
//   if(selectedSize)
//   localStorage.setItem("size", selectedSize)
// }, [selectSize])

//   const handleSizeSelect = (size: string) => {
//     selectSize(size);

//     // if (onSizeSelect) {
//     //   onSizeSelect(size);
//     // }
//   };

//   return (
//     <div className='text-lg flex lg:full justify-between items-center font-semibold'>
//       <span>Select Size</span>
//       <div className="flex-1 flex flex-wrap pl-4 md:pl-10 gap-2 md:gap-6">
//   {availableSizes.map((size: string) => (
//     <Button
//       key={size}
//       className={`w-8 h-8 md:w-14 md:h-14 rounded-full border-2 flex items-center justify-center text-sm font-normal ${
//         selectedSize === size
//           ? 'bg-[#FF527B] text-white border-[#FF527B] hover:text-black'
//           : 'bg-transparent text-black hover:border-[#FF527B]'
//       } hover:bg-transparent`}
//       onClick={() => handleSizeSelect(size)}
//     >
//       {size.split('.')[0]}
//     </Button>
//   ))}
// </div>

//     </div>
//   );
// }


"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSize } from "./useSize";

interface SizeSelectorProps {
  sizes: string[];
  onSizeSelect?: (size: string | null) => void;
}

export function SizeSelector({ sizes }: SizeSelectorProps) {
  const { availableSizes, selectedSize, selectSize, updateAvailableSizes } =
    useSize(sizes);

  // Update available sizes and select the first size when `sizes` changes
  useEffect(() => {
    updateAvailableSizes(sizes);
    if (sizes.length > 0) {
      selectSize(sizes[0]); // Select the first size by default
    }
  }, [sizes, updateAvailableSizes, selectSize]);

  // Persist the selected size in localStorage
  useEffect(() => {
    if (selectedSize) {
      localStorage.setItem("size", selectedSize);
    }
  }, [selectedSize]);

  // Handle size selection
  const handleSizeSelect = (size: string) => {
    selectSize(size);
  };

  return (
    <div className="text-lg flex lg:full justify-between items-center font-semibold">
      <span>Select Size</span>
      <div className="flex-1 flex flex-wrap pl-4 md:pl-10 gap-2 md:gap-6">
        {availableSizes.map((size: string) => (
          <Button
            key={size}
            className={`w-8 h-8 md:w-14 md:h-14 rounded-full border-2 flex items-center justify-center text-sm font-normal ${
              selectedSize === size
                ? "bg-[#FF527B] text-white border-[#FF527B] hover:text-black"
                : "bg-transparent text-black hover:border-[#FF527B]"
            } hover:bg-transparent`}
            onClick={() => handleSizeSelect(size)}
          >
            {size.split(".")[0]}
          </Button>
        ))}
      </div>
    </div>
  );
}