import { Musics } from "../model/Musics";
import { BaseDatabase } from "./BaseDatabase";
import { InvalidParameterError } from "../error/invalidParameterError";

export class MusicDatabase extends BaseDatabase {
  protected table: string = "spotenu_musics";

  private MusicsFromMusicsModel(MusicsModel?: any): Musics {
    return (
      MusicsModel &&
      new Musics(
        MusicsModel.author_album,
        MusicsModel.id_album,
        MusicsModel.name_album
      )
    );
  }
  public async createAlbum(musics: Musics): Promise<void> {
    await super.getConnection().raw(`
        
        INSERT INTO ${this.table}
        (author_album, id_album, name_album)
        VALUES (
            '${musics.getIdAlbum()}',
            '${musics.getIdAlbum()}',
            '${musics.getMusicName()}'
        )
        `);
  }
}
