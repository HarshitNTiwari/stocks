type Route = {
    url: string;
    auth: boolean;
    rateLimit: {
        windowMs: number;
        max: number
    };
    proxy: {
        target: string,
        changeOrigin: boolean
    }
}

const routes: Route[] = [
    {
        url: '/watchlist',
        auth: true,
        rateLimit: {
            windowMs: 15 * 60 * 1000, // 15 min
            max: 5 //max 5 requests in windowMs time
        },
        proxy: {
            target: "http://localhost:8000/api/v1/watchlist",
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
        proxy: {
            target: "http://localhost:8000/api/v1/holding",
            changeOrigin: true
        } 
    }
]