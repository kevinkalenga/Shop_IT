import express from "express";
import { isAuthenticatedUser } from "../middlewares/auth.js"
const router = express.Router();
import {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    getUserProfile,
    updatePassword,
    updateProfile
} from "../controllers/authControllers.js";


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(logoutUser)

router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)

router.route("/me").get(isAuthenticatedUser, getUserProfile)
router.route("/me/update").put(isAuthenticatedUser, updateProfile)
router.route("/password/update").put(isAuthenticatedUser, updatePassword)


export default router