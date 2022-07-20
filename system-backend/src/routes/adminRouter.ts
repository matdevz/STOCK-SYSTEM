import express from "express";
import admimController from "../controllers/adminController";
import { authAdmin, authUser } from "../controllers/authController";

export const adminRouter = express.Router();

adminRouter.get("/users", authUser, authAdmin, admimController.getUsers);
