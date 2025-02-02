import { HttpMethod } from "./HttpMethod";
import { SurfaceBuilder } from "./SurfaceBuilder";

export function createRequest<T = any>(
  url: string,
  method: HttpMethod
): SurfaceBuilder<T> {
  return new SurfaceBuilder<T>(url, method);
}
