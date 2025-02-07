import { z } from "zod";

export const wallet = {
  scheme: z.object({
    id: z.string().uuid(),
    name: z.string(),
    description: z.string(),
    amount: z.number(),
    allocated_amount: z.number(),
    created_at: z.string()
  }),
  tableName: Symbol("wallet")
} as const;

export type Wallet = z.infer<typeof wallet.scheme>;