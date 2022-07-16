import express from 'express';
import productController from '../controllers/productController';

export const productRouter = express.Router();

productRouter.post('/create', productController.create);
productRouter.get('/read', productController.read);
productRouter.put('/update/:id', productController.update);
productRouter.delete('/delete/:id', productController.delete);
