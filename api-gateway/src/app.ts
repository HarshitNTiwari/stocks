import express from "express";
import cookieParser from "cookie-parser"
import { logger, rateLimiter } from "./middlewares/index";
import { apiRouter, authRouter } from "./routers/index"
import { checkLogin } from "./middlewares/index";

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

app.use("/auth", authRouter);
app.use("/api", checkLogin, apiRouter);

export { app }