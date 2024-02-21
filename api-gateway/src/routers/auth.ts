import { Router } from "express";
import router from "./api";
import { loginUser, registerUser, logoutUser }  from "../controllers/index"
import { checkLogin } from "../middlewares/index"

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
// applying checkLogin middleware to check if the user is even logged in!
router.route("/logout").post(checkLogin, logoutUser);

export default router;
