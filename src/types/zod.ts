import { z } from "zod";

export const invoiceSchema = z.object({
  company: z.string(),
  vat: z.string().length(9), //NIF 9 digits
  products: z.array(
    z.object({
      name: z.string(),
      quantity: z.number().min(1),
      price: z.number().min(0),
    })
  ),
  description: z.string(),
});