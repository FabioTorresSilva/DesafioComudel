import { IFormData } from '@/types/type';
import React, { useEffect, useState} from 'react'


export const useFormSubmit = (formData, setFormData, invoiceSchema, setValidationError, setisValid) => {
   
    
      const handleSubmit = async (e) => {
        e.preventDefault(); // Impede o comportamento padrão de envio do formulário
    
        try {
          const formattedData = {
            ...formData,
            products: formData.products.map((product) => ({
              ...product,
              quantity: parseFloat(product.quantity),
              price: parseFloat(product.price),
            })),
          };
    
          // Valida os dados formatados em relação ao esquema
          invoiceSchema.parse(formattedData);
    
          // Tenta enviar os dados formatados para o endpoint da API
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
          } else {
            console.error("Erro ao criar receita");
          }
        } catch (error) {
          // Manipula erros de validação ou de envio da API
          setValidationError(error.message);
          console.error("Formulário Inválido ou Erro na API");
        }
        setValidationError("");
        setisValid(true);
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
          products: [...prevData.products, DEFAULT_VALUE ],
        }));
      };
    
    
      const removeProductField = (index) => {
        const updatedProducts = formData.products.filter((_, i) => i !== index);
        setFormData({ ...formData, products: updatedProducts });
      };

      return { handleSubmit, handleInputChange, handleProductChange, removeProductField, addProductField } ;

}



