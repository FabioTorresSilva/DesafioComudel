import { IFormData } from "@/types/type";
import React, { useEffect, useState } from "react";

export const usecalculateTotalValue = (formData: IFormData) => {
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    // Função para calcular o valor total sempre que houver uma mudança nos produtos
    const calculateTotalValue = () => {
      const total = formData?.products.reduce(
        (acc, product) => product && acc + product.quantity * product.price,
        0
      );
      setTotalValue(total);
    };
    calculateTotalValue();
  }, [formData.products]);

  return { totalValue, setTotalValue };
};
