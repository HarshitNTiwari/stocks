import { Router } from "express"; 

const router = Router();

router.route("/watchlist/:id").get()

export default router;