import express from "express";

const app = express();

// built-in express middleware for json parsing. 
// without it you won't be able to parse json data sent in req body
app.use(express.json({
    limit: "16kb"
}))

import watchlistRouter from "./routes/watchlist.routes.ts";
import holdingRouter from "./routes/holding.routes.ts";

app.use("/api/v1/watchlist", watchlistRouter);
app.use("/api/v1/holding", holdingRouter);

export { app }