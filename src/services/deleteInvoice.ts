import { deleteInvoiceDataBase } from "@/data/deleteInvoice";

export async function deleteInvoice(invoiceId : any) {
    const deletedCount = await deleteInvoiceDataBase(invoiceId );
    return deletedCount;
}

