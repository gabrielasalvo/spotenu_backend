import { Album } from "../model/Album";
import { BaseDatabase } from "./BaseDatabase";
import { InvalidParameterError } from "../error/invalidParameterError";

export class AlbumDatabase extends BaseDatabase {
  protected table: string = "album_spotenu";
  protected table_relation: string = "album_genre_relation_spotenu";

  private AlbumFromAlbumModel(AlbumModel?: any): Album {
    return (
      AlbumModel &&
      new Album(
        AlbumModel.id_album,
        AlbumModel.author_album,
        AlbumModel.name_album,
        AlbumModel.id_genre
      )
    );
  }
  public async createAlbum(album: Album): Promise<void> {
    await super.getConnection().raw(`
        
        INSERT INTO ${this.table}
        (id_album, author_album, name_album)
        VALUES (
            '${album.getAlbumId()}',
            '${album.getAuthorAlbum()}',
            '${album.getNameAlbum()}'
        )
        `);
    await super.getConnection().raw(`
        INSERT INTO ${this.table_relation}
        (id_album, id_genre)
        VALUES (
            '${album.getAlbumId()}',
            '${album.getGenreAlbum()}'
        
        )`);
        
  }
}
