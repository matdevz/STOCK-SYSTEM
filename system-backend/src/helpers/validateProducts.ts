import Joi from '@hapi/joi';
import { IProduct } from '../interfaces/IProduct';

export const productValidate = (data: IProduct) => {
	const productSchema = Joi.object({
		name: Joi.string().required(),
		factoryPrice: Joi.number().required(),
		salePrice: Joi.number().required(),
		quantity: Joi.number().required(),
		dueDate: Joi.date().required(),
	});

	return productSchema.validate(data);
};
