import React from "react";
import PdfPreview from "./pdfPreview";

const InvoicePage = ({ formData, totalValue, invoiceNumber, currentDate }) => {
  return (
    <div>
      {/* Renderiza o componente PdfPreview com os dados da fatura */}
      <PdfPreview
        formData={formData}
        totalValue={totalValue}
        invoiceNumber={invoiceNumber}
        currentDate={currentDate}
      />
    </div>
  );
};

// Função para buscar os parâmetros da URL e passá-los para o componente PdfPreview
export async function getServerSideProps({ query }) {
  // Extrai os parâmetros da query
  const {
    company,
    vat,
    products,
    description,
    totalValue,
    invoiceNumber,
    currentDate,
  } = query;

  // Converte a string JSON dos produtos de volta para um array
  const parsedProducts = JSON.parse(products);

  // Verifica se currentDate é definido, caso contrário, define como null
  const parsedCurrentDate = currentDate ? currentDate : null;

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
      currentDate: parsedCurrentDate,
    },
  };
}

export default InvoicePage;
