import { Document, Schema, model } from 'mongoose';

interface IProduct extends Document {
	type: string;
	name: string;
	quantity: number;
	price: number;
}

export const productSchema = new Schema<IProduct>(
	{
		type: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

export default model<IProduct>('Product', productSchema);
