import { IdGenerator } from "../Services/IdGenerator";
import { Request, Response } from "express";
import { GenreBusiness } from "../Business/GenreBusiness";
import { GenreDatabase } from "../Data/GenreDatabase";

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
}
