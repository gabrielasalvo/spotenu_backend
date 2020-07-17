import { InvalidParameterError } from "../error/invalidParameterError";



export class Musics {
    constructor (
        private id_music:string,
        private music_name:string,
        private id_album:string,

    ){}

    public getIdMusic():string {
        return this.id_music
    }

    public getMusicName():string {
        return this.music_name
    }

    public getIdAlbum():string {
        return this.id_album
    }
}