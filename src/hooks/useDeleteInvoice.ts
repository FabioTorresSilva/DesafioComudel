import { useState } from 'react';

const useDeleteInvoice = () => {
  const [error, setError] = useState(null);

  const deleteInvoice = async (invoiceId) => {
    try {
      const response = await fetch(`/api/deleteInvoice`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ invoiceId }),
      });
      if (!response.ok) {
        throw new Error("Erro ao apagar Fatura.");
      }
      console.log("Fatura apagada com sucesso.");
      return true; 
    } catch (error) {
      console.error("Erro ao apagar Fatura:", error);
      setError(error.message);
      return false; 
    }
  };

  return { deleteInvoice, error };
};

export default useDeleteInvoice;
