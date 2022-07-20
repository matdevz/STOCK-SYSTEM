import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
export const authUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send({ error: "Acesso negado!" });
  const [beary, token] = authHeader.split(" ");

  if (!/^Bearer$/.test(beary))
    return res.status(401).send({ error: "Acesso negado!" });

  try {
    const userVerified = verify(token, `${process.env.SECRET}`);
    req.user = userVerified;
    next();
  } catch (error) {
    res.status(401).send({ error });
  }
};

export const authAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  console.log(user);

  if (!user.admin) return res.status(401).send({ error: "Acesso negado!" });

  try {
    next();
  } catch (error) {
    res.status(401).send({ error });
  }
};
