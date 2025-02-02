import express, { Router } from "express";
import request from "supertest";
import { HttpResponse } from "../../http-response/utils/HttpResponse";
import { HttpMethod } from "../HttpMethod";
import { SurfaceBuilder } from "../SurfaceBuilder";

describe("SurfaceBuilder", () => {
  let builder: SurfaceBuilder;
  const baseUrl = "http://api.example.com";

  beforeEach(() => {
    global.fetch = jest.fn();
    builder = new SurfaceBuilder(baseUrl, HttpMethod.GET);
  });

  describe("withBody", () => {
    it("should add body to request", () => {
      const body = { name: "Test" };
      builder.withBody(body);
      expect((builder as any).request.body).toEqual(body);
    });
  });

  describe("withHeaders", () => {
    it("should add headers to request", () => {
      const headers = { "Content-Type": "application/json" };
      builder.withHeaders(headers);
      expect((builder as any).request.headers).toEqual(headers);
    });

    it("should merge multiple headers", () => {
      builder.withHeaders({ "Content-Type": "application/json" });
      builder.withHeaders({ Authorization: "Bearer token" });
      expect((builder as any).request.headers).toEqual({
        "Content-Type": "application/json",
        Authorization: "Bearer token"
      });
    });
  });

  describe("withParams", () => {
    it("should add query params to request", () => {
      const params = { page: "1", limit: "10" };
      builder.withParams(params);
      expect((builder as any).request.params).toEqual(params);
    });
  });

  describe("execute", () => {
    it("should make fetch request with correct parameters", async () => {
      const mockResponse = new Response(JSON.stringify({ data: "test" }));
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      builder
        .withHeaders({ "Content-Type": "application/json" })
        .withParams({ page: "1" })
        .withBody({ name: "Test" });

      await builder.execute();

      expect(global.fetch).toHaveBeenCalledWith(
        "http://api.example.com/?page=1",
        expect.objectContaining({
          method: "GET",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: "Test" })
        })
      );
    });

    it("should throw error on non-ok response", async () => {
      const mockResponse = new Response("", { status: 404 });
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      await expect(builder.execute()).rejects.toThrow(
        "HTTP error! status: 404"
      );
    });
  });

  describe("executeJson", () => {
    it("should return parsed JSON response", async () => {
      const mockData = { data: "test" };
      const mockResponse = new Response(JSON.stringify(mockData));
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await builder.executeJson();
      expect(result).toEqual(mockData);
    });
  });

  describe("registerExpressHandler", () => {
    it("should register GET handler correctly", async () => {
      const app = express();
      const router = Router();
      const mockHandler = jest.fn(async (_context) => {
        return HttpResponse.ok({ success: true });
      });

      app.use(express.json());
      new SurfaceBuilder(
        `${baseUrl}/test`,
        HttpMethod.GET
      ).registerExpressHandler(router, mockHandler, undefined);

      app.use(router);

      await request(app)
        .get("/test")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect({ success: true });

      expect(mockHandler).toHaveBeenCalled();
    });

    it("should register POST handler with body correctly", async () => {
      const app = express();
      const router = Router();
      const mockHandler = jest.fn(async (context) => {
        return HttpResponse.ok({ name: "Test" });
      });

      app.use(express.json());

      new SurfaceBuilder(
        `${baseUrl}/test`,
        HttpMethod.POST
      ).registerExpressHandler(router, mockHandler, undefined);

      app.use(router);

      const testData = { name: "Test" };

      await request(app)
        .post("/test")
        .send(testData)
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(testData);

      expect(mockHandler).toHaveBeenCalled();
    });

    it("should handle errors in express handler", async () => {
      const app = express();
      const router = Router();
      const mockHandler = jest.fn(async () => {
        throw new Error("Test error");
      });

      new SurfaceBuilder(
        `${baseUrl}/test`,
        HttpMethod.GET
      ).registerExpressHandler(router, mockHandler, undefined);

      app.use(router);

      await request(app)
        .get("/test")
        .expect(500)
        .expect("Content-Type", /json/)
        .expect({ error: "Test error" });

      expect(mockHandler).toHaveBeenCalled();
    });

    it("should provide context to handler", async () => {
      const app = express();
      const router = Router();
      const mockHandler = jest.fn(async (context) => {
        expect(context.body).toEqual({ test: "data" });
        expect(context.query).toEqual({ q: "search" });
        return HttpResponse.ok({ success: true });
      });

      app.use(express.json());

      new SurfaceBuilder(
        `${baseUrl}/test`,
        HttpMethod.POST
      ).registerExpressHandler(router, mockHandler, undefined);

      app.use(router);

      await request(app)
        .post("/test")
        .query({ q: "search" })
        .send({ test: "data" })
        .expect(200)
        .expect({ success: true });

      expect(mockHandler).toHaveBeenCalled();
    });

    it("should handle different response types", async () => {
      const app = express();
      const router = Router();

      // No content response
      new SurfaceBuilder(
        `${baseUrl}/nocontent`,
        HttpMethod.GET
      ).registerExpressHandler(
        router,
        async () => HttpResponse.noContent(),
        undefined
      );

      app.use(router);

      await request(app).get("/nocontent").expect(204);
    });

    it("should provide deps to handler", async () => {
      const app = express();
      const router = Router();
      const deps = {
        service: {
          process: jest.fn().mockResolvedValue({ success: true })
        }
      };

      const mockHandler = jest.fn(async (context, deps) => {
        expect(deps.service.process).toBeDefined();
        const result = await deps.service.process();
        return HttpResponse.ok(result);
      });

      app.use(express.json());

      new SurfaceBuilder(
        `${baseUrl}/test`,
        HttpMethod.POST
      ).registerExpressHandler(router, mockHandler, deps);

      app.use(router);

      await request(app)
        .post("/test")
        .send({ test: "data" })
        .expect(200)
        .expect({ success: true });

      expect(mockHandler).toHaveBeenCalled();
      expect(deps.service.process).toHaveBeenCalled();
    });

    it("should handle deps errors correctly", async () => {
      const app = express();
      const router = Router();
      const deps = {
        service: {
          process: jest.fn().mockRejectedValue(new Error("Service error"))
        }
      };

      new SurfaceBuilder(
        `${baseUrl}/test`,
        HttpMethod.GET
      ).registerExpressHandler(
        router,
        async (_, deps) => {
          return deps.service.process();
        },
        deps
      );

      app.use(router);

      await request(app)
        .get("/test")
        .expect(500)
        .expect({ error: "Service error" });
    });
  });
});
