import { Museum } from './museum';
import { Exhibitions } from '../exhibitions/exhibitions';

export class MuseumDetail extends Museum {
 exhibitions: Array<Exhibitions> = [];


 constructor(id:number, name: string,description: string, address: string, city: string,
 image: string, exhibitions: Array<Exhibitions> ) 
 {
   super(id, name, description, address, city, image)
   this.exhibitions = exhibitions;
 }
}
