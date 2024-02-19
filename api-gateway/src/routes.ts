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
        changeOrigin: boolean
    }
}

export const routes: Route[] = [
    {
        url: '/watchlist',
        auth: true,
        rateLimit: {
            windowMs: 15 * 60 * 1000, // 15 min
            max: 5 //max 5 requests in windowMs time
        },
        proxyOptions: {
            target: `${PORTFOLIO_MANAGER_SERVER}/watchlist`,
            changeOrigin: true
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
            changeOrigin: true
        } 
    }
]