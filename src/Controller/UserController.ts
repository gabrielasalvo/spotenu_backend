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
      const userOnline = await UserController.UserBusiness.login(
        req.body.email || req.body.nickname,
        req.body.password
      );
      res.status(200).send({ message: "User online", userOnline });
    } catch (err) {
      res.status(411).send({ message: "UNAUTHORIZED" });
    }
  }

  async approve(req: Request, res: Response) {

    try{
      const id = req.body.id
      const token = req.headers.authorization as string
      const authenticator = new Authenticator().verify(token)

      if(authenticator.role !== UserRole.ADMIN) {
        throw new Error ("You cannot approve anyone")
      }

      await UserController.UserBusiness.approve(id)
      res.status(200).send({
        message:"User approved"
      })


    }catch(error){
      res.status(error.errorCode || 400).send({ message: error.message}) 
  }


}
}
