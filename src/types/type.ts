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

export interface InvoiceDescriptionProps {
  formData: IFormData; 
}
export interface InvoiceItemsTableProps {
  formData: IFormData;
  totalValue: number; 
}

export interface InvoiceNoProps {
  invoiceNumber: any;
  invoiceDate: string;
  formData: IFormData;
}
export interface InvoiceTableBlankSpaceProps {
  rowsCount: number;
}

export interface InvoiceTableFooterProps {
  totalValue: number;
}

export interface PdfPreviewProps {
  formData: FormData;
  totalValue: number;
  invoiceNumber: string;
  invoiceDate: string;
}

export interface InvoiceTableRowProps {
  items: Product[];
}

export interface PdfProps {
  formData: {
    company: string;
    vat: string;
    products: {
      name?: string;
      quantity?: string;
      price?: string;
    }[];
    description?: string;
  };
  totalValue: number;
  invoiceNumber: any;
  invoiceDate: string;
}

export interface Invoice {
  _id: string;
  company: string;
  vat: string;
  invoiceNumber: string;
  totalValue: number;
  products: Product[];
  invoiceDate: string; 
}

export interface ErrorMessage {
  message:string
  type: string;
} 