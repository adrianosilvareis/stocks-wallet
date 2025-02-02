import { z } from "zod";

export const ordersScheme = z.object({
  id: z.string().uuid(),
  code: z.string(),
  quantity: z.number(),
  price: z.number(),
  type: z.enum(["buy", "sell"]),
  created_at: z.string()
});

export type Orders = z.infer<typeof ordersScheme>;
