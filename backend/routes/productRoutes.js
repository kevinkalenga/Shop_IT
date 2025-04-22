import express from "express";
const router = express.Router();
import { getProductDetails, getProducts, newProduct, updateProduct } from "../controllers/productControllers.js";

router.route("/products").get(getProducts)
router.route("/admin/products").post(newProduct)
router.route("/products/:id").get(getProductDetails)
router.route("/products/:id").put(updateProduct)

export default router