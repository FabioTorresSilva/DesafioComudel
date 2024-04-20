import { inserirInvoiceDataBase } from "@/data/postInvoice";

export async function createInvoice(company,vat,products,description, totalValue,  invoiceNumber, invoiceDate) {
    await inserirInvoiceDataBase(company,vat,products,description , totalValue,invoiceNumber, invoiceDate );
}