import { Authenticator } from "../Services/Authenticator";
import { HashManager } from "../Services/HashManager";
import { IdGenerator } from "../Services/IdGenerator";
import { UserBusiness } from "../Business/UserBusiness";
import { Request, Response } from "express";
import { Unauthorized } from "../error/Unauthorized";
import { AlbumBusiness } from "../Business/AlbumBusiness";
import { AlbumDatabase } from "../Data/AlbumDatabase";
import { UserRole } from "../model/User";
import { InvalidParameterError } from "../error/invalidParameterError";

export class AlbumController {
  private static albumBusiness = new AlbumBusiness(
    new AlbumDatabase(),
    new IdGenerator(),
    new Authenticator()
  );

  public async createAlbum(req: Request, res: Response) {
    try {
      const newAlbum = {
        name_album: req.body.name_album,
        author_album: req.headers.authorization!,
        id_genre: req.body.id_genre,
      };
        console.log("ALBUM =>", newAlbum.name_album)

      const verifiedToken = new Authenticator().verify(newAlbum.author_album);
      if (verifiedToken.role !== UserRole.BANDA) {
        throw new Unauthorized("Unauthorized");
        console.log(Unauthorized)
       
      } else {
        const album = await AlbumController.albumBusiness.createAlbum(
            verifiedToken.id,
            newAlbum.name_album,
            newAlbum.id_genre

          
        );
        console.log("RETORNANDO ALBUM =>", album);
        res.status(200).send({message:"Album created", album})
      }
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
      console.log(err.errorCode)
      
    }
  }
}
