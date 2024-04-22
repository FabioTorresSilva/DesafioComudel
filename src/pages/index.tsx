import { useState } from "react";
import { useRouter } from "next/router";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Pdf from "@/components/invoicePDF/Pdf";
import { useCalculateTotalValue } from "@/hooks/useCalculateTotalValue";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import ProductInput from "@/components/gerarFatura/ProductInput";
import CompanyInput from "@/components/gerarFatura/CompanyInput";
import { generateCurrentDate, generateInvoiceNumber } from "@/utils/utils";
import { invoiceSchema } from "../types/zod";
import { IFormData } from "@/types/type";

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
  const { totalValue } = useCalculateTotalValue(formData);

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
    router.push("/invoicesHistory");
  };

  const handleInputChangeCompany = (newFormData: any) => {
    setFormData(newFormData);
  };

  return (
    <main className="min-h-screen min-w-screen w-full h-full flex justify-center items-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 shrink-0 ">
        <div className="flex justify-center">
          <img
            className="w-52 md:w-60 "
            src="https://static-media.fluxio.cloud/olisipoway/_icon/share-b2a65c5bedbb26af91c68cece307864c.png"
          ></img>
        </div>
        <div className="mb-8 flex gap-2  justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Gerar Fatura
          </h1>
          <button
            onClick={handleViewHistory}
            className="sm:px-4 px-2 py-2 sm:py-2 sm:text-xl text-sm  bg-blue-500 hover:bg-blue-700 text-white rounded-xl  transition duration-500 ease-in-out transform hover:-translate-y-1"
          >
            Histórico Faturas
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <CompanyInput
            formData={formData}
            onChange={handleInputChangeCompany}
          />
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
            fileName={`Fatura-${formData.company}.pdf`}
            className="text-blue-600 hover:underline flex justify-center mt-4"
          >
            {({ loading }) => (loading ? "A Gerar PDF..." : "Download PDF.")}
          </PDFDownloadLink>
        )}
        {validationError && (
          <p className="text-red-500 text-center mt-4">
          Erro ao Validar Fatura.
          </p>
        )}
      </div>
    </main>
  );
}
