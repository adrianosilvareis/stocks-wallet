import { getEnvOrDefault } from "../tools";
import { HttpMethod } from "./HttpMethod";
import { SurfaceBuilder } from "./SurfaceBuilder";

export function createRequest<T = any>(
  url: string,
  method: HttpMethod,
  baseUrl: string = getEnvOrDefault("BASE_URL", "http://localhost:3000")
): SurfaceBuilder<T> {
  return new SurfaceBuilder<T>(`${baseUrl}${url}`, method);
}
