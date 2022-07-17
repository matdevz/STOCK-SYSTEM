import Joi from '@hapi/joi';
import { IUser } from '../interfaces/IUser';

export const registerValidate = (data: IUser) => {
	const userSchema = Joi.object({
		name: Joi.string().required().min(3).max(50),
		email: Joi.string().email().required().min(3).max(50),
		password: Joi.string().required().min(6),
		admin: Joi.boolean(),
	});

	return userSchema.validate(data);
};

export const loginValidate = (data: IUser) => {
	const userSchema = Joi.object({
		email: Joi.string().email().required().min(3).max(50),
		password: Joi.string().required().min(6),
		admin: Joi.boolean(),
	});

	return userSchema.validate(data);
};
