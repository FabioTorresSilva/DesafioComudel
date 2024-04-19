import { inserirInvoiceDataBase } from "@/data/postarInvoice";

export async function createInvoice(company,vat,products,description) {
    await inserirInvoiceDataBase(company,vat,products,description);
}