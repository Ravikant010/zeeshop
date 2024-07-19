// hooks/useSize.ts
import { useState } from 'react';

export function useSize(initialSizes: string[] = []) {
  const [availableSizes, setAvailableSizes] = useState<string[]>(initialSizes);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const selectSize = (size: string) => {
    if (availableSizes.includes(size)) {
      setSelectedSize(size);
    }
  };

  const updateAvailableSizes = (sizes: string[]) => {
    setAvailableSizes(sizes);
    setSelectedSize(null); // Reset selection when available sizes change
  };

  return { availableSizes, selectedSize, selectSize, updateAvailableSizes };
}