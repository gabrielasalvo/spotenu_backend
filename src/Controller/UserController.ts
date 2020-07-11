import { Authenticator } from "../Services/Authenticator";
import { HashManager } from "../Services/HashManager";
import { IdGenerator } from "../Services/IdGenerator";
import { UserBusiness } from "../Business/UserBusiness";
import { UserDatabase } from "../Data/UserDatabase";
import { Request, Response } from "express";
import { UserRole } from "../model/User";

export class UserController {
  private static UserBusiness = new UserBusiness(
    new UserDatabase(),
    new HashManager(),
    new IdGenerator(),
    new Authenticator()
  );

  public async signup(req: Request, res: Response) {
    try {
      const result = await UserController.UserBusiness.signup(
        req.body.name,
        req.body.nickname,
        req.body.email,
        req.body.password,
        req.body.role
      );
    //   if(req.body.role !== "admin") {
    //     await  UserController.UserBusiness.disapproved(req.body.role)
          
    //   }

      res.status(200).send({
        result,
      });
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }

  }
  async approve(req: Request, res: Response) {
    try {
      const id = req.body.id;
      const token = req.headers.token as string;
      const verifiedToken = await UserController.UserBusiness.authenticator.verify(
        token
      );

      if (verifiedToken.role === "admin") {
        await UserController.UserBusiness.approve(id);
        res.status(200).send({ message: "Usuário aprovado" });
      } else {
        res.status(401).send({ error: "Você não está autorizado." });
      }
    } catch (err) {
      res.status(412).send({
        message: "Erro",
      });
    }
  }


}
