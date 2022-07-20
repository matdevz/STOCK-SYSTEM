import { Request, Response } from "express";
import { productValidate } from "../helpers/validateProducts";
import Product from "../models/productModel";

export default {
  create: async (req: Request, res: Response): Promise<void> => {
    const { error, value } = productValidate(req.body);
    if (error) res.status(401).send(error);

    try {
      const product = new Product(value);
      await product.save();

      res.status(200).send({ product });
    } catch (error) {
      res.status(400);
      console.log(error);
    }
  },

  read: async (req: Request, res: Response): Promise<void> => {
    const data = await Product.find({});

    if (data.length === 0)
      res.status(404).send({ error: "Nenhum produto encontrado!" });

    try {
      res.status(200).json(data);
    } catch (error) {
      res.status(400);
      console.log(error);
    }
  },
  update: async (req: Request, res: Response): Promise<void> => {
    const { error, value } = productValidate(req.body);
    const productId = req.params.id;

    if (error) res.status(401).send(error);
    if (!productId) res.status(404).send({ error: "Nenhum id informado!" });

    await Product.findOneAndUpdate({ _id: productId }, value);

    try {
      res.status(200).json({ id: productId });
    } catch (error) {
      res.status(400);
      console.log(error);
    }
  },
  delete: async (req: Request, res: Response): Promise<void> => {
    const productId = req.params.id;
    if (!productId) res.status(404).send({ error: "Nenhum id informado!" });

    await Product.deleteOne({ _id: productId });

    try {
      res.status(200).send({ id: productId });
    } catch (error) {
      res.status(400);
      console.log(error);
    }
  },
};
