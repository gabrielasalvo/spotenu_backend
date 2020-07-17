import { InvalidParameterError } from "../error/invalidParameterError";
import { Album } from "../model/Album";
import { AlbumDatabase } from "../Data/AlbumDatabase";
import { IdGenerator } from "../Services/IdGenerator";
import { Authenticator } from "../Services/Authenticator";
import { Genre } from "../model/Genre";
export class AlbumBusiness {
  constructor(
    private AlbumDatabase: AlbumDatabase,
    private idGenerator: IdGenerator,
    private authenticator: Authenticator
  ) {}

  public async createAlbum(
      author_album: string,
      name_album: string,
      genre_album: Genre[]
  ) {
    if (!name_album || !genre_album) {
      throw new InvalidParameterError("Missing input");
    }
    const id_album = this.idGenerator.generate();
    const newAlbum = new Album(id_album, author_album, name_album, genre_album);
    const album = await this.AlbumDatabase.createAlbum(newAlbum);
    
    return album;
  }
}
