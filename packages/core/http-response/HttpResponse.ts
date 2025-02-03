import { Either, left, right } from "../tools/either";
import { IHttpResponse } from "./IHttpResponse";

export class HttpResponse {
  static ok<T>(
    data: T,
    message?: string
  ): Either<IHttpResponse<T>, IHttpResponse<T>> {
    return right({
      statusCode: 200,
      body: data,
      message
    });
  }

  static created<T>(
    data: T,
    message?: string
  ): Either<IHttpResponse<T>, IHttpResponse<T>> {
    return right({
      statusCode: 201,
      body: data,
      message
    });
  }

  static noContent(
    message: string = "No Content"
  ): Either<IHttpResponse, IHttpResponse> {
    return right({
      statusCode: 204,
      body: null,
      message
    });
  }

  static badRequest(message: string): Either<IHttpResponse, IHttpResponse> {
    return left({
      statusCode: 400,
      body: null,
      message
    });
  }

  static unauthorized(
    message: string = "Unauthorized"
  ): Either<IHttpResponse, IHttpResponse> {
    return left({
      statusCode: 401,
      body: null,
      message
    });
  }

  static forbidden(
    message: string = "Forbidden"
  ): Either<IHttpResponse, IHttpResponse> {
    return left({
      statusCode: 403,
      body: null,
      message
    });
  }

  static notFound(
    message: string = "Not Found"
  ): Either<IHttpResponse, IHttpResponse> {
    return left({
      statusCode: 404,
      body: null,
      message
    });
  }

  static internalServerError(
    message: string = "Internal Server Error"
  ): Either<IHttpResponse, IHttpResponse> {
    return left({
      statusCode: 500,
      body: null,
      message
    });
  }
}
