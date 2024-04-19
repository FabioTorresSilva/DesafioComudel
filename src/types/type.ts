export interface FormData {
    company: string;
    vat: string;
    products: { name: string; quantity: string; price: string }[];
    purchaseValue: string;
    description: string;
    idUsuario: string;
  }
  
export interface IFormData {
    company?: string;
    vat: string;
    products: Iproduct[],
    description?: string, 
  }
  
export interface Iproduct  {
    name?: string,
    quantity?: string,
    price?: string,
  }