import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { MdDelete, MdArrowBack, MdOutlinePreview } from "react-icons/md";
import useFetchInvoices from "@/hooks/useFetchInvoices";
import useDeleteInvoice from "@/hooks/useDeleteInvoice";


export default function Historico() {
  const { invoices, fetchInvoices } = useFetchInvoices();
  const { deleteInvoice, error } = useDeleteInvoice();
  const router = useRouter();
 
  const handleViewInvoice = (invoice : any) => {
    const url = `/invoice?${new URLSearchParams({
      ...invoice,
      products: JSON.stringify(invoice.products),
    }).toString()}`;
    window.open(url, "_blank");
  };

  const handleDeleteInvoice = async (invoice:any) => {
    try {
      const deleted = await deleteInvoice(invoice._id);
      if (deleted) {
        fetchInvoices();
      }
    } catch (error) {
      console.error("Erro ao apagar Fatura:", error);
    }
  }

  const handleBack = () => {
    router.push("/");
  }

  return (
    <main className={`min-h-screen bg-gray-300  p-6 justify-center  flex `}>
      <div className="bg-white shadow-xl p-3  rounded-full h-11 items-center flex justify-center align-middle">
        <div className="cursor-pointer rounded-full text-3xl font-bold flex justify-center align-middle items-center text-blue-700 ">
          <MdArrowBack onClick={handleBack} />
        </div>
      </div>
      <div className="shadow-xl w-full max-w-5xl h-full rounded-2xl bg-white m-4 ">
        <div className="flex bg-whiteBlueBackground rounded-t-2xl p-1 text-center">
          <div className="border-whiteBlueBorder  p-2 w-2/5 ">Empresa</div>
          <div className=" border-whiteBlueBorder border-x-2 py-2 w-1/4">
            Fatura Nº
          </div>
          <div className="border-whiteBlueBorder p-2 w-1/4">Total</div>
          <div className="border-whiteBlueBorder border-l-2 p-2 w-1/12 text-center align  justify-center ">
            Visualizar
          </div>
          <div className="border-whiteBlueBorder border-l-2 w-1/12 py-2 text-center align  justify-center ">
            Apagar
          </div>
        </div>
        {invoices.map((invoice : any) => (
          <div key={invoice._id} className=" flex border-whiteBlueBorder border last:rounded-b-2xl">
            <div className="border-whiteBlueBorder px-4  p-2 w-2/5   gap-2">
              <div className="text-blue-700 font-bold">{invoice.company} </div>{" "}
              <div className="text-gray-500">NIF: {invoice.vat}</div>
            </div>
            <div className=" border-whiteBlueBorder  px-4 border-x-2 text-right p-2 w-1/4">
              {invoice.invoiceNumber}
            </div>
            <div className="border-whiteBlueBorder px-4 p-2 w-1/4 text-right">
              {invoice.totalValue} €
            </div>
            <div className="border-whiteBlueBorder w-1/12  border-l-2 p-2 px-5 text-center items-center justify-center ">
              <button onClick={() => handleViewInvoice(invoice)}>
                <p className="text-blue-500 underline text-2xl pt-3">
                  <MdOutlinePreview />
                </p>
              </button>
            </div>
            <div className="border-whiteBlueBorder w-1/12 border-l-2 p-2 px-3  text-center items-center justify-center ">
              <button onClick={() => handleDeleteInvoice(invoice)}>
                <p className="underline text-red-500 text-2xl text-center align-midle  pt-3">
                  <MdDelete />
                </p>
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
