import { Artworks } from './artworks';


export class ArtworkDetail extends Artworks{

    constructor(
        id: number,
        name: string,
        year: number,
        description: string,
        type: string,
        mainImage: string
    ){
        super(id, name, year, description, type, mainImage)
    }
}
