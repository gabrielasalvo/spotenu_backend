import { BaseDatabase } from "./BaseDatabase";
import { Genre } from "../model/Genre";


export class GenreDatabase extends BaseDatabase {
   private table: string = "genre_spotenu";
    private GenreFromGenreModel(GenreModel?:any): Genre | undefined{
        return (
            GenreModel && 
            new Genre (
                GenreModel.id,
                GenreModel.name
            )
        )
    }
    public async createGenre(newGender: Genre):Promise<any> {
        await  this.getConnection().raw (

            `
            INSERT INTO ${this.table}
            (id, name)
            VALUES (
                "${newGender.getId()}",
                "${newGender.getName()}"
            )
            `
        )
    }
}