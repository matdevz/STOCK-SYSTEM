import Joi from '@hapi/joi';

export const productValidate = (data) => {
	const productSchema = Joi.object({
		type: Joi.string().required(),
		name: Joi.string().required(),
		quantity: Joi.number().required(),
		price: Joi.number().required(),
	});

	return productSchema.validate(data);
};
