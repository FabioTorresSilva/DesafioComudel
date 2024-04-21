export interface Product {
  name?: string;
  quantity?: string;
  price?: string;
}

export interface FormData {
  company: string;
  vat: string;
  products: Product[];
  purchaseValue: string;
  description: string;
  idUsuario: string;
}

export interface IFormData {
  company?: string;
  vat: string;
  products: Product[];
  description?: string;
}

export interface Invoice {
  _id: string;
  company: string;
  vat: string;
  invoiceNumber: string;
  totalValue: number;
  products: Product[]; 
}

export interface ProductInputProps {
  product: Product;
  index: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  onRemove: (index: number) => void;
}

export interface CompanyInputProps {
  formData: IFormData; 
  onChange: (formData: IFormData) => void; 
}