import { Router } from "express"; 

const router: Router = Router();

router.route("/holding/:id").get();
router.route("/holding").post();
router.route("/holding/:id").post();
router.route("/holding/:id").delete();

export default router;