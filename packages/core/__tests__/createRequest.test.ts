import { createRequest } from "../http/createRequest";
import { HttpMethod } from "../http/HttpMethod";
import { SurfaceBuilder } from "../http/SurfaceBuilder";

describe("createRequest", () => {
  it("should create SurfaceBuilder instance with GET method", () => {
    const builder = createRequest(
      "/test",
      HttpMethod.GET,
      "http://example.com"
    );
    expect(builder).toBeInstanceOf(SurfaceBuilder);
    expect((builder as any).request.method).toBe(HttpMethod.GET);
    expect((builder as any).request.url).toBe("http://example.com/test");
  });

  it("should create SurfaceBuilder instance with POST method", () => {
    const builder = createRequest("/test", HttpMethod.POST);
    expect(builder).toBeInstanceOf(SurfaceBuilder);
    expect((builder as any).request.method).toBe(HttpMethod.POST);
  });

  it("should create typed SurfaceBuilder instance", () => {
    interface TestType {
      name: string;
    }
    const builder = createRequest<TestType>("/test", HttpMethod.POST);
    expect(builder).toBeInstanceOf(SurfaceBuilder);
  });
});
