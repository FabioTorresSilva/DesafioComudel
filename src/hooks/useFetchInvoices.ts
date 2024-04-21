import { useState, useEffect } from 'react';

export default function useFetchInvoices() {
  const [invoices, setInvoices] = useState([]);

  const fetchInvoices = async () => {
    try {
      const response = await fetch(`/api/allInvoices`);
      if (!response.ok) {
        throw new Error("Error Loading Invoices");
      }
      const data = await response.json();
      const sortedInvoices = sortInvoices(data);
      setInvoices(sortedInvoices);
    } catch (error) {
      console.error("Error Loading Invoices:", error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const sortInvoices = (data) => {
    data.sort((a, b) => new Date(b.invoiceDate) - new Date(a.invoiceDate));
    return data;
  };

  return { invoices, fetchInvoices };
}