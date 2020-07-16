import { UserDatabase } from "../Data/UserDatabase";
import { IdGenerator } from "../Services/IdGenerator";

import { NotFoundError } from "../error/notFoundError";
import { InvalidParameterError } from "../error/invalidParameterError";
import { Genre } from "../model/Genre";
import { GenreController } from "../Controller/GenreController";
import { GenreDatabase } from "../Data/GenreDatabase";
import { UserRole } from "../model/User";

export class GenreBusiness {
  constructor(
    private genreDatabase: GenreDatabase,
    private idGenerator: IdGenerator
  ) {}

  public async addGenre(name: string) {
    if (!name) {
      throw new Error("Missing input");
    } else {
      const id = this.idGenerator.generate();
      const genre = new Genre(id, name);
     await this.genreDatabase.createGenre(genre);

      return {genre}
    }
  }
}
