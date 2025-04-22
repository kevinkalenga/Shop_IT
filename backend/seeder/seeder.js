import mongoose from "mongoose";
import Product from "../models/productModel.js";
import products from "./data.js"
const seedProduct = async () => {
    try {

        await mongoose.connect("mongodb+srv://kalenga10:kalenga10@shop.klmb43e.mongodb.net/Shop_IT?retryWrites=true&w=majority&appName=Shop");
        await Product.deleteMany();

        console.log("Product are deleted")

        await Product.insertMany(products);
        console.log("Product are added")

        process.exit();

    } catch (error) {
        console.log(error.message);
        process.exit()
    }
}

seedProduct()