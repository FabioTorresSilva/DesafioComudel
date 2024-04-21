import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/router";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Pdf from "@/components/invoicePDF/Pdf";
import { calculateTotalValue } from "@/hooks/calculateTotalValue";
import { useFormSubmit } from "@/hooks/FormSubmit";
import ProductInput from "@/components/gerarFatura/ProductInput";
import CompanyInput from "@/components/gerarFatura/CompanyInput";
import { generateCurrentDate, generateInvoiceNumber } from "@/utils/utils";

// ZOD SCHEMA, verificacao por parte do front-end
const invoiceSchema = z.object({
  company: z.string(),
  vat: z.string().length(9), //NIF 9 digits
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
  const [invoiceNumber, setInvoiceNumber] = useState(generateInvoiceNumber());
  const [invoiceDate, setInvoiceDate] = useState(generateCurrentDate());
  const { totalValue, setTotalValue } = calculateTotalValue(formData);

  const {
    handleSubmit,
    handleInputChange,
    handleProductChange,
    removeProductField,
    addProductField,
  } = useFormSubmit(
    formData,
    setFormData,
    invoiceSchema,
    setValidationError,
    setisValid,
    invoiceNumber,
    invoiceDate,
    totalValue
  );

  const handleViewHistory = () => {
    router.push("/historico");
  };

  return (
    <main className="min-h-screen bg-gray-300 flex justify-center items-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8 flex justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Gerar Fatura</h1>
          <button
            onClick={handleViewHistory}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-xl  transition duration-500 ease-in-out transform hover:-translate-y-1"
          >
            Histórico Faturas
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <CompanyInput formData={formData} onChange={setFormData} />
          {formData.products.map((product, index) => (
            <ProductInput
              key={index}
              product={product}
              index={index}
              onChange={handleProductChange}
              onRemove={removeProductField}
            />
          ))}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={addProductField}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-xl  transition duration-500 ease-in-out transform hover:-translate-y-1"
            >
              + Produto
            </button>
            <span className="text-lg font-semibold">
              Total: {totalValue.toFixed(2)} €
            </span>
          </div>
          <textarea
            className="w-full p-2 border border-gray-500 rounded"
            rows={4}
            name="description"
            placeholder="Descrição da Fatura"
            value={formData.description}
            onChange={handleInputChange}
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-xl  transition duration-500 ease-in-out transform hover:-translate-y-1"
            >
              Validar Fatura
            </button>
          </div>
        </form>
        {isValid && (
          <PDFDownloadLink
            document={
              <Pdf
                formData={formData}
                totalValue={totalValue}
                invoiceNumber={invoiceNumber}
                invoiceDate={invoiceDate}
              />
            }
            fileName={`invoice-${formData.company}.pdf`}
            className="text-blue-600 hover:underline flex justify-center mt-4"
          >
            {({ loading }) => (loading ? "A Gerar PDF..." : "Download PDF.")}
          </PDFDownloadLink>
        )}
        {validationError && (
          <p className="text-red-500 text-center mt-4">Erro ao Validar Fatura.</p>
        )}
      </div>
    </main>
  )
}
