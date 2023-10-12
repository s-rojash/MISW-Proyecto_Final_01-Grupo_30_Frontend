import { Exhibitions } from "../exhibitions/exhibitions";

export class Sponsor {
  id:number;
  name:string;
  description:string;
  website:string;
  exhibition?:Exhibitions

  constructor(
    id: number,
    name: string,
    description: string,
    website: string,
    exhibition?: Exhibitions
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.website = website;
    this.exhibition = exhibition;
  }
}
