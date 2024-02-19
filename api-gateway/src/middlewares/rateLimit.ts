import { rateLimit } from "express-rate-limit";

const rateLimiter = (app, routes) => {
    routes.forEach(r => {
        app.use(r.url, rateLimit(r.rateLimit));
    })
}