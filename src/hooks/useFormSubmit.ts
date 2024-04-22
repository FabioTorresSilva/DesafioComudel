const DEFAULT_VALUE = { name: "", quantity: "", price: "" };

export const useFormSubmit = (
  formData : any,
  setFormData : any,
  invoiceSchema : any,
  setValidationError : any,
  setisValid : any,
  invoiceNumber : any,
  invoiceDate : any,
  totalValue : any 
) => {

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const formattedData = {
        ...formData,
        invoiceNumber: invoiceNumber,
        invoiceDate: invoiceDate,
        products: formData.products.map((product : any) => ({
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
    } catch (error : any) {
      console.log(((error.message)))
      setValidationError((error).message);
      console.error("Formulário Inválido ou Erro na API");
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData : any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProductChange = (e : any, index : number) => {
    const { name, value } = e.target;
    setFormData((prevData : any) => ({
      ...prevData,
      products: prevData.products.map((product : any, i: any) =>
        i === index ? { ...product, [name]: value } : product
      ),
    }));
  };

  const addProductField = () => {
    setFormData((prevData :any) => ({
      ...prevData,
      products: [...prevData.products, DEFAULT_VALUE],
    }));
  };

  const removeProductField = (index : any) => {
    const updatedProducts = formData.products.filter((_ : any, i : number) => i !== index);
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