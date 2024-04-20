import { searchInvoices } from "@/services/allInvoices";


export default async function handler(req, res) {
    try {
        if (req.method === "GET") {
            const invoices = await searchInvoices();  
            if (invoices) {
                return res.status(200).json(invoices);
            } else {
                return res.status(404).json({ message: "no invoices found" });
            }
        } else {
       
            res.setHeader('Allow', ['GET']);
            return res.status(405).end(`Metodo ${req.method} not allowed`);
        }
    } catch (err:any) {
        return res.status(500).json({ message: err.message });
    }
}
