import { IFormData } from "@/types/type";
import React, { useEffect, useState } from "react";

export const useCalculateTotalValue = (formData: IFormData) => {
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const total = formData?.products.reduce(
      (acc, product) => product && acc + product.quantity * product.price,
      0
    );
    setTotalValue(total);
  }, [formData.products]);

  return { totalValue, setTotalValue };
};
