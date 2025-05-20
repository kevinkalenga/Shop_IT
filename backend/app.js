
import express from "express"
const app = express();
import dotenv from 'dotenv';
dotenv.config({ path: "backend/config/config.env" });
import cookieParser from "cookie-parser"
import { connectedDatabase } from "./config/dbConnect.js";
import errorMiddleware from "./middlewares/errors.js";
import { normalizeQuery } from './middlewares/normalizeQuery.js'
import qs from "qs";

// Handle Uncought exceptions 
process.on('uncaughtException', (err) => {
    console.log(`ERROR: ${err}`)
    console.log('Shutting down due to uncought exception')
    process.exit(1)
})

// connecting to database
connectedDatabase()

app.use(express.json({limit: "10mb"}))
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use((req, res, next) => {
    const parsedQuery = qs.parse(req._parsedUrl.query);
    req.parsedQuery = parsedQuery;
    next();
});

// Après avoir initialisé express()
app.use(normalizeQuery);

// import all routes 
import productRoutes from './routes/productRoutes.js'
import authRoutes from './routes/authRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

app.use("/api/v1", productRoutes)
app.use("/api/v1", authRoutes)
app.use("/api/v1", orderRoutes)

// Using error middleware 
app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

// Handle Unhandled Promise rejections 
// process.on('unhandledRejection', (err) => {
//     console.log(`ERROR: ${err}`);
//     console.log('Shutting down server due to Unhandled Promise Rejection');
//     server.close(() => {
//         process.exit(1);
//     })
// })

process.on("unhandledRejection", (err) => {
  console.log("ERROR:", err); // Better logging
  console.error("Stack trace:", err.stack);
  server.close(() => {
    process.exit(1);
  });
});
