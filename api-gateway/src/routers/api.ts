import { Router } from "express";
import { apiProxy } from "../middlewares/index.ts";
import { routes } from "../routes.ts";

const router: Router = Router();

// applying proxy middleware on entire router
apiProxy(router, routes);

export default router;