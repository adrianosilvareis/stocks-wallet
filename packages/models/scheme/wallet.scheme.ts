import { z } from "zod";

export const walletScheme = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  amount: z.number(),
  allocated_amount: z.number(),
  created_at: z.string()
});

export type Wallet = z.infer<typeof walletScheme>;
