import { insertInvoiceDataBase } from "@/data/postInvoice";

export async function createInvoice(company,vat,products,description, totalValue,  invoiceNumber, invoiceDate) {
    await insertInvoiceDataBase(company,vat,products,description , totalValue,invoiceNumber, invoiceDate );
}