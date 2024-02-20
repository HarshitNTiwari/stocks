import express from "express";
import { logger, rateLimiter } from "./middlewares/index.ts";
import { apiRouter, authRouter } from "./routers/index.ts"

const app = express();

// built-in express middleware for json parsing. 
// without it you won't be able to parse json data sent in req body
app.use(express.json({
    limit: "16kb"
}))

// applying logger middleware  
logger(app);

// rateLimiter(app, routes);

app.use("/auth", authRouter);
app.use("/api", apiRouter);

export { app }