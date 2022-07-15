import { createProductValidate } from '../helpers/validateProducts';

export default {
	create: (req, res): string => {
		const { error, value } = createProductValidate(req.body);
		if (error) res.status(401).send('Hove um erro');

		return res.status(200).send('Tudo certo');
	},
};
