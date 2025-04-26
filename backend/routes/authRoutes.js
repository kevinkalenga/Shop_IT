import express from "express";
const router = express.Router();
import { registerUser, loginUser, logoutUser, forgotPassword } from "../controllers/authControllers.js";


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(logoutUser)
router.route("/password/forgot").post(forgotPassword)


export default router