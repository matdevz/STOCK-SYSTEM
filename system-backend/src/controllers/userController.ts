import { compareSync, hashSync } from "bcrypt";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { loginValidate, registerValidate } from "../helpers/validateUser";
import User from "../models/userModel";

export default {
    register: async (req: Request, res: Response): Promise<void> => {
        const { error, value } = registerValidate(req.body);
        const selectedUser = await User.findOne({ email: req.body.email });
        const passwordHash = hashSync(value.password, 10);

        if (error) res.status(401).send("Houve um erro ao cadastrar usuário");
        if (selectedUser) res.status(400).send("Esta conta já existe!");

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

        if (error) res.status(401).send({ error: "Erro ao cadastrar usuário" });
        if (!selectedUser) res.status(400).send({ error: "Conta não existe!" });

        const passwordUserMatch = compareSync(
            value.password,
            selectedUser!.password
        );
        if (!passwordUserMatch)
            res.status(400).send({ error: "Email ou senha invalida!" });

        try {
            const token = sign(
                { _id: selectedUser!._id, admin: selectedUser!.admin },
                `${process.env.SECRET}`
            );

            res.status(200).json({ user: selectedUser, token });
        } catch (error) {
            res.status(400).send(error);
        }
    },
};
