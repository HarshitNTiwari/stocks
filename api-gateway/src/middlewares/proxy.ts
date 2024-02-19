import { createProxyMiddleware } from "http-proxy-middleware";
import { Express } from "express";

const apiProxy = (app: Express, routes: []) => {
    routes.forEach(r => {
        app.use(r.url, createProxyMiddleware(r.proxy));
    })
}

