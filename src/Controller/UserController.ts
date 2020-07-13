import { Authenticator } from "../Services/Authenticator";
import { HashManager } from "../Services/HashManager";
import { IdGenerator } from "../Services/IdGenerator";
import { UserBusiness } from "../Business/UserBusiness";
import { UserDatabase } from "../Data/UserDatabase";
import { Request, Response } from "express";
import { UserRole } from "../model/User";
import { Unauthorized } from "../error/Unauthorized";

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
        req.body.role,
        req.body.description_band 
      );


      res.status(200).send({
        result,
      });
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const nickname_email = req.body.nickname || req.body.email

      const result = await UserController.UserBusiness.login(nickname_email, req.body.password)
      
      
      res.status(200).send({ message: "User online", result });
    } catch (err) {
      res.status(411).send({ message: "UNAUTHORIZED" })
    }
  }


  async approve(req: Request, res: Response) {

    try {
      const id = req.body.id
      const token = req.headers.token as string
      const authenticator = new Authenticator()
      const verifiedToken = authenticator.verify(token)

      if (verifiedToken.role === "admin") {
        await UserController.UserBusiness.approve(id)

        res.status(200).send({ message: "Usuário aprovado" });
      } else {
        res.status(401).send({
          error: "Você não foi aprovado"
        })
      }

    } catch (err) {
      throw new Unauthorized ("Tivemos problemas")
    }
  }
}
