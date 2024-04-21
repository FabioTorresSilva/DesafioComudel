import { insertInvoiceDataBase } from "@/data/postInvoice";

export async function createInvoice(company : any,vat : any,products : any,description: any, totalValue: any,  invoiceNumber: any, invoiceDate: any) {
    await insertInvoiceDataBase(company,vat,products,description , totalValue,invoiceNumber, invoiceDate );
}