import { Schema, model } from 'mongoose';
import { IProduct } from '../interfaces/IProduct';

export const productSchema = new Schema<IProduct>(
	{
		name: {
			type: String,
			required: true,
		},
		factoryPrice: {
			type: Number,
			required: true,
		},
		salePrice: {
			type: Number,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
		dueDate: {
			type: Date,
			required: true,
		},
	},
	{ timestamps: true }
);

export default model<IProduct>('Product', productSchema);
