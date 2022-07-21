import { Request, Response } from "express";
import User from "../models/userModel";

export default {
  getUsers: async (req: Request, res: Response) => {
    const users = await User.find({});
    if (users.length === 0)
      return res.status(404).send({ error: "Nenhum produto encontrado!" });

    try {
      return res.status(200).send({ users });
    } catch (error) {
      res.status(401).send({ error });
    }
  },
  deleteUser: async (req: Request, res: Response) => {
    const uid = req.params.id;
    const user = await User.find({ _id: uid });

    if (!uid) return res.status(401).send({ error: "Informe o uid" });
    if (!user) return res.status(401).send({ error: "Usuário não encontrado" });

    try {
      await User.deleteOne({ _id: uid });
      return res.status(200).send({ uid });
    } catch (error) {
      res.status(401).send({ error });
    }
  },
};
