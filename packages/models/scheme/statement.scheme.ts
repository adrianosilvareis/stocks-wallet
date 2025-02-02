import { z } from "zod";

export const statementScheme = z.object({
  id: z.string().uuid(),
  wallet_id: z.string().uuid(),
  amount: z.number(),
  type: z.enum(["deposit", "withdraw", "yield"]),
  created_at: z.string()
});

export type Statement = z.infer<typeof statementScheme>;
