import express from "express"

const app = express()

import watchlistRouter from "./routes/watchlist.routes.ts"
app.use("/api/v1/watchlist", watchlistRouter)

export { app }