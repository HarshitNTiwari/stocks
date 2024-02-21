import { Router } from "express";
import { apiProxy } from "../middlewares/index";
import { routes } from "../routes";

const router: Router = Router();

// applying proxy middleware on entire router
apiProxy(router, routes);

export default router;