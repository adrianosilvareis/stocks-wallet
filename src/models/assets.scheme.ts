import { z } from "zod";

export const assetsScheme = z.object({
  code: z.string(),
  name: z.string(),
  type: z.enum(["Ações", "FIIs", "Crypto", "Tesouro Direto"]),
  created_at: z.string()
});

export type Assets = z.infer<typeof assetsScheme>;
