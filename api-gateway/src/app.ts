import express from "express";
import { logger, apiProxy, rateLimiter } from "./middlewares/index.ts";
import { routes } from "./routes.ts";

const app = express();

logger(app);
apiProxy(app, routes);
// rateLimiter(app, routes);

export { app }