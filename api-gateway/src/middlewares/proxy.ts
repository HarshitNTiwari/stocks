import { createProxyMiddleware } from "http-proxy-middleware";
import { Router } from "express";
import { Route } from "../index.types";

const apiProxy = (router: Router, routes: Route[]) => {
    routes.forEach(r => {
        router.use(r.url, createProxyMiddleware(r.proxyOptions));
    })
}

export { apiProxy }