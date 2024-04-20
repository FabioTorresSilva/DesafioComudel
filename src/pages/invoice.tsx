import React from "react";
import PdfPreview from "../components/invoicePDF/pdfPreview";

const InvoicePage = ({ formData, totalValue, invoiceNumber, invoiceDate }) => {
  return (
    <div>
      {/* Renderiza o componente PdfPreview com os dados da fatura */}
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
//Ter atencao
export async function getServerSideProps({ query }) {
  // Extrai os parâmetros da query
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

  // Verifica se invoiceDate é definido, caso contrário, define como null
  const parsedCurrentDate = invoiceDate ? invoiceDate : null;

  // Verifica se invoiceNumber é definido, caso contrário, define como null
  const parsedInvoiceNumber = invoiceNumber ? invoiceNumber : null;

  // Retorna os parâmetros como props para a página
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
