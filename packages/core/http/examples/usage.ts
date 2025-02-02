import express, { Router } from "express";
import { HttpMethod } from "../HttpMethod";
import { createRequest } from "../createRequest";

interface User {
  name: string;
  email: string;
}

// Definindo interfaces para as dependências
interface UserRepository {
  findAll(): Promise<User[]>;
  create(user: User): Promise<User>;
  search(term: string): Promise<User[]>;
  validate(user: User): Promise<boolean>;
}

interface Dependencies {
  userRepo: UserRepository;
  logger: { log: (msg: string) => void };
}

const router = Router();

// Criando as dependências
const deps: Dependencies = {
  userRepo: {
    findAll: async () => [],
    create: async (user) => user,
    search: async () => [],
    validate: async () => true
  },
  logger: {
    log: (msg) => console.log(msg)
  }
};

// GET com deps
createRequest("/api/users", HttpMethod.GET)
  .withHeaders({ Accept: "application/json" })
  .registerExpressHandler<void, User[], Dependencies>(
    router,
    async (context, deps) => {
      deps.logger.log("Fetching all users");
      return deps.userRepo.findAll();
    },
    deps
  );

// POST com deps
createRequest<User>("/api/users", HttpMethod.POST)
  .withHeaders({
    "Content-Type": "application/json",
    Accept: "application/json"
  })
  .registerExpressHandler<User, User, Dependencies>(
    router,
    async (context, deps) => {
      deps.logger.log("Creating new user");
      return deps.userRepo.create(context.body);
    },
    deps
  );

// GET com params e deps
createRequest("/api/users/search", HttpMethod.GET).registerExpressHandler<
  void,
  User[],
  Dependencies
>(
  router,
  async (context, deps) => {
    const { searchTerm } = context.query as { searchTerm: string };
    deps.logger.log(`Searching users with term: ${searchTerm}`);
    return deps.userRepo.search(searchTerm);
  },
  deps
);

// Exemplo retornando apenas status code
createRequest("/api/users/validate", HttpMethod.POST).registerExpressHandler(
  router,
  async (context) => {
    const isValid = await validateUser(context.body);
    return isValid ? 200 : 400;
  },
  undefined
);

// Exemplo com deps opcional
createRequest("/api/users", HttpMethod.GET)
  .withHeaders({ Accept: "application/json" })
  .registerExpressHandler<void, User[], Dependencies>(
    router,
    async (context, deps) => {
      deps?.logger.log("Fetching all users");
      return deps?.userRepo.findAll() ?? [];
    },
    deps
  );

const app = express();
app.use(express.json());
app.use(router);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

async function validateUser(body: any): Promise<boolean> {
  // Check if body has the required User properties
  if (!body || typeof body !== "object") return false;
  if (typeof body.name !== "string" || !body.name) return false;
  if (typeof body.email !== "string" || !body.email) return false;

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(body.email)) return false;

  return true;
}
