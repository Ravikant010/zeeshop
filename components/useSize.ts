import { useState } from "react";

export function useSize(initialSizes: string[]) {
  const [availableSizes, setAvailableSizes] = useState<string[]>(initialSizes);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Function to update the list of available sizes
  const updateAvailableSizes = (newSizes: string[]) => {
    setAvailableSizes(newSizes);
  };

  // Function to select a size
  const selectSize = (size: string) => {
    setSelectedSize(size);
  };

  return {
    availableSizes,
    selectedSize,
    selectSize,
    updateAvailableSizes,
  };
}