import express from 'express';
import productController from '../controllers/productController';

export const productRouter = express.Router();

productRouter.post('/create', productController.create);
