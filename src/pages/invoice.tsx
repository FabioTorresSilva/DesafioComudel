import React from "react";
import PdfPreview from "../components/invoicePDF/pdfPreview";

const InvoicePage = ({ formData, totalValue, invoiceNumber, invoiceDate }) => {
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

// Função para buscar os parâmetros da URL e passá-los para o componente PdfPreview
export async function getServerSideProps({ query }) {
  const {
    company,
    vat,
    products,
    description,
    totalValue,
    invoiceNumber,
    invoiceDate,
  } = query;

  // Converte a string JSON dos produtos de volta para um array
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
