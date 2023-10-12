
export class Artist {
  id:number;
 name: string;
 birthplace: string;
 birthdate: string;
 image: string;
 

 constructor(id: number, name: string, birthplace: string, birthdate: string, image: string) {
   this.id = id;
   this.name = name;
   this.birthplace = birthplace;
   this.birthdate = birthdate;
   this.image= image;
 }
}