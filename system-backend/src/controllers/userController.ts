import { Request, Response } from 'express';
import { userValidate } from '../helpers/validateUser';
import User from '../models/userModel';

export default {
	register: async (req: Request, res: Response): Promise<void> => {
		const { error, value } = userValidate(req.body);
		const selectedUser = await User.findOne({ email: req.body.email });

		if (error) res.status(401).send('Houve um erro ao cadastrar usuário');
		if (selectedUser) res.status(400).send('Esta conta já existe!');

		const user = new User({
			name: value.name,
			email: value.email,
			password: value.password,
		});

		try {
			const userSalved = await user.save();
			res.send(userSalved);
		} catch (error) {
			res.status(400).send(error);
		}
	},
};
