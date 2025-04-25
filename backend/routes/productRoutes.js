import express from "express";
const router = express.Router();
import { deleteProduct, getProductDetails, getProducts, newProduct, updateProduct } from "../controllers/productControllers.js";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js"

router.route("/products").get(isAuthenticatedUser, authorizeRoles("admin"), getProducts)
router.route("/admin/products").post(newProduct)
router.route("/products/:id").get(getProductDetails)
router.route("/admin/products/:id").put(updateProduct)
router.route("/admin/products/:id").delete(deleteProduct)

export default router