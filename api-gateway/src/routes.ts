import { Request, Response } from "express";
import { fixRequestBody } from "http-proxy-middleware";
import dotenv from "dotenv";
dotenv.config({
    path: '.env'
})
const PORTFOLIO_MANAGER_SERVER = process.env.PORTFOLIO_MANAGER_SERVER;
export type Route = {
    url: string;
    auth: boolean;
    rateLimit: {
        windowMs: number;
        max: number
    };
    proxyOptions: { 
        target: string,
        pathRewrite: {}
        changeOrigin: boolean,
        onProxyReq: (proxyReq: any, req: Request, res: Response) => void
    }
}

export const routes: Route[] = [
    {
        url: '/user',
        auth: true,
        rateLimit: {
            windowMs: 15 * 60 * 1000, // 15 min
            max: 5 //max 5 requests in windowMs time
        },
        proxyOptions: {
            target: `${PORTFOLIO_MANAGER_SERVER}/user/user`,
            pathRewrite: { '/api/user': '' },
            changeOrigin: true,
            onProxyReq: fixRequestBody
        }
    },
    {
        url: '/watchlist',
        auth: true,
        rateLimit: {
            windowMs: 15 * 60 * 1000, // 15 min
            max: 5 //max 5 requests in windowMs time
        },
        proxyOptions: {
            target: `${PORTFOLIO_MANAGER_SERVER}/watchlist/watchlist`,
            pathRewrite: { '/api/watchlist': '' },
            changeOrigin: true,
            onProxyReq: fixRequestBody
        }
    },
    {
        url: '/holding',
        auth: true,
        rateLimit: {
            windowMs: 15 * 60 * 1000, // 15 min
            max: 5
        },
        proxyOptions: {   
            target: `${PORTFOLIO_MANAGER_SERVER}/holding`,   
            pathRewrite: { '/api/holding': '' },
            changeOrigin: true,
            onProxyReq: fixRequestBody
        } 
    }
]