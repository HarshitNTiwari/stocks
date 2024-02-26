import { Router } from "express";
import { loginUser, registerUser, logoutUser }  from "../controllers/index"
import { checkLogin } from "../middlewares/index"

const router: Router = Router();

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
// applying checkLogin middleware to check if the user is even logged in!
router.route("/logout").post(checkLogin, logoutUser);

export default router;
