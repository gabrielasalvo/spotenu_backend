import { IdGenerator } from "../Services/IdGenerator";
import { Request, Response } from "express";
import { GenreBusiness } from "../Business/GenreBusiness";
import { GenreDatabase } from "../Data/GenreDatabase";
import { Authenticator } from "../Services/Authenticator";
import { UserRole } from "../model/User";

export class GenreController {
  private static GenreBusiness = new GenreBusiness(
    new GenreDatabase(),
    new IdGenerator()
  );

  public async createGenre(req: Request, res: Response) {
    try {
      const newGenre = {
        name: req.body.name,
      };
      

      await GenreController.GenreBusiness.addGenre(newGenre.name);

      res.status(200).send({ newGenre });
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
      console.log(err.message, err.errorCode);
    }
  }

  public async getGenre (req:Request, res: Response) {

    try {

      const token = req.headers.authorization as string
      const verifiedToken = new Authenticator().verify(token)
      
      if(verifiedToken.role !== UserRole.ADMIN && verifiedToken.role !== UserRole.BANDA) {
          throw new Error ("You're not allowed")
      }

     const result = await GenreController.GenreBusiness.getGenre()

      res.status(200).send ({
        result

      })

  
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
      console.log(err.message, err.errorCode);
    }
  }
}
