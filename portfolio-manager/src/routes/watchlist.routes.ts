import { Router } from "express"; 
import { createWatchlist, deleteWatchlistById, getWatchlistById, updateWatchlist } from "../controllers/watchlist.controller";

const router: Router = Router();

router.route("/watchlist/:id").get(getWatchlistById);
router.route("/watchlist").post(createWatchlist);
router.route("/watchlist/:id").post(updateWatchlist);
router.route("/watchlist/:id").delete(deleteWatchlistById)

export default router;