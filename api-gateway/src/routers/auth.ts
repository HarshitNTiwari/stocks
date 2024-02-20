import { Router } from "express";
import router from "./api";
import { loginUser, registerUser, logoutUser }  from "../controllers/index.ts"
import { checkLogin } from "../middlewares/index.ts"

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/logout").post(checkLogin, logoutUser);

export default router;
