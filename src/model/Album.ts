import { Genre } from './Genre'

export class Album  {
constructor (
    private id_album: string,
    private author_album:string,
    private name_album:string,
    private id_genre: Genre[]
    
    
){}

public getAlbumId():string {
    return this.id_album
}

public getNameAlbum(): string {
    return this.name_album
}


public getGenreAlbum():Genre[] {
    return this.id_genre
}

public getAuthorAlbum():string {
    return this.author_album
}
}
