import { v4 as uuidv4 } from "uuid";
import { Orders } from "../src/models/orders.scheme";

export const orderssMock: Orders[] = [
  {
    id: uuidv4(),
    code: "CPTS11",
    quantity: 100,
    price: 1.5,
    created_at: "2022-02-01T02:22:52.000Z",
    type: "buy"
  },
  {
    id: uuidv4(),
    code: "PETR4",
    quantity: 200,
    price: 1.0,
    created_at: "2022-02-01T02:22:52.000Z",
    type: "buy"
  },
  {
    id: uuidv4(),
    code: "BBD4",
    quantity: 300,
    price: 2.0,
    created_at: "2022-02-01T02:22:52.000Z",
    type: "buy"
  },
  {
    id: uuidv4(),
    code: "ITUB4",
    quantity: 400,
    price: 3.0,
    created_at: "2022-02-01T02:22:52.000Z",
    type: "buy"
  },
  {
    id: uuidv4(),
    code: "BBDC4",
    quantity: 500,
    price: 4.0,
    created_at: "2022-02-01T02:22:52.000Z",
    type: "buy"
  },
  {
    id: uuidv4(),
    code: "VALE3",
    quantity: 600,
    price: 5.0,
    created_at: "2022-02-01T02:22:52.000Z",
    type: "buy"
  },
  {
    id: uuidv4(),
    code: "BBAS3",
    quantity: 700,
    price: 6.0,
    created_at: "2022-02-01T02:22:52.000Z",
    type: "buy"
  },
  {
    id: uuidv4(),
    code: "PETR4",
    quantity: 100,
    price: 2.5,
    created_at: "2022-02-02T02:22:52.000Z",
    type: "sell"
  },
  {
    id: uuidv4(),
    code: "VALE3",
    quantity: 300,
    price: 6.0,
    created_at: "2022-02-02T02:22:52.000Z",
    type: "sell"
  },
  {
    id: uuidv4(),
    code: "ITUB4",
    quantity: 200,
    price: 4.0,
    created_at: "2022-02-02T02:22:52.000Z",
    type: "sell"
  }
];
