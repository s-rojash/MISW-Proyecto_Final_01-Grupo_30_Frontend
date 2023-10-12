import { Movement } from "../movement/movement";
import { Artist } from "./artist";

export class ArtistDetail extends Artist{
    movements : Array<Movement> = [];
    
 constructor(id: number, name: string, birthplace: string, birthdate: string, image: string, movements: Array<Movement>)
 {
    super(id, name, birthplace, birthdate, image);
    this.movements = movements;
 }
    
}