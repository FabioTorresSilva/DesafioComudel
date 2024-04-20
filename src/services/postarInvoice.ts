import { inserirInvoiceDataBase } from "@/data/postarInvoice";

export async function createInvoice(company,vat,products,description, totalValue ) {
    await inserirInvoiceDataBase(company,vat,products,description , totalValue );
}