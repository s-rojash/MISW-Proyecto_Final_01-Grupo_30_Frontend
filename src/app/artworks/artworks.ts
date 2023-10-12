export class Artworks {
    id: number;
    name: string;
    year: number;
    description: string;
    type: string;
    mainImage: string;

    constructor(
        id: number,
        name: string,
        year: number,
        description: string,
        type: string,
        mainImage: string
    ){
        this.id = id;
        this.name = name;
        this.year = year;
        this.description = description;
        this.type =type;
        this.mainImage = mainImage;
    }
}
