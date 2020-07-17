import { Authenticator } from "../Services/Authenticator";
import { HashManager } from "../Services/HashManager";
import { IdGenerator } from "../Services/IdGenerator";
import { MusicsBusiness } from "../Business/MusicsBusiness";
import { Request, Response } from "express";
import { Unauthorized } from "../error/Unauthorized";
import { MusicDatabase } from "../Data/MusicDatabase";
import { Musics } from "../model/Musics";
import { InvalidParameterError } from "../error/invalidParameterError";
import { UserRole } from "../model/User";

export class MusicsController {
  private static musicBusiness = new MusicsBusiness(
    new MusicDatabase(),
    new IdGenerator(),
    new Authenticator()
  );

  public async createMusics(req: Request, res: Response) {
    try {
      const newMusic = {
        name_album: req.body.name_album,
        author_album: req.headers.authorization!,
        id_album: req.body.id_album,
      };

      const verifiedToken = new Authenticator().verify(newMusic.author_album);
      if (verifiedToken.role !== UserRole.BANDA) {
        throw new Unauthorized("Unauthorized");
      } else {
        const music = await MusicsController.musicBusiness.createMusic(
          newMusic.name_album,
          newMusic.id_album
          );

          res.status(200).send("Musica criada!")
      }
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
      console.log(err.errorCode);
    }
  }
}
