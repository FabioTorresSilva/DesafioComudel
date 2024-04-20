import { findInvoices } from "@/data/allInvoices"


export async function searchInvoices() {
    const res = await findInvoices()
    return res
}



