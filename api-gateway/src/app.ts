import express from "express";
import cookieParser from "cookie-parser"

const app = express();

// built-in express middleware for json parsing. 
// without it you won't be able to parse json data sent in req body
app.use(express.json({
    limit: "16kb"
}))

// cookie-parser middleware for being able to parse cookies 
// that we're setting when a user logs in
app.use(cookieParser())

// applying logger middleware  
logger(app);

// rateLimiter(app, routes);


import { logger, rateLimiter } from "./middlewares/index.ts";
import { apiRouter, authRouter } from "./routers/index.ts"

app.use("/auth", authRouter);
app.use("/api", apiRouter);

export { app }