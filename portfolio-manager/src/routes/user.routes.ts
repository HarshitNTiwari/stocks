import { Router } from "express"; 
import { getUserDetails, deleteUser} from "../controllers/user.controller";

const router: Router = Router();

router.route("/user").get(getUserDetails);
router.route("/user").delete(deleteUser)

export default router;