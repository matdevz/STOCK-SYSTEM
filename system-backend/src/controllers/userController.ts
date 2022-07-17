import { Request, Response } from 'express';
import { registerValidate, loginValidate } from '../helpers/validateUser';
import { hash } from 'bcrypt';
import User from '../models/userModel';

export default {
	register: async (req: Request, res: Response): Promise<void> => {
		const { error, value } = registerValidate(req.body);
		const selectedUser = await User.findOne({ email: req.body.email });
		const passwordHash = await hash(value.password, 10);

		if (error) res.status(401).send('Houve um erro ao cadastrar usuário');
		if (selectedUser) res.status(400).send('Esta conta já existe!');

		const user = new User({
			name: value.name,
			email: value.email,
			password: passwordHash,
		});

		try {
			const userSalved = await user.save();
			console.log(userSalved);
			res.json(user);
		} catch (error) {
			res.status(400).send(error);
		}
	},
	login: async (req: Request, res: Response): Promise<void> => {
		const { error, value } = loginValidate(req.body);
	},
};
