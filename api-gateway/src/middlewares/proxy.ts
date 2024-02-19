import { createProxyMiddleware } from "http-proxy-middleware";
import { Express } from "express";
import { Route } from "../index.types.ts";

const apiProxy = (app: Express, routes: Route[]) => {
    routes.forEach(r => {
        app.use(r.url, createProxyMiddleware(r.proxyOptions));
    })
}

export { apiProxy }