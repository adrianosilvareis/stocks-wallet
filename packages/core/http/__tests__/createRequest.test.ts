import { createRequest } from "../createRequest";
import { HttpMethod } from "../HttpMethod";
import { SurfaceBuilder } from "../SurfaceBuilder";

describe("createRequest", () => {
  it("should create SurfaceBuilder instance with GET method", () => {
    const builder = createRequest("http://example.com", HttpMethod.GET);
    expect(builder).toBeInstanceOf(SurfaceBuilder);
    expect((builder as any).request.method).toBe(HttpMethod.GET);
    expect((builder as any).request.url).toBe("http://example.com");
  });

  it("should create SurfaceBuilder instance with POST method", () => {
    const builder = createRequest("http://example.com", HttpMethod.POST);
    expect(builder).toBeInstanceOf(SurfaceBuilder);
    expect((builder as any).request.method).toBe(HttpMethod.POST);
  });

  it("should create typed SurfaceBuilder instance", () => {
    interface TestType {
      name: string;
    }
    const builder = createRequest<TestType>(
      "http://example.com",
      HttpMethod.POST
    );
    expect(builder).toBeInstanceOf(SurfaceBuilder);
  });
});
