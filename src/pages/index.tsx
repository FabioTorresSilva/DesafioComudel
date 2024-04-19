import { useEffect, useState } from "react";
import { z } from "zod";
import { useRouter } from "next/router";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Pdf from "@/components/invoicePDF/Pdf";
import PdfPreview from "./pdfPreview";
import { calculateTotalValue } from "@/hooks/calculateTotalValue";
import { generateCurrentDate, generateInvoiceNumber } from "@/utils/utils";
import { useFormSubmit } from "@/hooks/useFormSubmit";

//No React isto é um component tem que seguir o SRP - Single Responsibility Pattern so pode ter uma responsibilidade

// ZOD SCHEMA, verificacao por parte do front-end
const invoiceSchema = z.object({
  company: z.string(),
  vat: z.string().length(9), //NIF geralmente tem 9 digitos
  products: z.array(
    z.object({
      name: z.string(),
      quantity: z.number().min(1),
      price: z.number().min(0),
    })
  ),
  description: z.string(),
});


export default function Home() {
  const router = useRouter();
  const [isValid, setisValid] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    vat: "",
    products: [{ name: "", quantity: "", price: "" }],
    description: "",
  });

  const [validationError, setValidationError] = useState("");
  const { totalValue, setTotalValue } = calculateTotalValue(formData);
  const { handleSubmit, handleInputChange, handleProductChange} = useFormSubmit(formData, setFormData, invoiceSchema, setValidationError, setisValid)
  const {  removeProductField, addProductField } = useFormSubmit(formData, setFormData, invoiceSchema, setValidationError, setisValid)

  console.log("formData", formData?.products);

  // Function to handle navigation to the history page
  const handleViewHistory = () => {
    router.push("/historico");
  };


  return (
    <main className="min-h-screen bg-blue-200 flex justify-center items-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8 flex justify-between">
          <h1 className="text-xl font-bold text-gray-800">Gerar Fatura</h1>
          <button
            onClick={handleViewHistory}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
          >
            Histórico Faturas Geradas
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            className="w-full p-2 border border-gray-300 rounded mb-4"
            type="text"
            name="company"
            placeholder="Nome Empresa"
            value={formData.company}
            onChange={handleInputChange} 
          />
          <input
            className="w-full p-2 border border-gray-300 rounded mb-4"
            type="text"
            name="vat"
            placeholder="NIF (9 dígitos)"
            value={formData.vat}
            onChange={handleInputChange}
          />
          {formData.products.map((product, index) => (
            <div key={index} className="flex space-x-3 mb-4">
              <input
                className="flex-1 p-2 border border-gray-300 rounded"
                type="text"
                name="name"
                placeholder="Nome Produto"
                value={product.name}
                onChange={(e) => handleProductChange(e, index)}
              />
              <input
                className="w-24 p-2 border border-gray-300 rounded"
                type="number"
                name="quantity"
                placeholder="Quantidade"
                value={product.quantity}
                onChange={(e) => handleProductChange(e, index)}
              />
              <input
                className="w-32 p-2 border border-gray-300 rounded"
                type="number"
                name="price"
                placeholder="Preço"
                value={product.price}
                onChange={(e) => handleProductChange(e, index)}
              />
              <button
                type="button"
                onClick={() => removeProductField(index)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
              >
                Remover
              </button>
            </div>
          ))}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={addProductField}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
            >
              Adicionar Produto
            </button>
            <span className="text-lg font-semibold">
              Total: {totalValue.toFixed(2)}
            </span>
          </div>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
            name="description"
            placeholder="Descrição Fatura"
            value={formData.description}
            onChange={handleInputChange}
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
            >
              Validar
            </button>
          </div>
        </form>
        {isValid && (
          <PDFDownloadLink
            document={
              <Pdf
                formData={formData}
                totalValue={totalValue}
                invoiceNumber={generateInvoiceNumber()}
                currentDate={generateCurrentDate()}
              />
            }
               fileName={`invoice-${generateInvoiceNumber()}.pdf`} 

            className="text-blue-600 hover:underline flex justify-center mt-4"
          >
            {({ loading }) => (loading ? "Gerando PDF..." : "Download PDF")}
          </PDFDownloadLink>
        )}
        {validationError && (
          <p className="text-red-500 text-center mt-4">Erro</p>
        )}
      </div>
    </main>
  );
}


const DEFAULT_VALUE = { name: "", quantity: "", price: "" }