export class ArtworkComplete {

    id: number;
    name: string;
    year: number;
    description: string;
    type: string;
    mainImage: string;
    image: string;
    artist: {
        id: number,
        name: string,
        birthplace: string,
        birthdate: string,
        image: string
    };

    constructor(
        id: number,
        name: string,
        year: number,
        description: string,
        type: string,
        mainImage: string,
        image: string,
        artist: {
            id: number,
            name: string,
            birthplace: string,
            birthdate: string,
            image: string
        }
    ){
        this.id =id;
        this.name = name;
        this.year = year;
        this.description = description;
        this.type = type;
        this.mainImage = mainImage;
        this.image = image;
        this.artist = artist; 
    }
}
