import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

// Dynamic import for PdfPreview component
const PdfPreview = dynamic(() => import("../pages/pdfPreview"), {
  ssr: false, // Disable server-side rendering for PdfPreview
});

export default function Historico() {
  const [invoices, setInvoices] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await fetch(`/api/allInvoices`);
      if (!response.ok) {
        throw new Error("Error Loading Invoices");
      }
      const data = await response.json();
      setInvoices(data);
    } catch (error) {
      console.error("Error Loading Invoices:", error);
    }
  };

  const calculateTotalValue = (products) => {
    return products.reduce((total, product) => {
      return total + product.quantity * product.price;
    }, 0);
  };

  const handleViewInvoice = (invoice) => {
    const url = `/invoice?${new URLSearchParams({
      ...invoice,
      products: JSON.stringify(invoice.products),
    }).toString()}`;

    window.open(url, "_blank");
  };

  return (
    <main className={`min-h-screen bg-blue-200 p-6 justify-center flex items-center`}>
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl p-8">
        {invoices.map((invoice, index) => (
          <div className="flex  p-4 w-full border-2 mb-5 rounded-xl last:mb-0" key={index}>
            <div className="justify-between w-full mb-4 rounded-md gap-10 flex flex-row ">
              <div className=" shrink-0">
                <p className="text-blue-500 text-xl font-bold">{invoice.company}</p>
                <p>NIF: {invoice.vat}</p>
                <p>Fatura : {}</p>
              </div>
              <div className="flex flex-col flex-end">
                <p className="text-blue-500 text-xl">Total: {calculateTotalValue(invoice.products)} €</p>
                <div className="w-60">
                  <p className="">
                    Descrição:{" "}
                    {invoice.description.length > 50 ? `${invoice.description.substring(0, 20)}...` : invoice.description}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="cursor-pointer text-blue-500">
                <button onClick={() => handleViewInvoice(invoice)}>Ver Fatura</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}