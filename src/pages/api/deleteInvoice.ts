import { deleteInvoice } from "@/services/deleteInvoice";

export default async function handler(req, res) {
    if (req.method !== "DELETE") {
        return res.status(405).json({ message: "Método não permitido" });
    }
    try {
        const { invoiceId } = req.body;
        const deletedCount = await deleteInvoice(invoiceId);
        if (deletedCount === 0) {
            return res.status(404).json({
                message: "Erro ao Apagar Fatura.",
            });
        }
        return res.status(200).json({
            message: "Fatura Apagada com sucesso.",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Erro" });
    }
}
