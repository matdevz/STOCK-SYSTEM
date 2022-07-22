import express from 'express';
import admimController from '../controllers/adminController';
import { authAdmin, authUser } from '../controllers/authController';

export const adminRouter = express.Router();

adminRouter.get('/user/read', authUser, authAdmin, admimController.read);
adminRouter.delete(
	'/user/delete/:id',
	authUser,
	authAdmin,
	admimController.delete
);
