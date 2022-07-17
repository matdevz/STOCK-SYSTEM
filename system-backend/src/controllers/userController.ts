import { Request, Response } from 'express';
import { registerValidate, loginValidate } from '../helpers/validateUser';
import { hashSync, compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import User from '../models/userModel';

export default {
	register: async (req: Request, res: Response): Promise<void> => {
		const { error, value } = registerValidate(req.body);
		const selectedUser = await User.findOne({ email: req.body.email });
		const passwordHash = hashSync(value.password, 10);

		if (error) res.status(401).send('Houve um erro ao cadastrar usuário');
		if (selectedUser) res.status(400).send('Esta conta já existe!');

		const user = new User({
			name: value.name,
			email: value.email,
			password: passwordHash,
			admin: false,
		});

		try {
			const userSalved = await user.save();
			res.json(userSalved);
		} catch (error) {
			res.status(400).send(error);
		}
	},
	login: async (req: Request, res: Response): Promise<void> => {
		const { error, value } = loginValidate(req.body);
		const selectedUser = await User.findOne({ email: req.body.email });

		if (error) res.status(401).send('Houve um erro ao cadastrar usuário');
		if (!selectedUser) res.status(400).send('Conta não foi cadastrada!');

		const passwordUserMatch = compareSync(
			value.password,
			selectedUser!.password
		);
		if (!passwordUserMatch)
			res.status(400).send('Email ou senha invalida!');

		try {
			const token = sign(
				{ _id: selectedUser!._id, admin: selectedUser!.admin },
				`${process.env.SECRET}`
			);

			res.header('authorization-token', token);
			res.send('Login efetuado com sucesso!');
		} catch (error) {
			res.status(400).send(error);
		}
	},
};
