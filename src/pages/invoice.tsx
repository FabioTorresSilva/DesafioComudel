import React from "react";
import PdfPreview from "../components/invoicePDF/pdfPreview";

const InvoicePage = ({ formData , totalValue, invoiceNumber, invoiceDate } : any) => {
  return (
    <div>
      <PdfPreview
        formData={formData}
        totalValue={totalValue}
        invoiceNumber={invoiceNumber}
        invoiceDate={invoiceDate}
      />
    </div>
  );
};

export async function getServerSideProps({ query  } : any) {
  const {
    company ,
    vat,
    products,
    description,
    totalValue,
    invoiceNumber,
    invoiceDate,
  } = query;

  const parsedProducts = JSON.parse(products);
  const parsedCurrentDate = invoiceDate ? invoiceDate : null;
  const parsedInvoiceNumber = invoiceNumber ? invoiceNumber : null;

  return {
    props: {
      formData: {
        company,
        vat,
        products: parsedProducts,
        description,
      },
      totalValue: parseFloat(totalValue),
      invoiceNumber: parsedInvoiceNumber,
      invoiceDate: parsedCurrentDate,
    },
  };
}

export default InvoicePage;
