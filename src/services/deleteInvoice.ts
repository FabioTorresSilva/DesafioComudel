import { deleteInvoiceDataBase } from "@/data/deleteInvoice";

export async function deleteInvoice(invoiceId) {
    const deletedCount = await deleteInvoiceDataBase(invoiceId);
    return deletedCount;
}

