import { IFormData, Product } from "@/types/type";
import React, { useEffect, useState } from "react";

export const useCalculateTotalValue = (formData: IFormData | undefined) => {
  const [totalValue, setTotalValue] = useState<number>(0);

  useEffect(() => {
    if (formData && formData.products) {
      const total = formData.products.reduce(
        (acc: number, product: Product) =>
          acc + (product.quantity ? parseFloat(product.quantity) : 0) * (product.price ? parseFloat(product.price) : 0),
        0
      );
      setTotalValue(total);
    } else {
      setTotalValue(0);
    }
  }, [formData]);

  return { totalValue, setTotalValue };
};
