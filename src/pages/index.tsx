import { useEffect, useState } from "react";
import { z } from "zod";
import { useRouter } from "next/router";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Pdf from "@/components/Pdf";


// ZOD SCHEMA, verificacao por parte do front-end
const invoiceSchema = z.object({
  company: z.string(),
  vat: z.string().length(9), //Vat/NIF geralmente tem 9 digitos
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
  const [totalValue, setTotalValue] = useState(0);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    // Função para calcular o valor total sempre que houver uma mudança nos produtos
    const calculateTotalValue = () => {
      const total = formData.products.reduce(
        (acc, product) => acc + product.quantity * product.price,
        0
      );
      setTotalValue(total);
    };

    calculateTotalValue();
  }, [formData.products]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (
      name.startsWith("products") ||
      name.startsWith("quantities") ||
      name.startsWith("prices")
    ) {
      const prefix = name.split("-")[0];
      const index = parseInt(name.split("-")[1], 10);
      const newArray = [...formData[prefix]];
      newArray[index] = value;
      if (index === formData[prefix].length - 1 && value !== "") {
        newArray.push("");
      }
      setFormData((prevFormData) => ({
        ...prevFormData,
        [prefix]: newArray,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  // Function to handle form submission

  // Function to handle form submission
  const handleSubmit = () => {
    try {
      // Convert vat and purchaseValue to numbers before validation
      const formattedData = {
        ...formData,
        products: formData.products.map((product) => ({
          ...product,
          quantity: parseFloat(product.quantity),
          price: parseFloat(product.price),
        })),
      };

      // Validate the form data against the schema
      invoiceSchema.parse(formattedData);
      // If validation succeeds, clear any previous validation errors
      setValidationError("");
      const pdfContent = (
        <Pdf formData={formattedData} totalValue={totalValue} />
      );
      // Call the PDF download function here
      setisValid(true)
      console.log("Formulário Enviado");
      // Perform further actions, such as sending data to the backend
    } catch (error: any) {
      // If validation fails, display the validation error
      setValidationError(error.message);
      console.error("Formulário Inválido");
    }
  };

  // Function to handle input changes
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProductChange = (e, index) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      products: prevData.products.map((product, i) =>
        i === index ? { ...product, [name]: value } : product
      ),
    }));
  };

  const addProductField = () => {
    setFormData((prevData) => ({
      ...prevData,
      products: [...prevData.products, { name: "", quantity: "", price: "" }],
    }));
  };
  const removeProductField = () => {
    setFormData((prevData) => {
      const updatedProducts = [...prevData.products];
      if (updatedProducts.length !== 1) {
        updatedProducts.pop();
      }
      return {
        ...prevData,
        products: updatedProducts,
      };
    });
  };

  // Function to handle navigation to the history page
  const handleViewHistory = () => {
    router.push("/historico");
  };

  return (
    <main className={`min-h-screen bg-blue-100 justify-center flex `}>
      <div className="flex flex-col items-center  justify-center">
        <button className="bg-white p-4 mb-10 " onClick={handleViewHistory}>
          Histórico Faturas Geradas
        </button>
        <div className="bg-white  p-8  shadow-xl">
          <div className="flex justify-center text-xl font-bold ">
            Gerar Fatura
          </div>

          <div className="flex flex-col gap-2">
            <input
              type="text"
              name="company"
              placeholder="Nome Empresa"
              value={formData.company}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="vat"
              placeholder="NIF (9 digitos)"
              value={formData.vat}
              onChange={handleInputChange}
              className="[appearance:textfield] "
            />
            {formData.products.map((product, index) => (
              <div key={index}>
                <input
                  type="text"
                  name="name"
                  placeholder="Nome Produto"
                  value={product.name}
                  onChange={(e) => handleProductChange(e, index)}
                />
                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantidade"
                  value={product.quantity}
                  onChange={(e) => handleProductChange(e, index)}
                  className="[appearance:textfield]"
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Preço"
                  value={product.price}
                  onChange={(e) => handleProductChange(e, index)}
                  className="[appearance:textfield] "
                />
              </div>
            ))}
            <div className="flex justify-end">Total: {totalValue}</div>
            <div className="flex justify-center gap-2">
              <button
                className=" border-2 border-blue-500"
                onClick={addProductField}
              >
                Adicionar
              </button>
              <button
                className=" border-2 border-blue-500"
                onClick={removeProductField}
              >
                Remover
              </button>
            </div>
            <textarea
              rows="6"
              cols="50"
              name="description"
              placeholder="Descrição Fatura"
              value={formData.description}
              onChange={handleInputChange}
              className="border-2 border-red-400 "
            />
            <button onClick={handleSubmit}>Validar</button>
            {isValid && (
            <PDFDownloadLink
              document={<Pdf formData={formData} totalValue={totalValue} />}
              fileName="invoice.pdf"
            >
              {({ loading }) =>
                loading ? (
                  <button>Gerando PDF...</button>
                ) : (
                  <button>Download PDF</button>
                )
              }
            </PDFDownloadLink>
            )}
            {validationError && (
              <p className="text-red-500 justify-center flex ">
                Erro 
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
