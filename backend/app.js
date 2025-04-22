
import express from "express"
const app = express();
import dotenv from 'dotenv';
dotenv.config({ path: "backend/config/config.env" })
import { connectedDatabase } from "./config/dbConnect.js";



// connecting to database
connectedDatabase()

app.use(express.json())

// import all routes 
import productRoutes from './routes/productRoutes.js'

app.use("/api/v1", productRoutes)


app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})