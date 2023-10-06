import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors"
import apiRouter from "./routes/Task_routes.js";
import multer from "multer";
const upload = multer();
const PORT = process.env.PORT | 5000
const app = express()
dotenv.config();
app.use(express.json())
app.use(bodyParser.json());
app.use(cors())
app.use(upload.none());
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL).then(() => {
    app.listen(PORT, () => {
        console.log(`Server Is Running on Port http://localhost:${PORT}`)
    })
    console.log("Data Base Conected Successfully");
}).catch(error => console.log(error));

app.use("/api", apiRouter);

