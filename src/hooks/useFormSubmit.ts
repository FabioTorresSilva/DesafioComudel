import { IFormData } from "@/types/type";
import React, { useEffect, useState } from "react";

const DEFAULT_VALUE = { name: "", quantity: "", price: "" };

export const useFormSubmit = (
  formData,
  setFormData,
  invoiceSchema,
  setValidationError,
  setisValid,
  invoiceNumber,
  invoiceDate,
  totalValue 
) => {
  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Impede o comportamento padrão de envio do formulário

    try {
      // Aqui você inclui o invoiceNumber e invoiceDate nos dados enviados para a API
      const formattedData = {
        ...formData,
        invoiceNumber: invoiceNumber,
        invoiceDate: invoiceDate,
        products: formData.products.map((product) => ({
          ...product,
          quantity: parseFloat(product.quantity),
          price: parseFloat(product.price),
        })),
        totalValue
      };
  
      // Valide os dados formatados em relação ao esquema
      invoiceSchema.parse(formattedData);
  
      // Tente enviar os dados formatados para o endpoint da API
      const response = await fetch("/api/postarInvoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });
  
      // Verifica se a chamada da API foi bem-sucedida
      if (response.ok) {
        console.log("Invoice Guardada");
        setValidationError("");
        setisValid(true);
      } else {
        console.error("Erro ao criar receita");
      }
    } catch (error) {
      // Manipula erros de validação ou de envio da API
      setValidationError(error.message);
      console.error("Formulário Inválido ou Erro na API");
    }
  };

  // Function to handle input changes
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProductChange = (e, index) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      products: prevData.products.map((product, i) =>
        i === index ? { ...product, [name]: value } : product
      ),
    }));
  };

  const addProductField = () => {
    setFormData((prevData) => ({
      ...prevData,
      products: [...prevData.products, DEFAULT_VALUE],
    }));
  };

  const removeProductField = (index) => {
    const updatedProducts = formData.products.filter((_, i) => i !== index);
    setFormData({ ...formData, products: updatedProducts });
  };

  return {
    handleSubmit,
    handleInputChange,
    handleProductChange,
    removeProductField,
    addProductField,
  };
};