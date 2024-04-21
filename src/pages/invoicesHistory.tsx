import React, { useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { useRouter } from "next/router";
import { IoIosArrowForward } from "react-icons/io";

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
      const sortedInvoices = sortInvoices(data);
      setInvoices(sortedInvoices);
      console.log("wqeqweqwe", sortedInvoices);
    } catch (error) {
      console.error("Error Loading Invoices:", error);
    }
  };

  const sortInvoices = (data) => {
    data.sort((a, b) => new Date(b.invoiceDate) - new Date(a.invoiceDate));
    return data;
  };

  const handleViewInvoice = (invoice) => {
    const url = `/invoice?${new URLSearchParams({
      ...invoice,
      products: JSON.stringify(invoice.products),
    }).toString()}`;
    window.open(url, "_blank");
  };

  const handleDeleteInvoice = (invoice) => {
    console.log(invoice_id)
  };

  const handleBack = () => {
    router.push("/");
  };

  return (
    <main className={`min-h-screen bg-gray-300  p-6 justify-center flex `}>
      <div className="bg-white shadow-xl p-3  rounded-full h-11 items-center flex justify-center align-middle">
        <div className="cursor-pointer rounded-full text-3xl font-bold flex justify-center align-middle items-center text-blue-700 ">
          <MdArrowBack onClick={handleBack} />
        </div>
      </div>
      <div className="shadow-xl w-full max-w-5xl h-full rounded-2xl bg-white m-4 ">
        <div className="flex bg-whiteBlueBackground rounded-t-2xl p-1 text-center">
          <div className="border-whiteBlueBorder  p-2 w-2/5 px-3">Empresa</div>
          <div className=" border-whiteBlueBorder border-x-2 p-2 w-1/4">
            Fatura Nº
          </div>
          <div className="border-whiteBlueBorder p-2 w-1/4">Total</div>
          <div className="border-whiteBlueBorder border-l-2 p-2 text-center align  justify-center px-3">
            Visualizar
          </div>
          <div className="border-whiteBlueBorder border-l-2 p-2 text-center align  justify-center px-3">
            Apagar
          </div>
        </div>
        {invoices.map((invoice, index) => (
          <div className="p-1 flex border-whiteBlueBorder border last:rounded-b-2xl">
            <div className="border-whiteBlueBorder px-4  p-2 w-2/5   gap-2">
              <div className="text-blue-700 font-bold">{invoice.company} </div> <div className="text-gray-500">NIF: {invoice.vat}</div>
            </div>
            <div className=" border-whiteBlueBorder  px-4 border-x-2 text-right p-2 w-1/4">
              {invoice.invoiceNumber}
            </div>
            <div className="border-whiteBlueBorder px-4 p-2 w-1/4 text-right">
            {invoice.totalValue} €
            </div>
            <div className="border-whiteBlueBorder  border-l-2 p-2 text-center items-center justify-center px-3">
              <button onClick={() => handleViewInvoice(invoice)}>
                <p className="text-blue-500 underline">Ver Fatura</p>
              </button>
            </div>
            <div className="border-whiteBlueBorder  border-l-2 p-2 text-center items-center justify-center px-3">
              <button onClick={() => handleDeleteInvoice(invoice)}>
                <p className="underline text-red-500">Apagar</p>
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
