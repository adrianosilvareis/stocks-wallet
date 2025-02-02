import { Orders } from "@stocks/models";
import { Repository } from "./config/database.config";
import { app } from "./config/express.config";
import { SERVER_PORT } from "./config/settings";

app.get("/", async (req, res) => {
  const repository = new Repository<Orders>("orders");

  const { query, knex } = await repository.getQueryBuilder();

  const result = await query.select(
    knex.raw(`
        SUM(CASE 
          WHEN type = 'buy' THEN quantity 
          WHEN type = 'sell' THEN -quantity 
          ELSE 0 
        END) as total_quantity
      `)
  );

  res.send(result);
});

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});
