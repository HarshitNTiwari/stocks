import express from "express";
import userRouter from "./routes/user.routes"
import watchlistRouter from "./routes/watchlist.routes";
import holdingRouter from "./routes/holding.routes";

const app = express();

// built-in express middleware for json parsing. 
// without it you won't be able to parse json data sent in req body
app.use(express.json({
    limit: "16kb"
}))

app.use("/api/v1/user", userRouter);
app.use("/api/v1/watchlist", watchlistRouter);
app.use("/api/v1/holding", holdingRouter);

export { app }