import { Product } from '@/types/type';
import { useState, useEffect } from 'react';

export interface Invoice {
  _id: string;
  company: string;
  vat: string;
  invoiceNumber: string;
  totalValue: number;
  products: Product[]; // Assuming Product is defined elsewhere
  invoiceDate: string; // Assuming invoiceDate is a string representing the date
}

export default function useFetchInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const fetchInvoices = async () => {
    try {
      const response = await fetch(`/api/allInvoices`);
      if (!response.ok) {
        throw new Error("Error Loading Invoices");
      }
      const data: Invoice[] = await response.json();
      const sortedInvoices = sortInvoices(data);
      setInvoices(sortedInvoices);
    } catch (error) {
      console.error("Error Loading Invoices:", error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const sortInvoices = (data: Invoice[]) => {
    data.sort((a, b) => new Date(b.invoiceDate).getTime() - new Date(a.invoiceDate).getTime());
    return data;
  };

  return { invoices, fetchInvoices };
}
