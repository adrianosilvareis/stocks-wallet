import { Wallet } from "../scheme/wallet.scheme";

export const walletsMock: Wallet[] = [
  {
    id: "f6a5b56d-ba41-4ebf-9727-46345694287d",
    name: "Main Wallet",
    description: "main wallet",
    amount: 1000,
    allocated_amount: 500,
    created_at: new Date().toISOString()
  }
];
