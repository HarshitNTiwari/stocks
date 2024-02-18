import express from "express";

const app = express();

import watchlistRouter from "./routes/watchlist.routes.ts";
import holdingRouter from "./routes/holding.routes.ts";

app.use("/api/v1/watchlist", watchlistRouter);
app.use("/api/v1/holding", holdingRouter);

export { app }