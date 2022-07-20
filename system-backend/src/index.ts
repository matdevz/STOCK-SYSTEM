import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
dotenv.config();

import { adminRouter } from "./routes/adminRouter";
import { productRouter } from "./routes/productRouter";
import { userRouter } from "./routes/userRouter";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

mongoose.connect(`mongodb://${process.env.DATABASE_URL}`, (err) => {
  err ? console.log(`Houve um erro: ${err}`) : console.log("Mongodb Connected");
});

app.listen(process.env.PORT);
