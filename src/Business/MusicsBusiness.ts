import { InvalidParameterError } from "../error/invalidParameterError";
import { MusicDatabase } from "../Data/MusicDatabase";
import { IdGenerator } from "../Services/IdGenerator";
import { Authenticator } from "../Services/Authenticator";
import { Musics } from "../model/Musics";

export class MusicsBusiness {
    constructor (
        private MusicDatabase: MusicDatabase,
        private IdGenerator: IdGenerator,
        private Authenticator: Authenticator
    ){}


    public createMusic(

        music_name:string,
        id_album:string

    ){

        if(!music_name || !id_album) {
            throw new InvalidParameterError ("Missing Input")
        }

        const idMusic = this.IdGenerator.generate()
    }
}