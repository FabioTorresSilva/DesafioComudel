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
      // Armazena a resposta da requisição
      const sortedInvoices = sortInvoices(data);
      setInvoices(sortedInvoices);
      console.log("wqeqweqwe",sortedInvoices)
    } catch (error) {
      console.error("Error Loading Invoices:", error);
    }
  };

  const sortInvoices = (data) => {
    // Classifica as faturas com base na data da fatura (invoiceDate)
    data.sort((a, b) => new Date(b.invoiceDate) - new Date(a.invoiceDate));
    return data;
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

  const handleBack = () => {
    router.push("/");
  };

  return (
    <main className={`min-h-screen bg-gray-200 p-6 justify-center flex `}>
      <div className="bg-white shadow-xl p-3 rounded-full h-11 items-center flex justify-center align-middle">
        <div
          className="cursor-pointer rounded-full text-3xl font-bold flex justify-center align-middle items-center text-blue-700 "
        >
          <MdArrowBack onClick={handleBack} />
        </div>
      </div>
      <div className="w-full max-w-4xl items-center  rounded-xl p-8">
        {invoices.map((invoice, index) => (
          <div
            className="flex  p-4 w-full border-2 shadow-xl bg-white  mb-5 rounded-xl last:mb-0"
            key={index}
          >
            <div className="justify-between w-full mb-4 rounded-md gap-10 border-blue-500 flex flex-row ">
              <div className=" shrink-0">
                <p className="text-blue-500 text-2xl font-bold">
                  {invoice.company}
                </p>
                <p>NIF: {invoice.vat}</p>
                <p>Fatura : {invoice.invoiceNumber}</p>
              </div>
              <div className="flex flex-col ">
                <p className="text-blue-500 text-xl">
                  Total: {calculateTotalValue(invoice.products)} €
                </p>
                <div className="w-60">
                  <p className="text-gray-500">
                    Descrição: {invoice.description.length > 50
                      ? `${invoice.description.substring(0, 20)}...`
                      : invoice.description}
                   </p>
                </div>
              </div>
            </div>
            <div>
              <div className="cursor-pointer text-blue-500 items-center">
                <button onClick={() => handleViewInvoice(invoice)}>
                  <IoIosArrowForward className="text-3xl flex flex-col items-center mt-7 mr-2" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
