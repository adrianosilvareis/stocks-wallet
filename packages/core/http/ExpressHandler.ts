import { IHttpResponse } from "../http-response/IHttpResponse";
import { Either } from "../tools/either";

export interface RequestContext<T = any> {
  body?: any;
  params?: Record<string, string>;
  query?: Record<string, string>;
  headers: Record<string, string>;
  data?: T;
}

export interface ExpressHandler<T = any, R = any, D = any> {
  (context: RequestContext<T>, deps: D): Promise<
    Either<IHttpResponse<R>, IHttpResponse<R>>
  >;
}
