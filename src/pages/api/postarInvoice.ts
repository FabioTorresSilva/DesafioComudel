import { createInvoice } from "@/services/postarInvoice";

export default async function handler(req, res) {
   if (req.method !== "POST") {
    return res.status(405).json({ message: "Metodo não permitido" });
  }
  try {
    const { company, vat, products, description, totalValue, invoiceNumber, invoiceDate} = req.body;
    await createInvoice(company, vat, products, description, totalValue, invoiceNumber, invoiceDate );
    return res.status(201).json({
      message: "Invoice Guardado Com sucesso",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro" });
  } 
}
