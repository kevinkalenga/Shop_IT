import express from "express";
const router = express.Router();
import { registerUser, loginUser, logoutUser, forgotPassword, resetPassword } from "../controllers/authControllers.js";


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(logoutUser)

router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)


export default router