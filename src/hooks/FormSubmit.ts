const DEFAULT_VALUE = { name: "", quantity: "", price: "" };

export const useFormSubmit = (
  formData,
  setFormData,
  invoiceSchema,
  setValidationError,
  setisValid,
  invoiceNumber,
  invoiceDate,
  totalValue 
) => {

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const formattedData = {
        ...formData,
        invoiceNumber: invoiceNumber,
        invoiceDate: invoiceDate,
        products: formData.products.map((product) => ({
          ...product,
          quantity: parseFloat(product.quantity),
          price: parseFloat(product.price),
        })),
        totalValue
      };

      invoiceSchema.parse(formattedData);
  
      const response = await fetch("/api/createInvoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });
  
      if (response.ok) {
        console.log("Fatura Guardada");
        setValidationError("");
        setisValid(true);
      } else {
        console.error("Erro ao criar Fatura");
      }
    } catch (error) {
      setValidationError(error.message);
      console.error("Formulário Inválido ou Erro na API");
    }
  };

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
      products: [...prevData.products, DEFAULT_VALUE],
    }));
  };

  const removeProductField = (index) => {
    const updatedProducts = formData.products.filter((_, i) => i !== index);
    setFormData({ ...formData, products: updatedProducts });
  };

  return {
    handleSubmit,
    handleInputChange,
    handleProductChange,
    removeProductField,
    addProductField,
  };
};