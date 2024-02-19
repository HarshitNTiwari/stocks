import { rateLimit } from "express-rate-limit";
import { Express } from "express";
import {Route} from "../index.types.ts"

const rateLimiter = (app: Express, routes: Route[]) => {
    routes.forEach(r => {
        app.use(r.url, rateLimit(r.rateLimit));
    })
}

export { rateLimiter }