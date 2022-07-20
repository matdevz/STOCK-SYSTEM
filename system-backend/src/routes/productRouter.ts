import express from "express";
import { authUser } from "../controllers/authController";
import productController from "../controllers/productController";

export const productRouter = express.Router();

productRouter.post("/create", authUser, productController.create);
productRouter.get("/read", authUser, productController.read);
productRouter.put("/update/:id", authUser, productController.update);
productRouter.delete("/delete/:id", authUser, productController.delete);
