import { Response as ExpressResponse, Request, Router } from "express";
import { ExpressHandler, RequestContext } from "./ExpressHandler";
import { HttpMethod } from "./HttpMethod";
import { RequestInterface } from "./RequestInterface";

export class SurfaceBuilder<T = any> {
  private request: RequestInterface<T>;

  constructor(url: string, method: HttpMethod) {
    this.request = {
      url,
      method,
      headers: {}
    };
  }

  public withBody(body: T): SurfaceBuilder<T> {
    this.request.body = body;
    return this;
  }

  public withHeaders(headers: Record<string, string>): SurfaceBuilder<T> {
    this.request.headers = { ...this.request.headers, ...headers };
    return this;
  }

  public withParams(params: Record<string, string>): SurfaceBuilder<T> {
    this.request.params = params;
    return this;
  }

  public async execute(): Promise<Response> {
    const url = new URL(this.request.url);

    if (this.request.params) {
      Object.keys(this.request.params).forEach((key) => {
        url.searchParams.append(key, this.request.params![key]);
      });
    }

    const response = await fetch(url.toString(), {
      method: this.request.method,
      headers: this.request.headers,
      body: this.request.body ? JSON.stringify(this.request.body) : undefined
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  }

  public async executeJson<R = any>(): Promise<R> {
    const response = await this.execute();
    return (await response.json()) as R;
  }

  public registerExpressHandler<C = any, R = any, D = any>(
    router: Router,
    handler: ExpressHandler<C, R, D>,
    deps: D
  ): void {
    const path = new URL(this.request.url).pathname;

    const expressHandler = async (req: Request, res: ExpressResponse) => {
      try {
        // Criar o context combinando todos os dados da request
        const context = this.extractContext<C>(req);

        // Executar o handler com o context e deps
        const result = await handler(context, deps);

        if (result.isRight()) {
          res.status(result.value.statusCode).json(result.value.body);
        }
        if (result.isLeft()) {
          res.status(result.value.statusCode).json(result.value.message);
        }
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(500).json({ error: "Internal Server Error" });
        }
      }
    };

    switch (this.request.method) {
      case HttpMethod.GET:
        router.get(path, expressHandler);
        break;
      case HttpMethod.POST:
        router.post(path, expressHandler);
        break;
      case HttpMethod.PUT:
        router.put(path, expressHandler);
        break;
      case HttpMethod.DELETE:
        router.delete(path, expressHandler);
        break;
      case HttpMethod.PATCH:
        router.patch(path, expressHandler);
        break;
    }
  }

  private extractContext<C = any>(req: Request): RequestContext<C> {
    return {
      body: req.body,
      params: req.params,
      query: req.query as Record<string, string>,
      headers: { ...req.headers, ...this.request.headers } as Record<
        string,
        string
      >
    };
  }
}
