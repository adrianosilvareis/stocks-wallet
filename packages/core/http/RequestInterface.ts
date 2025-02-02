import { HttpMethod } from "./HttpMethod";

export interface RequestInterface<T = any> {
  url: string;
  method: HttpMethod;
  body?: T;
  headers?: Record<string, string>;
  params?: Record<string, string>;
}
