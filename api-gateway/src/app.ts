import express from "express";
import { logger, rateLimiter } from "./middlewares/index.ts";
import apiRouter from "./routers/api.ts"
import authRouter from "./routers/auth.ts"

const app = express();

// applying logger middleware  
logger(app);

// rateLimiter(app, routes);

app.use("/auth", authRouter);
app.use("/api", apiRouter);

export { app }