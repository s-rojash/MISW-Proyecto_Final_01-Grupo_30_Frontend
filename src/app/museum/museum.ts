//import {Artwork} from "../artwork/artwork"
//import { Exhibitions } from "../exhibitions/exhibitions"

export class Museum {
 id: number;   
 name: string;
 description: string;
 address: string;
 city: string;
 image: string;
 

 constructor(id: number, name: string, description: string, address: string, city: string, image: string) {
   this.id = id;
   this.name = name;
   this.description = description;
   this.address = address;
   this.city = city;
   this.image= image;
 }
}