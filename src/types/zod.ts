import { z } from "zod";

export const invoiceSchema = z.object({
  company: z.string().min(1, { message: "Nome da Empresa necessário." }),
  vat: z.string().length(9, { message: "NIF deve ter 9 dígitos." }),  
  products: z.array(
    z.object({
      name: z.string().min(1, { message: "Produto necessário." }),
      quantity: z.number().gte(1).min(1,{message:"Quantidade em falta."}),
      price: z.number().gte(0.1).min(1,{message:"Preço em falta." }),
    })
  ),
  description: z.string().optional(),
});